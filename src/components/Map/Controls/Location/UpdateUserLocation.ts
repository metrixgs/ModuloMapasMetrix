import type { LocationEvent } from "leaflet";

import { useUserLocationStore } from "@/stores/useUserLocationStore";

const UpdateUserLocation = (e: LocationEvent) => {
  const { setLocation, endSearch } = useUserLocationStore.getState();
  setLocation(e);
  endSearch();
}

export default UpdateUserLocation;