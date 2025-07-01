import { create } from "zustand";

import type { MapStateStore } from "@/types/Stores";
import { INITIAL_VIEW } from "@/config.map";

export const useMapStateStore = create<MapStateStore>((set) => ({
  zoom: INITIAL_VIEW.zoom,
  centerLat: INITIAL_VIEW.center.lat,
  centerLng: INITIAL_VIEW.center.lng,
  setMapState: (zoom, centerLat, centerLng) =>
    set({
      zoom: zoom,
      centerLat: centerLat,
      centerLng: centerLng,
    })
}));