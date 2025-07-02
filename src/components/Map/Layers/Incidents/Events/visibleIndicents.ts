import type { GeoJSON, LeafletEvent } from "leaflet";
import type { FeatureCollection } from "geojson";
import { bboxPolygon, booleanIntersects } from "@turf/turf";

import { visibleIncidentsId } from "@/config.id";
import { LAYERS } from "@/config.map";

import { useMapStore } from "@/stores/useMapStore";
import { useMapLayersStore } from "@/stores/useMapLayersStore";

export const visibleIncidents = (e?: LeafletEvent) => {
  const map = useMapStore.getState().map;
  const layers = useMapLayersStore.getState().layerList;

  const incidents = (layers[LAYERS.incidents.id] as GeoJSON);

  const element = document.getElementById(visibleIncidentsId);

  if (map) {
    if (!incidents) return;
    const collection = incidents.toGeoJSON() as FeatureCollection;

    const bounds = map.getBounds();
    const bboxPolygon_ = bboxPolygon([
      bounds.getWest(),
      bounds.getSouth(),
      bounds.getEast(),
      bounds.getNorth()
    ]);

    const intersection = collection.features.filter(feature => booleanIntersects(feature, bboxPolygon_));

    const count = intersection.length;
    
    if (element) {
      element.innerHTML = `${count} / ${collection.features.length}`;
    }
  }

  
}