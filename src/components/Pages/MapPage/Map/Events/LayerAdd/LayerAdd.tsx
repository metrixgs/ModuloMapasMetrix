import { useEffect } from "react";

import type { LayerEvent } from "leaflet";

import { useMapStore } from "@/stores/useMapStore";

import UpdateVisibleIncidents from "@components/Pages/MapPage/VisiblePoints/UpdateVisiblePoints";

const LayerAdd = () => {
  const { map } = useMapStore((state) => state);

  useEffect(() => {
    const handleLayerAdd = (e: LayerEvent) => {
      UpdateVisibleIncidents(e);
    };

    map?.on("layeradd", handleLayerAdd);

    return () => {
      map?.on("layeradd", handleLayerAdd);
    };
  }, [map]);

  return null;
};

export default LayerAdd;
