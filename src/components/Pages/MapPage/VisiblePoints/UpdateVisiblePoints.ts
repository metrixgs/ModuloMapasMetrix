import { Marker, type LeafletEvent } from "leaflet";
import { bboxPolygon, booleanIntersects, featureCollection } from "@turf/turf";

import { visiblePointsId } from "@/config.id";

import { useMapStore } from "@/stores/useMapStore";

const UpdateVisibleIncidents = (e: LeafletEvent) => {
  const map = useMapStore.getState().map;

  const element = document.getElementById(visiblePointsId);

  if (map) {
    const totalPointsLoaded: Marker[] = [];
    map.eachLayer((layer) => {
      if (layer instanceof Marker) {
        totalPointsLoaded.push(layer);
      }
    })

    const collection = featureCollection(
      totalPointsLoaded.map((point) => {
        return point.toGeoJSON();
      })
    )

    const bounds = map.getBounds();
    const bboxPolygon_ = bboxPolygon([
      bounds.getWest(),
      bounds.getSouth(),
      bounds.getEast(),
      bounds.getNorth(),
    ]);
    const intersection = collection.features.filter((feature) =>
      booleanIntersects(feature, bboxPolygon_)
    );

    const count = intersection.length;

    if (element) {
      element.innerHTML = `${count} / ${totalPointsLoaded.length}`;
    }
  }
};

export default UpdateVisibleIncidents;
