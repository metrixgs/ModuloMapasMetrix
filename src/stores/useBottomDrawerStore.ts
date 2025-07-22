import { create } from "zustand";

import type { BottomDrawer } from "@/types/Stores";

export const useBottomDrawerStore = create<BottomDrawer>((set) => ({
  isOpen: false,
  isHeaderEnabled: false,
  title: "",
  children: null,
  icon: null,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false, title: "", children: null, icon: null }),
  disableHeader: () => set({ isHeaderEnabled: false }),
  enableHeader: () => set({ isHeaderEnabled: true }),
  setTitle: (content) => set({ title: content }),
  setChildren: (content) => set({ children: content }),
  setIcon: (content) => set({ icon: content }),
}));