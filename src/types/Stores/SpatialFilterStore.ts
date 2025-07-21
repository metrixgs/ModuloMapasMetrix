import type { Layer } from "leaflet";
import type { FeatureCollection } from "geojson";

export interface SpatialFilterStore {
  country?: number;
  countryLayer?: Layer;
  state?: number;
  stateLayer?: Layer;
  municipality?: number;
  municipalityLayer?: Layer;
  delegation?: number;
  delegationLayer?: Layer;
  zip?: number;
  zipLayer?: Layer;
  hood?: number;
  hoodLayer?: Layer;
  square?: number;
  squareLayer?: Layer;
  property?: string;
  propertyLayer?: Layer;
  setCountry: (country?: number, name?: string, countryGeoJSON?: FeatureCollection) => void;
  setState: (state?: number, name?: string, stateGeoJSON?: FeatureCollection) => void;
  setMunicipality: (
    municipality?: number,
    name?: string,
    municipalityGeoJSON?: FeatureCollection
  ) => void;
  setDelegation: (
    delegation?: number,
    name?: string,
    delegationGeoJSON?: FeatureCollection
  ) => void;
  setZip: (zip?: number, name?: string, zipGeoJSON?: FeatureCollection) => void;
  setHood: (hood?: number, name?: string, hoodGeoJSON?: FeatureCollection) => void;
  setSquare: (square?: number, name?: string, squareGeoJSON?: FeatureCollection) => void;
  setProperty: (property?: string, name?: string, propertyGeoJSON?: FeatureCollection) => void;
  clear: () => void;
}