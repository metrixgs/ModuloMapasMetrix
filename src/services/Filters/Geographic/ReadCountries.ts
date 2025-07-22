import axios from "axios";

import type { PluralResponseAPI, CountryAPI } from "@/types/API";
import { API_GEO, API_GEO_REFERENCE } from "@/config.api";

import AdaptedCountries from "@/adapters/Filters/Geographic/AdaptedCountries";

const ReadCountries = async ( ) => {
  const url = new URL(API_GEO.concat(API_GEO_REFERENCE.country.endpoint));

  try {
    const response = await axios.get(url.toString());
    const parsed = AdaptedCountries(
      response.data as PluralResponseAPI<CountryAPI>
    )
    return parsed;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default ReadCountries;