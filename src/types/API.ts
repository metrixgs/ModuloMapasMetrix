export interface PluralResponseAPI<T = unknown> {
  status: number;
  error: boolean;
  data: T[];
}

export interface FeatureAPI<T> {
  type: "Feature";
  geometry?: string;
  properties: T;
}

export interface FeatureCollectionAPI<T> {
  type: "FeatureCollection";
  features: FeatureAPI<T>[];
}
