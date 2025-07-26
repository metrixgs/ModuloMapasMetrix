import type { FeatureCollectionAPI } from "@/types/API";
import type { Hood, HoodAPIProperties } from "@/types/Filters/Hood";

import AdaptedHood from "./AdaptedHood";

const AdaptedHoods = (
  hoods: FeatureCollectionAPI<HoodAPIProperties>
): Hood[] => {
  const parsed = hoods.features.map((item) => AdaptedHood(item));
  return parsed;
};

export default AdaptedHoods;