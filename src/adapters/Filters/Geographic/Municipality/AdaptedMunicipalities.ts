import type { FeatureCollectionAPI } from "@/types/API";
import type { Municipality, MunicipalityAPIProperties } from "@/types/Filters/Municipality";

import AdaptedMunicipality from "./AdaptedMunicipality";

const AdaptedMunicipalities = (
  municipalities: FeatureCollectionAPI<MunicipalityAPIProperties>
): Municipality[] => {
  const parsed = municipalities.features.map((item) => AdaptedMunicipality(item));
  return parsed;
};

export default AdaptedMunicipalities;