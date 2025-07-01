import { create } from "zustand";

import type { ModalStore } from "@/types/Stores";

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  title: "",
  children: null,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setTitle: (content) => set({ title: content }),
  setChildren: (content) => set({ children: content })
}));
