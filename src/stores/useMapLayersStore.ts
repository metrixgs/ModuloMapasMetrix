import { create } from "zustand";

import { geoJson, type GeoJSON } from "leaflet";

import { pointsWithinPolygon } from "@turf/turf";

import type {
  MapLayersStore,
  LayerItem,
} from "@/types/Stores/LayersManager";

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

      layers[info.id] = {
        ...info,
        layer: layer,
      };

      if (info.active) {
        map?.addLayer(layer);
      }

      set({
        layers: layers,
      });

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
      if (
        !Object.keys(layers).includes(properties.target)
      ) {
        console.warn(`The filter could not be applied. Make sure the target (${properties.target}) exists in the layer registry.`);
        return false;
      }

      if (!layers[properties.target].layer) {
        console.warn(`The filter could not be applied. Make sure the target (${properties.target}) has an associated layer.`);
        return false;
      }

      // Logic
      try {
        const newLayerFilter = { ...layerFilter };

        const filterGeoJSON = properties.origin.toGeoJSON();

        const target = layers[properties.target].layer;
        const targetGeoJSON = (target as GeoJSON).toGeoJSON();

        const filteredLayerGeoJSON = pointsWithinPolygon(
          targetGeoJSON,
          filterGeoJSON
        );
        const filteredLayer = geoJson(filteredLayerGeoJSON);

        const filterInfo: LayerItem = {
          id: properties.id,
          name: properties.name,
          active: true,
          format: "geojson",
          temp: true,
          type: "filtered",
        };

        const mount = await append(filterInfo, async () => filteredLayer);

        if (mount) {
          turnOffLayer(properties.target);
          newLayerFilter[properties.id] = properties;
          set({
            layerFilter: newLayerFilter
          })
          return true;
        } else {
          console.warn("The filtered layer could not be added to the map.");
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
        layerFilter: layerFilter
      })
    }
  },
  toggleLayer: (id) => {
    const { layers } = get();

    const layer = layers[id]?.layer;
    const newLayers = { ...layers };

    if (!layer) return;
    if (!newLayers[id]) return;

    const isActive = newLayers[id].active;

    if (isActive) {
      newLayers[id].active = false;
      layer.remove();
    } else {
      newLayers[id].active = true;
      const { map } = useMapStore.getState();
      map?.addLayer(layer);
    }

    set({ layers: newLayers });
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
      console.warn(`The layer "${layerId}" could not be added to the group "${groupId}" because the layer is not registered.`);
      return;
    }
    if (!(groupId in groups)) {
      console.warn(`The layer "${layerId}" could not be added to the group "${groupId}" because the group does not exist.`);
      return;
    }
    if (groups[groupId].layers.includes(layerId)) {
      console.warn(`The layer "${layerId}" could not be added to the group "${groupId}" the layer already exists in this group.`);
      return;
    }

    groups[groupId].layers.push(layerId);
    set({
      groups: groups,
    })
  }
}));
