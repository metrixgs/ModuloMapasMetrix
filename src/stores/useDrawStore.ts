import { create } from "zustand";

import type { DrawStore } from "@/types/Stores";

export const useDrawStore = create<DrawStore>((set, get) => ({
  features: undefined,
  mode: undefined,
  shape: undefined,
  isEditModeActive: undefined,
  changeMode: (mode) => {
    const { features } = get();

    let newFeatures;

    if (mode) {
      if (features) {
        features.forEach((layer) => {
          layer.remove();
        });
      }
      newFeatures = [];
    }

    set({ mode: mode, features: newFeatures });
  },
  changeShape: (shape) => {
    const { features } = get();

    if (features) {
      features.forEach((layer) => {
        layer.remove();
      });
    }

    set({ shape: shape, features: [] });
  },
  addFeature: (layer) => {
    const { features } = get();

    let newFeatures;

    if (features) {
      newFeatures = [...features, layer];
    } else {
      newFeatures = [layer];
    }

    set({ features: newFeatures });
  },
  replaceFeatures: (layers) => {
    set({
      features: layers,
    });
  },
  clearStore: () => {
    const { features } = get();

    if (features) {
      features.forEach((layer) => {
        layer.remove();
      });
    }

    set({ shape: undefined, mode: undefined, features: undefined });
  },
  activeEditMode: () => set({ isEditModeActive: true }),
  deactiveEditMode: () => set({ isEditModeActive: false }),
}));
