import { useEffect } from "react";

import type { LeafletEvent } from "leaflet";

import { useMapStore } from "@/stores/useMapStore";
import { updateMapState } from "./updateMapState";

import { visibleIncidents } from "@components/Map/Layers/Incidents/Events/visibleIndicents";

const MoveEnd = () => {
  const { map } = useMapStore((state) => state);

  useEffect(() => {
    const handleMoveEnd = (e: LeafletEvent) => {
      updateMapState();
    }

    map?.on("moveend", (e) => {
      handleMoveEnd(e);
      visibleIncidents(e);
    });
    return () => {
      map?.on("moveend", handleMoveEnd);
    }
  }, [])

  return null;
}

export default MoveEnd;