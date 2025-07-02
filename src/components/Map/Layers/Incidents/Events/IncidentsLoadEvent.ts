import type { LeafletEvent } from "leaflet";
import { visibleIncidents } from "./visibleIndicents";

const HandleIncidentsLoadEvent = (e?: LeafletEvent) => {
  visibleIncidents(e);
}

export default HandleIncidentsLoadEvent;