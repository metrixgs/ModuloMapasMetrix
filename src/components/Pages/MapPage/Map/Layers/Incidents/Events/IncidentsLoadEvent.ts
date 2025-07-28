import type { LeafletEvent } from "leaflet";

import UpdateVisibleIncidents from "@components/Pages/MapPage/VisibleIncidents/UpdateVisibleIndicents";

const HandleIncidentsLoadEvent = (e: LeafletEvent) => {
  UpdateVisibleIncidents(e);
};

export default HandleIncidentsLoadEvent;
