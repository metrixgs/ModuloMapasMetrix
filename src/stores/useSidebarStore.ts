import { create } from "zustand";

import type { SidebarStore } from "@/types/Stores";

export const useSidebarStore = create<SidebarStore>((set) => ({
  isOpen: false,
  title: "",
  children: null,
  icon: null,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setTitle: (content) => set({ title: content }),
  setChildren: (content) => set({ children: content }),
  setIcon: (content) => set({ icon: content }),
}));
