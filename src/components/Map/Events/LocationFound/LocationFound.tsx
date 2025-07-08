import { useEffect } from "react";

import type { LocationEvent } from "leaflet";

import { useMapStore } from "@/stores/useMapStore";
import { useUserLocationStore } from "@/stores/useUserLocationStore";

const LocationFound = () => {
  const { map } = useMapStore((state) => state);
  const { setLocation, endSearch } = useUserLocationStore((state) => state);

  useEffect(() => {
    const handleLocationFound = (e: LocationEvent) => {
      setLocation(e);
      endSearch();
    };

    map?.on("locationfound", handleLocationFound);

    return () => {
      map?.on("locationfound", handleLocationFound);
    };
  }, [map]);
  return null;
};

export default LocationFound;
