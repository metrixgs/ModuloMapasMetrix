import type { LeafletEvent } from "leaflet";

import UpdateVisibleIncidents from "@components/VisibleIncidents/UpdateVisibleIndicents";

const HandleIncidentsLoadEvent = (e: LeafletEvent) => {
  UpdateVisibleIncidents(e);
};

export default HandleIncidentsLoadEvent;
