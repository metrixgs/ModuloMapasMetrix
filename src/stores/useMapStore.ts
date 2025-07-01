import { create } from "zustand";

import type { MapStore } from "@/types/Stores";

export const useMapStore = create<MapStore>((set) => ({
  map: undefined,
  mapInit: false,
  setMap: (map) => set({ map: map, mapInit: true }),
}));
