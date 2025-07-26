import type { FeatureCollectionAPI } from "@/types/API";
import type { Zip, ZipAPIProperties } from "@/types/Filters/Zip";

import AdaptedZip from "./AdaptedZip";

const AdaptedZips = (
  zips: FeatureCollectionAPI<ZipAPIProperties>
): Zip[] => {
  const parsed = zips.features.map((item) => AdaptedZip(item));
  return parsed;
};

export default AdaptedZips;