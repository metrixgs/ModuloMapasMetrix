import axios from "axios";
import { stringify } from "qs";

import type { FeatureAPI } from "@/types/API";
import type { Square, SquareAPIProperties } from "@/types/Filters/Square";

import { API_GEO, API_GEO_REFERENCE } from "@/config.api.geo";

const ReadSquare = async (
  id: Square["id"]
): Promise<FeatureAPI<SquareAPIProperties> | null> => {
  const reference = API_GEO_REFERENCE.square;

  const url = new URL(API_GEO.concat(reference.endpointId, `/${id}`));

  const params = {
    [reference.params.geom]: true,
  }

  url.search = stringify(params, { encode: false });

  try {
    const response = await axios.get(url.toString());
    return response.data as FeatureAPI<SquareAPIProperties>;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default ReadSquare;