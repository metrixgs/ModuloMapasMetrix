import { useRef, useEffect } from "react";

// Leaflet
import { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.vectorgrid";

// Geoman
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";

import { LoadScript } from "@react-google-maps/api";

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
      preferCanvas: true,
      zoom: INITIAL_VIEW.zoom,
      center: INITIAL_VIEW.center,
      zoomControl: false,
    });

    mapClass.pm.setLang("es");

    setMap(mapClass);

    mapRef.current = mapClass;
  }, []);

  return (
    <div ref={mapContainerRef} className="w-full h-full">
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        {mapInit && (
          <>
            <MapLayers />
            <MapControls />
            <MapEvents />
          </>
        )}
      </LoadScript>
    </div>
  );
};

export default Map;
