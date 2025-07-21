import type { GeoJSON } from "leaflet";

import type { GeomanCreateEvent } from "@/types/Geoman";

import type { LayerFilterItem } from "@/types/Stores/LayersManager";

import { LAYERS } from "@/config.map";

import { useDrawStore } from "@/stores/useDrawStore";
import { useMapLayersStore } from "@/stores/useMapLayersStore";

const DrawCreate = async ({ layer, shape }: GeomanCreateEvent) => {
  const { addFeature, mode } = useDrawStore.getState();
  const { layerFilter, appendFilter, assignLayerToGroup } =
    useMapLayersStore.getState();

  let filterId;
  let filterName;

  if (shape === "Line") {
    const geojson = (layer as GeoJSON).toGeoJSON();
    console.log(geojson);
  } else {
    if (mode === "create") {
      // Apply the filter only in creation mode
      if (shape === "Rectangle") {
        filterId = `rectangle-filter-${Object.keys(layerFilter).length + 1}`;
        filterName = `Rectangle filter ${Object.keys(layerFilter).length + 1}`;
      } else if (shape === "Circle") {
        filterId = `circle-filter-${Object.keys(layerFilter).length + 1}`;
        filterName = `Circle filter ${Object.keys(layerFilter).length + 1}`;
      } else if (shape === "Polygon") {
        filterId = `polygon-filter-${Object.keys(layerFilter).length + 1}`;
        filterName = `Polygon filter ${Object.keys(layerFilter).length + 1}`;
      } else {
        filterId = `filter-${Object.keys(layerFilter).length + 1}`;
        filterName = `Filter ${Object.keys(layerFilter).length + 1}`;
      }

      const filter: LayerFilterItem = {
        id: filterId,
        name: filterName,
        origin: layer as GeoJSON,
        target: LAYERS["incidents"].id,
        type: "intersection",
      };

      await appendFilter(filter);
      assignLayerToGroup(filterId, "metrix-filters");
    }
  }

  addFeature(layer as GeoJSON);
};

export default DrawCreate;
