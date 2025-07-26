import axios from "axios";
import { stringify } from "qs";

import type { FeatureCollectionAPI } from "@/types/API";
import type { State, StateAPIProperties } from "@/types/Filters/State";

import { API_GEO, API_GEO_REFERENCE } from "@/config.api.geo";

import AdaptedStates from "@/adapters/Filters/Geographic/State/AdaptedStates";

const ReadStates = async (
  filter?: string
): Promise<State[] | null> => {
  const reference = API_GEO_REFERENCE.state;
  const url = new URL(API_GEO.concat(reference.endpoint));

  const params = {
    [reference.params.geom]: false,
    [reference.params.sort]: reference.fields.name,
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
    const parsed = AdaptedStates(
      response.data as FeatureCollectionAPI<StateAPIProperties>
    )
    return parsed;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default ReadStates;