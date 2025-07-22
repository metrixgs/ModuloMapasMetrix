import type { PluralResponseAPI } from "@/types/API";
import type { Incident, IncidentAPI } from "@/types/Incident";

import AdaptedIncident from "./AdaptedIncident";

const AdaptedIncidents = (
  incidents: PluralResponseAPI<IncidentAPI>
): Incident[] => {
  const parsed = incidents.data.map((item) => AdaptedIncident(item));
  return parsed;
};

export default AdaptedIncidents;
