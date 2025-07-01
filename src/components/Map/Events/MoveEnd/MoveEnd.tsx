import { useEffect } from "react";

import { useMapStore } from "@/stores/useMapStore";
import { updateMapState } from "./updateMapState";

const MoveEnd = () => {
  const { map } = useMapStore((state) => state);

  useEffect(() => {
    const handleMoveEnd = () => {
      updateMapState();
    }

    map?.on("moveend", handleMoveEnd);
    return () => {
      map?.on("moveend", handleMoveEnd);
    }
  }, [])

  return null;
}

export default MoveEnd;