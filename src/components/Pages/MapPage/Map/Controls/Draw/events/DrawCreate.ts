import { GeoJSON } from "leaflet";

import type { GeomanCreateEvent } from "@/types/Geoman";

import { useDrawStore } from "@/stores/useDrawStore";

const DrawCreate = async ({ layer, shape }: GeomanCreateEvent) => {
  // if (!(layer instanceof GeoJSON)) return;

  const { features, addFeature } = useDrawStore.getState();

  let layerItemId = crypto.randomUUID();
  let layerItemName = `${shape} ${features?.length}`;

  addFeature({
    id: layerItemId,
    geojson: (layer as GeoJSON),
    name: layerItemName,
    shape: shape,
  });
};

export default DrawCreate;
