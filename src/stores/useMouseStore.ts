import { create } from "zustand";

import { INITIAL_VIEW } from "@/config.map";

import type { MouseStore } from "@/types/Stores";

export const useMouseStore = create<MouseStore>((set) => ({
  mouseLat: INITIAL_VIEW.center.lat,
  mouseLng: INITIAL_VIEW.center.lng,
  setMouseState: (mouseLat, mouseLng) =>
    set({
      mouseLat: mouseLat,
      mouseLng: mouseLng,
    }),
}));