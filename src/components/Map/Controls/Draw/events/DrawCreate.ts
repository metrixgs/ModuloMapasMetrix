import type { GeoJSON } from "leaflet";

import type { GeomanCreateEvent } from "@/types/Geoman";

import { useDrawStore } from "@/stores/useDrawStore";

const DrawCreate = ({ layer, shape }: GeomanCreateEvent) => {
  const { addFeature } = useDrawStore.getState();

  if (shape === "Line") {
    const geojson = (layer as GeoJSON).toGeoJSON();
    console.log(geojson);
  }

  addFeature(layer as GeoJSON);
};

export default DrawCreate;
