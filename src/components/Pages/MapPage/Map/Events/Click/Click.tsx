import { useEffect } from "react";

import type { LeafletMouseEvent } from "leaflet";

import { useMapStore } from "@/stores/useMapStore";

import StreetViewEvent from "@components/Pages/MapPage/Map/Controls/StreetView/StreetViewEvent";

const Click = () => {
  const { map } = useMapStore((state) => state);

  useEffect(() => {
    const handleClick = (e: LeafletMouseEvent) => {
      StreetViewEvent(e);
    };

    map?.on("click", handleClick);

    return () => {
      map?.on("click", handleClick);
    };
  }, [map]);

  return null;
};

export default Click;