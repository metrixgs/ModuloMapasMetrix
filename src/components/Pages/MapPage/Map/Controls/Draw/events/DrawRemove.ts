import type { GeomanRemoveEvent } from "@/types/Geoman";
import { GeoJSON } from "leaflet";

import { useDrawStore } from "@/stores/useDrawStore";

const DrawRemove = ({ layer }: GeomanRemoveEvent) => {
  const { removeFeature } = useDrawStore.getState();

  removeFeature(layer as GeoJSON);
};

export default DrawRemove;
