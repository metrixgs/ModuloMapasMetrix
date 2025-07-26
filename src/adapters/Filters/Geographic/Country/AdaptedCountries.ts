import type { FeatureCollectionAPI } from "@/types/API";
import type { Country, CountryAPIProperties } from "@/types/Filters/Country";

import AdaptedCountry from "./AdaptedCountry";

const AdaptedCountries = (
  countries: FeatureCollectionAPI<CountryAPIProperties>
): Country[] => {
  const parsed = countries.features.map((item) => AdaptedCountry(item));
  return parsed;
};

export default AdaptedCountries;