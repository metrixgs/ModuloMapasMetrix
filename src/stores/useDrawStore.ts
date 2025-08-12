import { create } from "zustand";

import { area, length, featureCollection } from "@turf/turf";

import type { Feature } from "geojson";
import type { DrawStore } from "@/types/Stores/Draw";
import type { GeoJSONLayerItem } from "@/types/Stores/LayersManager";

import { useMapLayersStore } from "@/stores/useMapLayersStore";

import AddLayer from "@components/Pages/MapPage/Map/Layers/AddLayer/AddLayer";

import { TEMPORAL_GROUP } from "@/config.map";

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
          feature.geojson.remove();
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
          feature.geojson.remove();
        });
      }
      set({ shape: shape, features: [] });
    } else {
      set({ shape: shape });
    }
  },
  addFeature: async (feature) => {
    const { features, mode } = get();

    let newFeatures;

    // feature.geojson.remove();

    if (features) {
      newFeatures = [...features, feature];
    } else {
      newFeatures = [feature];
    }

    // const geojson = feature.geojson.toGeoJSON() as Feature;
    // if (!geojson.properties) {
    //   geojson["properties"] = {};
    // }

    // geojson.properties["area_m2"] = area(geojson);
    // geojson.properties["length_m"] = length(geojson, { units: "meters" });

    // const layerItem: GeoJSONLayerItem = {
    //   id: feature.id,
    //   name: feature.name,
    //   format: "geojson",
    //   active: true,
    //   temp: false,
    //   type: "layer",
    //   geometry: "Polygon",
    //   renamed: true,
    //   source: {
    //     sourceType: "generated",
    //     geojson: featureCollection([geojson]),
    //   },
    // };

    // await AddLayer({ layer: layerItem, group: TEMPORAL_GROUP });
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
        feature.geojson.remove();
      });
    }

    set({ shape: undefined, mode: undefined, features: undefined });
  },
  activeEditMode: () => set({ isEditModeActive: true }),
  deactiveEditMode: () => set({ isEditModeActive: false }),
  activeRemovalMode: () => set({ isRemovalModeActive: true }),
  deactiveRemovalMode: () => set({ isRemovalModeActive: false }),
}));
