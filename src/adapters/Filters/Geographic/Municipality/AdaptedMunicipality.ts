import type { FeatureAPI } from "@/types/API";
import type { MunicipalityAPIProperties, Municipality } from "@/types/Filters/Municipality";

import { API_GEO_REFERENCE } from "@/config.api.geo";

const AdaptedMunicipality = (municipality: FeatureAPI<MunicipalityAPIProperties>): Municipality => {
  const map = API_GEO_REFERENCE.municipality.fields;

  const parsed: Municipality = {
    id: municipality.properties[map.id],
    code: municipality.properties[map.code],
    name: municipality.properties[map.name]
  }

  return parsed;
}

export default AdaptedMunicipality;