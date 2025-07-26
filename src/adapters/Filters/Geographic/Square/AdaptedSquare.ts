import type { FeatureAPI } from "@/types/API";
import type { Square, SquareAPIProperties } from "@/types/Filters/Square";

import { API_GEO_REFERENCE } from "@/config.api.geo";

const AdaptedSquare = (squares: FeatureAPI<SquareAPIProperties>): Square => {
  const map = API_GEO_REFERENCE.square.fields;

  const parsed: Square = {
    id: squares.properties[map.id],
    code: squares.properties[map.code],
  }

  return parsed;
}

export default AdaptedSquare;