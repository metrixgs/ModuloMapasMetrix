import type { GeomanEditEvent } from "@/types/Geoman";
import type { GeoJSON } from "leaflet";

import { useDrawStore } from "@/stores/useDrawStore";

const DrawEdit = ({ map, enabled }: GeomanEditEvent) => {
  const { replaceFeatures, activeEditMode, deactiveEditMode } =
    useDrawStore.getState();

  if (!enabled) {
    const layers = map.pm.getGeomanLayers();
    replaceFeatures(layers as GeoJSON[]);
    deactiveEditMode();
  } else {
    activeEditMode();
  }
};

export default DrawEdit;
