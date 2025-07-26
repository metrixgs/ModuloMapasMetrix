import type { FeatureCollectionAPI } from "@/types/API";
import type { Property, PropertyAPIProperties } from "@/types/Filters/Property";

import AdaptedProperty from "./AdaptedProperty";

const AdaptedProperties = (
  properties: FeatureCollectionAPI<PropertyAPIProperties>
): Property[] => {
  const parsed = properties.features.map((item) => AdaptedProperty(item));
  return parsed;
};

export default AdaptedProperties;