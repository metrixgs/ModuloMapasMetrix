export interface PluralResponseAPI<T> {
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
