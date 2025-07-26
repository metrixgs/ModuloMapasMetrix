import axios from "axios";
import { stringify } from "qs";

import type { FeatureAPI } from "@/types/API";
import type { Country, CountryAPIProperties } from "@/types/Filters/Country";

import { API_GEO, API_GEO_REFERENCE } from "@/config.api.geo";

const ReadCountry = async (
  id: Country["id"]
): Promise<FeatureAPI<CountryAPIProperties> | null> => {
  const reference = API_GEO_REFERENCE.country;

  const url = new URL(API_GEO.concat(reference.endpointId, `/${id}`));

  const params = {
    [reference.params.geom]: true,
  }

  url.search = stringify(params, { encode: false });

  try {
    const response = await axios.get(url.toString());
    return response.data as FeatureAPI<CountryAPIProperties>;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default ReadCountry;