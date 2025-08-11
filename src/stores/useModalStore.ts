import { create } from "zustand";

import type { ModalStore } from "@/types/Stores";

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  size: "md",
  title: "",
  children: null,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false, size: "md", children: null }),
  setSize: (size) => set({ size: size }),
  setTitle: (content) => set({ title: content }),
  setChildren: (content) => set({ children: content })
}));
