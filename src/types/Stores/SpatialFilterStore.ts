import type { FeatureCollection, Feature } from "geojson";
import type { Country } from "@/types/Filters/Country";
import type { State } from "@/types/Filters/State";
import type { Municipality } from "@/types/Filters/Municipality";
import type { Delegation } from "@/types/Filters/Delegation";
import type { Zip } from "@/types/Filters/Zip";
import type { Hood } from "@/types/Filters/Hood";
import type { Square } from "@/types/Filters/Square";
import type { Property } from "@/types/Filters/Property";

export interface SpatialFilterStore {
  targetId?: string;
  country?: Country["code"];
  state?: State["code"];
  municipality?: Municipality["code"];
  delegation?: Delegation["code"];
  zip?: Zip["code"];
  hood?: Hood["code"];
  square?: Square["code"];
  property?: Property["code"];
  setTargetId: (id: string) => void;
  setCountry: (
    country?: Country["code"],
    name?: Country["name"],
    countryGeoJSON?: Feature
  ) => Promise<boolean>;
  setState: (
    state?: State["code"],
    name?: State["name"],
    stateGeoJSON?: Feature
  ) => Promise<boolean>;
  setMunicipality: (
    municipality?: Municipality["code"],
    name?: Municipality["name"],
    municipalityGeoJSON?: Feature
  ) => Promise<boolean>;
  setHood: (
    hood?: Hood["code"],
    name?: Hood["name"],
    hoodGeoJSON?: Feature
  ) => Promise<boolean>;
  setSquare: (
    square?: Square["code"],
    name?: string,
    squareGeoJSON?: Feature
  ) => Promise<boolean>;
  setProperty: (
    property?: Property["code"],
    name?: string,
    propertyGeoJSON?: Feature
  ) => Promise<boolean>;
  clear: () => void;
}