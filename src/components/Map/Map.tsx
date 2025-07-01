import { useRef, useEffect } from "react";

import { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";

import { useMapStore } from "@/stores/useMapStore";

import { INITIAL_VIEW } from "@/config.map";

import MapLayers from "./Layers/MapLayers";
import MapControls from "./Controls/MapControls";
import MapEvents from "./Events/MapEvents";

const Map = () => {
  const mapContainerRef = useRef<null | HTMLDivElement>(null);
  const mapRef = useRef<null | LeafletMap>(null);

  const { setMap, mapInit } = useMapStore((state) => state);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const mapClass = new LeafletMap(mapContainerRef.current, {
      zoom: INITIAL_VIEW.zoom,
      center: INITIAL_VIEW.center,
      zoomControl: false,
    });

    setMap(mapClass);

    mapRef.current = mapClass;
  }, []);

  return (
    <div ref={mapContainerRef} className="w-full h-full">
      {
        mapInit
        &&
        <>
          <MapLayers />
          <MapControls />
          <MapEvents />
        </>
      }
    </div>
  );
};

export default Map;
