import type { PluralResponseAPI, CountryAPI } from "@/types/API";
import type { Country } from "@/types/Country";

import AdaptedCountry from "./AdaptedCountry";

const AdaptedCountries = (
  countries: PluralResponseAPI<CountryAPI>
): Country[] => {
  const parsed = countries.data.map((item) => AdaptedCountry(item));
  return parsed;
};

export default AdaptedCountries;