import axios from "axios";
import { stringify } from "qs";

import type { FeatureAPI } from "@/types/API";
import type { Hood, HoodAPIProperties } from "@/types/Filters/Hood";

import { API_GEO, API_GEO_REFERENCE } from "@/config.api.geo";

const ReadHood = async (
  id: Hood["id"]
): Promise<FeatureAPI<HoodAPIProperties> | null> => {
  const reference = API_GEO_REFERENCE.hood;

  const url = new URL(API_GEO.concat(reference.endpointId, `/${id}`));

  const params = {
    [reference.params.geom]: true,
  }

  url.search = stringify(params, { encode: false });

  try {
    const response = await axios.get(url.toString());
    return response.data as FeatureAPI<HoodAPIProperties>;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default ReadHood;