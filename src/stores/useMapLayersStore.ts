import { create } from "zustand";

import { GeoJSON, geoJson, TileLayer } from "leaflet";

import { pointsWithinPolygon, intersect, featureCollection } from "@turf/turf";

import type { MapLayersStore, LayerItem } from "@/types/Stores/LayersManager";

import { useMapStore } from "./useMapStore";
import { GROUPS } from "@/config.map";

export const useMapLayersStore = create<MapLayersStore>((set, get) => ({
  groups: GROUPS,
  layers: {},
  layerFilter: {},
  append: async (info, loadLayerFunction) => {
    const { layers } = get();
    const map = useMapStore.getState().map;

    const oldLayer = layers[info.id]?.layer;
    if (oldLayer) return false;

    try {
      const layer = await loadLayerFunction();

      if (layer) {
        if (info.format === "geojson" && layer instanceof GeoJSON) {
          layers[info.id] = {
            ...info,
            layer: layer,
          };
        } else if (info.format === "tile" && layer instanceof TileLayer) {
          layers[info.id] = {
            ...info,
            layer: layer,
          };
        } else {
          throw new Error("The layer type does not match the declared format.");
        }

        if (info.active) {
          map?.addLayer(layer);
        }

        set({
          layers: layers,
        });
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  appendFilter: async (properties) => {
    const { layers, layerFilter, turnOffLayer, append } = get();

    if (properties.type === "intersection") {
      // Intersection between points and a polygon

      // Checks

      //   Target checks
      const target = layers[properties.target];

      // // The layer id must exist in "layers".
      if (!target) {
        console.warn(
          `The filter could not be applied. Make sure the target (${properties.target}) exists in the layer registry.`
        );
        return false;
      }

      // One layer is defined in the layer id of "layers".
      if (!target.layer) {
        console.warn(
          `The filter could not be applied. Make sure the target (${properties.target}) has an associated layer.`
        );
        return false;
      }

      // The target has format "geojson" and is instance of GeoJSON.
      if (target.format != "geojson" || !(target.layer instanceof GeoJSON)) {
        console.warn(
          `To apply an "intersection" type filter, the target must be a GeoJSON.`
        );
        return false;
      }

      //   Origin checks
      const originLayer = properties.origin;

      // Logic
      const newLayerFilter = { ...layerFilter };
      const originGeoJSON = originLayer.toGeoJSON();
      const targetLayer = target.layer;
      const targetGeoJSON = targetLayer.toGeoJSON();

      try {
        if (target.geometry === "Point") {
          const filteredLayerGeoJSON = pointsWithinPolygon(
            targetGeoJSON,
            originGeoJSON
          );

          const filterInfo: LayerItem = {
            id: properties.id,
            name: properties.name,
            active: true,
            format: "geojson",
            temp: true,
            type: "filtered",
            geometry: "Point",
            columns: target["columns"],
            renamed: true,
          };

          const mount = await append(filterInfo, async () =>
            geoJson(filteredLayerGeoJSON, {
              pointToLayer: targetLayer.options.pointToLayer,
              onEachFeature: targetLayer.options.onEachFeature,
            })
          );

          if (mount) {
            turnOffLayer(properties.target);
            newLayerFilter[properties.id] = properties;
            set({
              layerFilter: newLayerFilter,
            });
            return true;
          } else {
            console.warn("The filtered layer could not be added to the map.");
            return false;
          }
        } else if (
          target.geometry === "Polygon"
        ) {
          const filteredLayerGeoJSON = intersect(featureCollection(targetGeoJSON, originGeoJSON));

          const filterInfo: LayerItem = {
            id: properties.id,
            name: properties.name,
            active: true,
            format: "geojson",
            temp: true,
            type: "filtered",
            geometry: "Polygon",
            columns: target["columns"],
            renamed: true,
          };

          const mount = await append(filterInfo, async () =>
            geoJson(filteredLayerGeoJSON, {
              pointToLayer: targetLayer.options.pointToLayer,
              onEachFeature: targetLayer.options.onEachFeature,
            })
          );

          if (mount) {
            turnOffLayer(properties.target);
            newLayerFilter[properties.id] = properties;
            set({
              layerFilter: newLayerFilter,
            });
            return true;
          } else {
            console.warn("The filtered layer could not be added to the map.");
            return false;
          }
        } else {
          console.warn(`The filter could not be applied. The geometry of the "target" has not considered.`)
          return false;
        }
      } catch (error) {
        console.error(
          `The filter could not be applied, an error occurred: ${error}`
        );
        return false;
      }
    } else {
      console.warn("The type of filter you want to apply is not listed.");
      return false;
    }
  },
  removeLayer: (id) => {
    const { layers, groups, layerFilter } = get();

    const layerInfo = layers[id];

    if (layerInfo) {
      const { id, layer } = layerInfo;

      for (const key in groups) {
        const group = groups[key];
        if (group.layers.includes(id)) {
          const index = group.layers.indexOf(id);
          groups[key].layers.splice(index, 1);
        }
      }

      if (id in layerFilter) {
        delete layerFilter[id];
      }

      if (layer) {
        layer.remove();
      }

      delete layers[id];
      set({
        layers: layers,
        groups: groups,
        layerFilter: layerFilter,
      });
    }
  },
  toggleLayer: (layerId) => {
    const { layers, turnOffLayer, turnOnLayer, groups } = get();

    const layer = layers[layerId]?.layer;
    const groupId = Object.keys(groups).find((group) =>
      groups[group].layers.includes(layerId)
    );
    const group = groupId ? groups[groupId] : undefined;

    if (!layer) return;
    if (!groupId) return;
    if (!group) return;
    if (!group.layers.includes(layerId)) return;

    if (group.type === "checkbox") {
      const isActive = layers[layerId].active;

      if (isActive) {
        turnOffLayer(layerId);
      } else {
        turnOnLayer(layerId);
      }
    } else if (group.type === "radio") {
      group.layers.forEach((groupLayerId) => {
        if (groupLayerId === layerId) {
          turnOnLayer(groupLayerId);
        } else {
          turnOffLayer(groupLayerId);
        }
      });
    }
  },
  turnOffLayer: (id) => {
    const { layers } = get();

    const layer = layers[id].layer;
    const newLayers = { ...layers };

    if (!layer) return;
    if (!newLayers[id]) return;

    const isActive = newLayers[id].active;

    if (isActive) {
      newLayers[id].active = false;
      layer.remove();
    }

    set({ layers: newLayers });
  },
  turnOnLayer: (id) => {
    const { layers } = get();

    const layer = layers[id].layer;
    const newLayers = { ...layers };

    if (!layer) return;
    if (!newLayers[id]) return;

    const isActive = newLayers[id].active;

    if (!isActive) {
      newLayers[id].active = true;
      const { map } = useMapStore.getState();
      map?.addLayer(layer);
    }

    set({ layers: newLayers });
  },
  toggleGroup: (id) => {
    const { layers, groups } = get();
    const map = useMapStore.getState().map;

    const newGroups = { ...groups };
    const newLayers = { ...layers };

    const group = groups[id];

    const isActive = group.active;

    if (isActive) {
      newGroups[id].active = false;
      newGroups[id].layers.map((layerId) => {
        newLayers[layerId].layer?.remove();
      });
    } else {
      newGroups[id].active = true;
      newGroups[id].layers.map((layerId) => {
        if (newLayers[layerId].active && newLayers[layerId].layer) {
          map?.addLayer(newLayers[layerId].layer);
        }
      });
    }

    set({
      layers: newLayers,
      groups: newGroups,
    });
  },
  assignLayerToGroup: (layerId, groupId) => {
    const { layers, groups } = get();

    // Checks
    if (!(layerId in layers)) {
      console.warn(
        `The layer "${layerId}" could not be added to the group "${groupId}" because the layer is not registered.`
      );
      return;
    }
    if (!(groupId in groups)) {
      console.warn(
        `The layer "${layerId}" could not be added to the group "${groupId}" because the group does not exist.`
      );
      return;
    }
    if (groups[groupId].layers.includes(layerId)) {
      console.warn(
        `The layer "${layerId}" could not be added to the group "${groupId}" the layer already exists in this group.`
      );
      return;
    }

    groups[groupId].layers.push(layerId);
    set({
      groups: groups,
    });
  },
  renameLayer: (id, newName) => {
    const { layers } = get();

    const layer = layers[id].layer;
    const newLayers = { ...layers };

    if (!layer) return;
    if (!newLayers[id]) return;

    newLayers[id].name = newName;

    set({ layers: newLayers });
  },
}));
