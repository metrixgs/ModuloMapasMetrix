import { useEffect } from "react";

import type { GeomanCreateEvent } from "@/types/Geoman";

import { useMapStore } from "@/stores/useMapStore";

const GeomanCreate = () => {
  const { map } = useMapStore((state) => state);

  useEffect(() => {
    const handleCreate = ({ shape, layer }: GeomanCreateEvent) => {
      console.log(shape);
      console.log(layer);
    };

    map?.on("pm:create", handleCreate);

    return () => {
      map?.on("pm:create", handleCreate);
    };
  }, [map]);

  return null;
};

export default GeomanCreate;
