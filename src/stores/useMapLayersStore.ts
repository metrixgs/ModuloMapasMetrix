import { create } from "zustand";

import type { MapLayersStore } from "@/types/Stores";

import { useMapStore } from "./useMapStore";

export const useMapLayersStore = create<MapLayersStore>((set, get) => ({
  layerList: {},
  layerInfo: {},
  append: (layer, info) => {
    const { layerList, layerInfo } = get();

    const newLayerList = {
      [info.id]: layer,
      ...layerList,
    };

    const newLayerInfo = {
      [info.id]: info,
      ...layerInfo,
    };

    set({
      layerList: newLayerList,
      layerInfo: newLayerInfo,
    });
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
}));
