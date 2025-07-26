import axios from "axios";
import { stringify } from "qs";

import type { FeatureAPI } from "@/types/API";
import type { Municipality, MunicipalityAPIProperties } from "@/types/Filters/Municipality";

import { API_GEO, API_GEO_REFERENCE } from "@/config.api.geo";

const ReadMunicipality = async (
  id: Municipality["id"]
): Promise<FeatureAPI<MunicipalityAPIProperties> | null> => {
  const reference = API_GEO_REFERENCE.municipality;

  const url = new URL(API_GEO.concat(reference.endpointId, `/${id}`));

  const params = {
    [reference.params.geom]: true,
  }

  url.search = stringify(params, { encode: false });

  try {
    const response = await axios.get(url.toString());
    return response.data as FeatureAPI<MunicipalityAPIProperties>;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default ReadMunicipality;