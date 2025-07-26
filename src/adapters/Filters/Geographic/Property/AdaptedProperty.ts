import type { FeatureAPI } from "@/types/API";
import type { Property, PropertyAPIProperties } from "@/types/Filters/Property";

import { API_GEO_REFERENCE } from "@/config.api.geo";

const AdaptedProperty = (property: FeatureAPI<PropertyAPIProperties>): Property => {
  const map = API_GEO_REFERENCE.property.fields;

  const parsed: Property = {
    id: property.properties[map.id],
    code: property.properties[map.code],
  }

  return parsed;
}

export default AdaptedProperty;