import { create } from "zustand";

import type { MapLayersStore } from "@/types/Stores/LayersManager";

import { useMapStore } from "./useMapStore";
import { GROUPS } from "@/config.map";

export const useMapLayersStore = create<MapLayersStore>((set, get) => ({
  groups: GROUPS,
  layerList: {},
  layerInfo: {},
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
    const { layerInfo, layerList } = get();


  }
}));
