import { create } from "zustand";

import { geoJSON } from "leaflet";

import { area, length } from "@turf/turf";

import type { DrawStore } from "@/types/Stores/Draw";
import type { LayerItem, LoadLayerFunction } from "@/types/Stores/LayersManager";

import { useMapLayersStore } from "@/stores/useMapLayersStore";

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
        features.forEach((feature) => {
          feature.layer.remove();
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
        features.forEach((feature) => {
          feature.layer.remove();
        });
      }
      set({ shape: shape, features: [] });
    } else {
      set({ shape: shape });
    }
  },
  addFeature: async (feature) => {
    const { features, mode } = get();
    const { append, assignLayerToGroup } = useMapLayersStore.getState();

    let newFeatures;

    feature.layer.remove();

    if (features) {
      newFeatures = [...features, feature];
    } else {
      newFeatures = [feature];
    }

    const layerItem: LayerItem = {
      id: feature.id,
      name: feature.name,
      format: "geojson",
      active: true,
      temp: false,
      type: "layer",
      columns: [{ accessorKey: "area_m2" }, { accessorKey: "length_m" }]
    }

    const load: LoadLayerFunction = async () => {
      const geojson = feature.layer.toGeoJSON();
      if (geojson.type === "Feature") {
        geojson.properties["area_m2"] = area(geojson);
        geojson.properties["length_m"] = length(geojson, { units: "meters" });
      }
      return geoJSON(geojson, {
        style: () => {
          if (mode === "create") {
            return {
              fillColor: "#267E26",
              color: "#267E26"
            }
          } else if (mode === "measure") {
            return {
              fillColor: "#7BC11D",
              color: "#7BC11D"
            }
          } else return {};
        }
      })
    }

    await append(layerItem, load);

    assignLayerToGroup(feature.id, "metrix-draws");
    set({ features: newFeatures });
  },
  removeFeature: (layerId) => {
    const { features } = get();
    const { removeLayer } = useMapLayersStore.getState();

    if (features) {
      const newFeatures = [...features];

      features.forEach((old) => {
        if (old.id === layerId) {
          removeLayer(layerId);
          const index = newFeatures.indexOf(old);
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
    const { removeLayer } = useMapLayersStore.getState();

    if (features) {
      features.forEach((feature) => {
        removeLayer(feature.id);
      });
    }

    set({ shape: undefined, mode: undefined, features: undefined });
  },
  activeEditMode: () => set({ isEditModeActive: true }),
  deactiveEditMode: () => set({ isEditModeActive: false }),
  activeRemovalMode: () => set({ isRemovalModeActive: true }),
  deactiveRemovalMode: () => set({ isRemovalModeActive: false }),
}));
