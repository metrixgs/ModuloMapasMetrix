import { create } from "zustand";

import { geoJson, type GeoJSON } from "leaflet";

import { pointsWithinPolygon } from "@turf/turf";

import type {
  MapLayersStore,
  LayerInfoItem,
} from "@/types/Stores/LayersManager";

import { useMapStore } from "./useMapStore";
import { GROUPS } from "@/config.map";

export const useMapLayersStore = create<MapLayersStore>((set, get) => ({
  groups: GROUPS,
  layerList: {},
  layerInfo: {},
  layerFilter: {},
  append: async (info, loadLayerFunction) => {
    const { layerList, layerInfo } = get();
    const map = useMapStore.getState().map;

    const oldLayer = layerList[info.id];
    if (oldLayer) return false;

    try {
      const layer = await loadLayerFunction();

      layerList[info.id] = layer;
      layerInfo[info.id] = info;

      if (info.active) {
        map?.addLayer(layer);
      }

      set({
        layerList: layerList,
        layerInfo: layerInfo,
      });

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  appendFilter: async (properties) => {
    const { layerList, layerInfo, layerFilter, turnOffLayer, append } = get();

    if (properties.type === "intersection") {
      // Intersection between points and a polygon

      // Checks
      if (
        !Object.keys(layerList).includes(properties.target) ||
        !Object.keys(layerInfo).includes(properties.target)
      ) {
        console.warn(`The filter could not be applied. Make sure the target (${properties.target}) exists in the layer registry.`);
        return false;
      }

      // Logic
      try {
        const newLayerFilter = { ...layerFilter };

        const filterGeoJSON = properties.origin.toGeoJSON();

        const target = layerList[properties.target];
        const targetGeoJSON = (target as GeoJSON).toGeoJSON();

        const filteredLayerGeoJSON = pointsWithinPolygon(
          targetGeoJSON,
          filterGeoJSON
        );
        const filteredLayer = geoJson(filteredLayerGeoJSON);

        const filterInfo: LayerInfoItem = {
          id: properties.id,
          name: properties.name,
          active: true,
          geometry: "geojson",
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
  removeLayer: (id) => {},
  toggleLayer: (id) => {
    const { layerInfo, layerList } = get();

    const layer = layerList[id];
    const newLayerInfo = structuredClone(layerInfo);

    if (!layer) return;
    if (!newLayerInfo[id]) return;

    const isActive = newLayerInfo[id].active;

    if (isActive) {
      newLayerInfo[id].active = false;
      layer.remove();
    } else {
      newLayerInfo[id].active = true;
      const { map } = useMapStore.getState();
      map?.addLayer(layer);
    }

    set({ layerInfo: newLayerInfo });
  },
  turnOffLayer: (id) => {
    const { layerInfo, layerList } = get();

    const layer = layerList[id];
    const newLayerInfo = structuredClone(layerInfo);

    if (!layer) return;
    if (!newLayerInfo[id]) return;

    const isActive = newLayerInfo[id].active;

    if (isActive) {
      newLayerInfo[id].active = false;
      layer.remove();
    }

    set({ layerInfo: newLayerInfo });
  },
  turnOnLayer: (id) => {
    const { layerInfo, layerList } = get();

    const layer = layerList[id];
    const newLayerInfo = structuredClone(layerInfo);

    if (!layer) return;
    if (!newLayerInfo[id]) return;

    const isActive = newLayerInfo[id].active;

    if (!isActive) {
      newLayerInfo[id].active = true;
      const { map } = useMapStore.getState();
      map?.addLayer(layer);
    }

    set({ layerInfo: newLayerInfo });
  },
  toggleGroup: (id) => {
    const { layerInfo, layerList, groups } = get();
    const map = useMapStore.getState().map;

    const newGroups = { ...groups };
    const newLayerInfo = { ...layerInfo };

    const group = groups[id];

    const isActive = group.active;

    if (isActive) {
      newGroups[id].active = false;
      newGroups[id].layers.map((layerId) => {
        layerList[layerId].remove();
      });
    } else {
      newGroups[id].active = true;
      newGroups[id].layers.map((layerId) => {
        if (newLayerInfo[layerId].active) {
          map?.addLayer(layerList[layerId]);
        }
      });
    }

    set({
      layerInfo: newLayerInfo,
      groups: newGroups,
    });
  },
  assignLayerToGroup: (layerId, groupId) => {}
}));
