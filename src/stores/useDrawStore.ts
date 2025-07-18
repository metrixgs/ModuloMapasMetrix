import { create } from "zustand";

import type { DrawStore } from "@/types/Stores/Draw";

export const useDrawStore = create<DrawStore>((set, get) => ({
  features: undefined,
  mode: "pending",
  shape: undefined,
  isEditModeActive: undefined,
  isRemovalModeActive: undefined,
  changeMode: (mode) => {
    const { features } = get();

    let newFeatures;

    if (mode && mode !== "pending") {
      if (features) {
        features.forEach((layer) => {
          layer.remove();
        });
      }
      newFeatures = [];
    } else {
      if (features) {
        newFeatures = [...features];
      }
    }

    set({ mode: mode, features: newFeatures });
  },
  changeShape: (shape) => {
    const { features, mode } = get();

    if (mode && mode === "measure") {
      if (features) {
        features.forEach((layer) => {
          layer.remove();
        });
      }
      set({ shape: shape, features: [] });
    } else {
      set({ shape: shape });
    }
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
  removeFeature: (layer) => {
    const { features } = get();

    if (features) {
      const newFeatures = [...features];

      features.forEach((old) => {
        if (old === layer) {
          const index = newFeatures.indexOf(layer);
          if (index !== -1) {
            newFeatures.splice(index, 1);
          }
        }
      });

      set({
        features: newFeatures,
      });
    }
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
  activeRemovalMode: () => set({ isRemovalModeActive: true }),
  deactiveRemovalMode: () => set({ isRemovalModeActive: false }),
}));
