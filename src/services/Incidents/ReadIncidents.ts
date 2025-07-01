import axios from "axios";

import { API, ENDPOINTS } from "@/config.api";

import AdaptedIncidents from "@/adapters/Incidents/AdaptedIncidents";
import type { IncidentAPI, PluralResponseAPI } from "@/types/API";

export const ReadIncidents = async () => {
  const url = new URL(API.concat(ENDPOINTS.incidents));

  try {
    const response = await axios.get(url.toString());
    const parsed = AdaptedIncidents(
      response.data as PluralResponseAPI<IncidentAPI>
    )
    return parsed;
  } catch (error) {
    console.error(error);
    return null;
  }
}