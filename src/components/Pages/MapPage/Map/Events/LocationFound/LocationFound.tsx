import { useEffect } from "react";

import type { LocationEvent } from "leaflet";

import { useMapStore } from "@/stores/useMapStore";

import UpdateUserLocation from "@components/Pages/MapPage/Map/Controls/Location/UpdateUserLocation";

const LocationFound = () => {
  const { map } = useMapStore((state) => state);

  useEffect(() => {
    const handleLocationFound = (e: LocationEvent) => {
      UpdateUserLocation(e);
    };

    map?.on("locationfound", handleLocationFound);

    return () => {
      map?.on("locationfound", handleLocationFound);
    };
  }, [map]);
  return null;
};

export default LocationFound;
