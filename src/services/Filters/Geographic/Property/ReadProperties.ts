import axios from "axios";
import { stringify } from "qs";

import type { FeatureCollectionAPI } from "@/types/API";
import type { Property, PropertyAPIProperties } from "@/types/Filters/Property";

import { API_GEO, API_GEO_REFERENCE } from "@/config.api.geo";

import AdaptedProperties from "@/adapters/Filters/Geographic/Property/AdaptedProperties";

const ReadProperties = async (
  filter?: string
): Promise<Property[] | null> => {
  const reference = API_GEO_REFERENCE.property;
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
    const parsed = AdaptedProperties(
      response.data as FeatureCollectionAPI<PropertyAPIProperties>
    )
    return parsed;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default ReadProperties;