import type { StreetViewStore } from "@/types/Stores";
import { create } from "zustand";

export const useStreetViewStore = create<StreetViewStore>((set) => ({
  isStreetViewActive: false,
  activeStreetView: () => set({ isStreetViewActive: true }),
  deactiveStreetView: () => set({ isStreetViewActive: false }),
}))