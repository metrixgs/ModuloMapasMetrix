import axios from "axios";
import { stringify } from "qs";

import type { FeatureAPI } from "@/types/API";
import type { State, StateAPIProperties } from "@/types/Filters/State";

import { API_GEO, API_GEO_REFERENCE } from "@/config.api.geo";

const ReadState = async (
  id: State["id"]
): Promise<FeatureAPI<StateAPIProperties> | null> => {
  const reference = API_GEO_REFERENCE.state;

  const url = new URL(API_GEO.concat(reference.endpointId, `/${id}`));

  const params = {
    [reference.params.geom]: true,
  }

  url.search = stringify(params, { encode: false });

  try {
    const response = await axios.get(url.toString());
    return response.data as FeatureAPI<StateAPIProperties>;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default ReadState;