import type { GeoJSON } from "leaflet";

import type { GeomanCreateEvent } from "@/types/Geoman";

import type { LayerFilterItem } from "@/types/Stores/LayersManager";

import { LAYERS } from "@/config.map";

import { useDrawStore } from "@/stores/useDrawStore";
import { useMapLayersStore } from "@/stores/useMapLayersStore";

const DrawCreate = ({ layer, shape }: GeomanCreateEvent) => {
  const { addFeature } = useDrawStore.getState();
  const { appendFilter } = useMapLayersStore.getState();

  if (shape === "Line") {
    const geojson = (layer as GeoJSON).toGeoJSON();
    console.log(geojson);
  } else {
    const filter: LayerFilterItem = {
      id: "polygon-filter",
      name: "Polygon filter",
      origin: layer as GeoJSON,
      target: LAYERS["incidents"].id,
      type: "intersection"
    }

    appendFilter(filter);
  }

  addFeature(layer as GeoJSON);
};

export default DrawCreate;
