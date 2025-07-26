import axios from "axios";
import { stringify } from "qs";

import type { FeatureCollectionAPI } from "@/types/API";
import type { Country, CountryAPIProperties } from "@/types/Filters/Country";

import { API_GEO, API_GEO_REFERENCE } from "@/config.api.geo";

import AdaptedCountries from "@/adapters/Filters/Geographic/Country/AdaptedCountries";

const ReadCountries = async (): Promise<Country[] | null> => {
  const reference = API_GEO_REFERENCE.country;

  const url = new URL(API_GEO.concat(reference.endpoint));

  const params = {
    [reference.params.geom]: false,
  }

  url.search = stringify(params, { encode: false });

  try {
    const response = await axios.get(url.toString());
    const parsed = AdaptedCountries(
      response.data as FeatureCollectionAPI<CountryAPIProperties>
    )
    return parsed;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default ReadCountries;