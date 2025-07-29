import { useEffect } from "react";

import type { LayerEvent } from "leaflet";

import { useMapStore } from "@/stores/useMapStore";

import UpdateVisibleIncidents from "@components/Pages/MapPage/VisiblePoints/UpdateVisiblePoints";

const LayerRemove = () => {
  const { map } = useMapStore((state) => state);

  useEffect(() => {
    const handleLayerRemove = (e: LayerEvent) => {
      UpdateVisibleIncidents(e);
    };

    map?.on("layerremove", handleLayerRemove);

    return () => {
      map?.on("layerremove", handleLayerRemove);
    };
  }, [map]);

  return null;
};

export default LayerRemove;
