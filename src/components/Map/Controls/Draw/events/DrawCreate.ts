import type { GeoJSON } from "leaflet";

import type { GeomanCreateEvent } from "@/types/Geoman";

import { useDrawStore } from "@/stores/useDrawStore";

const DrawCreate = ({ layer }: GeomanCreateEvent) => {
  const { addFeature } = useDrawStore.getState();
  addFeature(layer as GeoJSON);
};

export default DrawCreate;
