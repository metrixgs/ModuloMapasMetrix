import type { FeatureAPI } from "@/types/API";
import type { Country, CountryAPIProperties } from "@/types/Filters/Country";

import { API_GEO_REFERENCE } from "@/config.api.geo";

const AdaptedCountry = (country: FeatureAPI<CountryAPIProperties>): Country => {
  const map = API_GEO_REFERENCE.country.fields;

  const parsed: Country = {
    id: country.properties[map.id],
    code: country.properties[map.code],
    name: country.properties[map.name]
  }

  return parsed;
}

export default AdaptedCountry;