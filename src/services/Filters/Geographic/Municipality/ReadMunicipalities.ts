import axios from "axios";
import { stringify } from "qs";

import type { FeatureCollectionAPI } from "@/types/API";
import type { Municipality, MunicipalityAPIProperties } from "@/types/Filters/Municipality";

import { API_GEO, API_GEO_REFERENCE } from "@/config.api.geo";

import AdaptedMunicipalities from "@/adapters/Filters/Geographic/Municipality/AdaptedMunicipalities";

const ReadMunicipalities = async (
  filter?: string
): Promise<Municipality[] | null> => {
  const reference = API_GEO_REFERENCE.municipality;
  const url = new URL(API_GEO.concat(reference.endpoint));

  const params = {
    [reference.params.geom]: false,
    [reference.params.sort]: reference.fields.name,
    [reference.params.order]: "asc",
    ...(
      filter && {
        [reference.params.filter]: filter
      }
    )
  }

  url.search = stringify(params, { encode: false });

  try {
    const response = await axios.get(url.toString());
    const parsed = AdaptedMunicipalities(
      response.data as FeatureCollectionAPI<MunicipalityAPIProperties>
    )
    return parsed;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default ReadMunicipalities;