import type { CountryAPI } from "@/types/API";
import type { Country } from "@/types/Country";


const AdaptedCountry = (country: CountryAPI): Country => {
  const parsed: Country = {
    id: country.id,
    name: country.nom_pais
  }

  return parsed;
}

export default AdaptedCountry;