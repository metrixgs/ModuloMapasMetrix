import { create } from "zustand";

import type { BottomDrawer } from "@/types/Stores";

export const useBottomDrawerStore = create<BottomDrawer>((set, get) => ({
  isOpen: false,
  isHeaderEnabled: false,
  isFullscreen: false,
  title: "",
  children: null,
  icon: null,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false, title: "", children: null, icon: null, isFullscreen: false }),
  disableHeader: () => set({ isHeaderEnabled: false }),
  enableHeader: () => set({ isHeaderEnabled: true }),
  setTitle: (content) => set({ title: content }),
  setChildren: (content) => set({ children: content }),
  setIcon: (content) => set({ icon: content }),
  enableFullscreen: () => set({ isFullscreen: true }),
  disableFullscreen: () => set({ isFullscreen: false }),
  toggleFullscreen: () => {
    const { isFullscreen, enableFullscreen, disableFullscreen } = get();
    if (isFullscreen) {
      disableFullscreen();
    } else {
      enableFullscreen();
    }
  }
}));