import { useEffect } from "react";

import type { LeafletMouseEvent } from "leaflet";

import { useMapStore } from "@/stores/useMapStore";
import { updateMouseState } from "./updateMouseState";

const MouseMove = () => {
  const { map } = useMapStore((state) => state);

  useEffect(() => {
    const handleMouseMove = (e: LeafletMouseEvent) => {
      updateMouseState(e);
    };

    map?.on("mousemove", handleMouseMove);

    return () => {
      map?.on("mousemove", handleMouseMove);
    };
  }, []);

  return null;
};

export default MouseMove;
