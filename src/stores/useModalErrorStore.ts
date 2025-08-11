import { create } from "zustand";

import type { ModalErrorStore } from "@/types/Stores";

export const useModalErrorStore = create<ModalErrorStore>((set) => ({
  isOpen: false,
  size: "md",
  children: null,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setChildren: (content) => set({ children: content })
}));
