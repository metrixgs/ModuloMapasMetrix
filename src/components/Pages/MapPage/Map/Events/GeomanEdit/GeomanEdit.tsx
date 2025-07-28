import { useEffect } from "react";

import type { GeomanEditEvent } from "@/types/Geoman";

import { useMapStore } from "@/stores/useMapStore";

import DrawEdit from "@components/Pages/MapPage/Map/Controls/Draw/events/DrawEdit";

const GeomanEdit = () => {
  const { map } = useMapStore((state) => state);

  useEffect(() => {
    const handleEdit = (e: GeomanEditEvent) => {
      DrawEdit(e);
    };

    map?.on("pm:globaleditmodetoggled", handleEdit);

    return () => {
      map?.on("pm:globaleditmodetoggled", handleEdit);
    };
  }, [map]);

  return null;
};

export default GeomanEdit;