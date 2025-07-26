import type { FeatureAPI } from "@/types/API";
import type { Zip, ZipAPIProperties } from "@/types/Filters/Zip";

import { API_GEO_REFERENCE } from "@/config.api.geo";

const AdaptedZip = (zip: FeatureAPI<ZipAPIProperties>): Zip => {
  const map = API_GEO_REFERENCE.zip.fields;

  const parsed: Zip = {
    id: zip.properties[map.id],
    code: zip.properties[map.code],
  }

  return parsed;
}

export default AdaptedZip;