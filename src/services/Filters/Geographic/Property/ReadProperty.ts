import axios from "axios";
import { stringify } from "qs";

import type { FeatureAPI } from "@/types/API";
import type { Property, PropertyAPIProperties } from "@/types/Filters/Property";

import { API_GEO, API_GEO_REFERENCE } from "@/config.api.geo";

const ReadProperty = async (
  id: Property["id"]
): Promise<FeatureAPI<PropertyAPIProperties> | null> => {
  const reference = API_GEO_REFERENCE.property;

  const url = new URL(API_GEO.concat(reference.endpointId, `/${id}`));

  const params = {
    [reference.params.geom]: true,
  }

  url.search = stringify(params, { encode: false });

  try {
    const response = await axios.get(url.toString());
    return response.data as FeatureAPI<PropertyAPIProperties>;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default ReadProperty;