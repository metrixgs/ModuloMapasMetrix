import { useEffect } from "react";

import type { GeomanRemoveEvent } from "@/types/Geoman";

import { useMapStore } from "@/stores/useMapStore";

import DrawRemove from "@components/Pages/MapPage/Map/Controls/Draw/events/DrawRemove";

const GeomanRemove = () => {
  const { map } = useMapStore((state) => state);

  useEffect(() => {
    const handleRemove = (e: GeomanRemoveEvent) => {
      DrawRemove(e);
    };

    map?.on("pm:remove", handleRemove);

    return () => {
      map?.on("pm:remove", handleRemove);
    };
  }, [map]);

  return null;
};

export default GeomanRemove;