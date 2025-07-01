import type { PluralResponseAPI, IncidentAPI } from "@/types/API";
import type { Incident } from "@/types/Incident";

import AdaptedIncident from "./AdaptedIncident";

const AdaptedIncidents = (
  incidents: PluralResponseAPI<IncidentAPI>
): Incident[] => {
  const parsed = incidents.data.map((item) => AdaptedIncident(item));
  return parsed;
};

export default AdaptedIncidents;
