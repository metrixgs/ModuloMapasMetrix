import { useEffect } from "react";

import type { LeafletMouseEvent } from "leaflet";

import { useMapStore } from "@/stores/useMapStore";

import UpdateMouseCoordinates from "@components/Coordinates/UpdateMouseCoordinates";

const MouseMove = () => {
  const { map } = useMapStore((state) => state);

  useEffect(() => {
    const handleMouseMove = (e: LeafletMouseEvent) => {
      UpdateMouseCoordinates(e);
    };

    map?.on("mousemove", handleMouseMove);

    return () => {
      map?.on("mousemove", handleMouseMove);
    };
  }, []);

  return null;
};

export default MouseMove;
