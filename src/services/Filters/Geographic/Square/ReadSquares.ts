import axios from "axios";
import { stringify } from "qs";

import type { FeatureCollectionAPI } from "@/types/API";
import type { Square, SquareAPIProperties } from "@/types/Filters/Square";

import { API_GEO, API_GEO_REFERENCE } from "@/config.api.geo";

import AdaptedSquares from "@/adapters/Filters/Geographic/Square/AdaptedSquares";

const ReadSquares = async (
  filter?: string
): Promise<Square[] | null> => {
  const reference = API_GEO_REFERENCE.square;
  const url = new URL(API_GEO.concat(reference.endpoint));

  const params = {
    [reference.params.geom]: false,
    [reference.params.sort]: reference.fields.code,
    [reference.params.order]: "asc",
    ...(
      filter && {
        [reference.params.filter]: filter
      }
    )
  }

  url.search = stringify(params, { encode: false });

  try {
    const response = await axios.get(url.toString());
    const parsed = AdaptedSquares(
      response.data as FeatureCollectionAPI<SquareAPIProperties>
    )
    return parsed;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default ReadSquares;