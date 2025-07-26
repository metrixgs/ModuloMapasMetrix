import axios from "axios";
import { stringify } from "qs";

import type { FeatureCollectionAPI } from "@/types/API";
import type { Hood, HoodAPIProperties } from "@/types/Filters/Hood";

import { API_GEO, API_GEO_REFERENCE } from "@/config.api.geo";

import AdaptedHoods from "@/adapters/Filters/Geographic/Hood/AdaptedHoods";

const ReadHoods = async (
  filter?: string
): Promise<Hood[] | null> => {
  const reference = API_GEO_REFERENCE.hood;
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
    const parsed = AdaptedHoods(
      response.data as FeatureCollectionAPI<HoodAPIProperties>
    )
    return parsed;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default ReadHoods;