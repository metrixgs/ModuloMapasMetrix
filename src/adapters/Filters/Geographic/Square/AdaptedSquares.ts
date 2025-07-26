import type { FeatureCollectionAPI } from "@/types/API";
import type { Square, SquareAPIProperties } from "@/types/Filters/Square";

import AdaptedSquare from "./AdaptedSquare";

const AdaptedSquares = (
  square: FeatureCollectionAPI<SquareAPIProperties>
): Square[] => {
  const parsed = square.features.map((item) => AdaptedSquare(item));
  return parsed;
};

export default AdaptedSquares;