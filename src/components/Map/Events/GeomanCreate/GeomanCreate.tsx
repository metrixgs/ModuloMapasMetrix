import { useEffect } from "react";

import type { GeomanCreateEvent } from "@/types/Geoman";

import { useMapStore } from "@/stores/useMapStore";

import DrawCreate from "@components/Map/Controls/Draw/events/DrawCreate";

const GeomanCreate = () => {
  const { map } = useMapStore((state) => state);

  useEffect(() => {
    const handleCreate = (e: GeomanCreateEvent) => {
      DrawCreate(e);
    };

    map?.on("pm:create", handleCreate);

    return () => {
      map?.on("pm:create", handleCreate);
    };
  }, [map]);

  return null;
};

export default GeomanCreate;
