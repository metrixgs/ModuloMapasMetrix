import type { FeatureAPI } from "@/types/API";
import type { Hood, HoodAPIProperties } from "@/types/Filters/Hood";

import { API_GEO_REFERENCE } from "@/config.api.geo";

const AdaptedHood = (hood: FeatureAPI<HoodAPIProperties>): Hood => {
  const map = API_GEO_REFERENCE.hood.fields;

  const parsed: Hood = {
    id: hood.properties[map.id],
    code: hood.properties[map.code],
    name: hood.properties[map.name]
  }

  return parsed;
}

export default AdaptedHood;