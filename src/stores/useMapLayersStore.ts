import { create } from "zustand";

import { GeoJSON, TileLayer } from "leaflet";

import type { MapLayersStore } from "@/types/Stores/LayersManager";

import { useMapStore } from "./useMapStore";
import { intersectionFilter } from "./LayersManager/Filters/intersectionFilter";
import { divideFeaturesFilter } from "./LayersManager/Filters/divideFeaturesFilter";

export const useMapLayersStore = create<MapLayersStore>((set, get) => ({
  groups: {},
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
  appendFilter: async (filter) => {
    if (filter.type === "intersection") {
      // Intersection between points and a polygon.
      const result = await intersectionFilter(filter);
      return result;
    } else if (filter.type === "divideFeatures") {
      // Separate features from a layer based on a selection of their properties.
      const result = await divideFeaturesFilter(filter);
      return result;
    } else {
      console.warn("The type of filter you want to apply is not listed.");
      return false;
    }
  },
  removeLayer: (id) => {
    const { layers, groups, layerFilter } = get();

    const layerInfo = layers[id];
    const newGroups = { ...groups };

    if (layerInfo) {
      const { id, layer } = layerInfo;

      for (const key in newGroups) {
        const layers = newGroups[key].layers;
        if (layers && layers.includes(id)) {
          const index = layers.indexOf(id);
          layers.splice(index, 1);
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
        groups: newGroups,
        layerFilter: layerFilter,
      });
    }
  },
  toggleLayer: (layerId) => {
    const { layers, turnOffLayer, turnOnLayer, groups } = get();

    const layer = layers[layerId]?.layer;

    const groupId = Object.keys(groups).find(
      (group) => groups[group].layers && groups[group].layers.includes(layerId)
    );
    const group = groupId ? groups[groupId] : undefined;

    if (!layer) return;
    if (!groupId) return;
    if (!group) return;
    if (!group.layers) return;
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
  focusLayer: (id) => {
    const { layers } = get();

    const layerItem = layers[id];
    const map = useMapStore.getState().map;

    if (layerItem && layerItem.layer && layerItem.format === "geojson" && map) {
      map.flyToBounds(layerItem.layer.getBounds());
    }
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
  toggleGroup: (id) => {
    const { layers, groups } = get();
    const map = useMapStore.getState().map;

    const newGroups = { ...groups };
    const newLayers = { ...layers };

    if (!newGroups[id].layers) return;

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

    const newGroups = { ...groups };

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
    if (groups[groupId].layers && groups[groupId].layers.includes(layerId)) {
      console.warn(
        `The layer "${layerId}" could not be added to the group "${groupId}" the layer already exists in this group.`
      );
      return;
    }

    if (newGroups[groupId].layers) {
      newGroups[groupId].layers.push(layerId);
    } else {
      newGroups[groupId].layers = [layerId];
    }
    set({
      groups: newGroups,
    });
  },
  createGroup: async (group) => {
    const { groups } = get();
    if (Object.keys(groups).includes(group.id)) {
      return false;
    } else {
      const newGroups = { ...groups };
      newGroups[group.id] = group;
      set({
        groups: newGroups,
      });
      return true;
    }
  },
  deleteGroup: (groupId) => {},
}));
