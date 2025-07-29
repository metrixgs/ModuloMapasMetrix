import type { LeafletEvent } from "leaflet";

import UpdateVisibleIncidents from "@components/Pages/MapPage/VisiblePoints/UpdateVisiblePoints";

const HandleIncidentsLoadEvent = (e: LeafletEvent) => {
  UpdateVisibleIncidents(e);
};

export default HandleIncidentsLoadEvent;
