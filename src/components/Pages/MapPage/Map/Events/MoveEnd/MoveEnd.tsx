import { useEffect } from "react";

import type { LeafletEvent } from "leaflet";

import { useMapStore } from "@/stores/useMapStore";

import UpdateMapState from "./UpdateMapState";
import UpdateVisibleIncidents from "@components/Pages/MapPage/VisibleIncidents/UpdateVisibleIndicents";

const MoveEnd = () => {
  const { map } = useMapStore((state) => state);

  useEffect(() => {
    const handleMoveEnd = (e: LeafletEvent) => {
      UpdateMapState();
      UpdateVisibleIncidents(e);
    };

    map?.on("moveend", handleMoveEnd);
    return () => {
      map?.on("moveend", handleMoveEnd);
    };
  }, [map]);

  return null;
};

export default MoveEnd;
