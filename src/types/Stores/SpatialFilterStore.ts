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
  ) => void;
  setState: (
    state?: State["code"],
    name?: State["name"],
    stateGeoJSON?: Feature
  ) => void;
  setMunicipality: (
    municipality?: Municipality["code"],
    name?: Municipality["name"],
    municipalityGeoJSON?: Feature
  ) => void;
  setDelegation: (
    delegation?: Delegation["code"],
    name?: Delegation["name"],
    delegationGeoJSON?: Feature
  ) => void;
  setZip: (
    zip?: Zip["code"],
    name?: string,
    zipGeoJSON?: Feature
  ) => void;
  setHood: (
    hood?: Hood["code"],
    name?: Hood["name"],
    hoodGeoJSON?: Feature
  ) => void;
  setSquare: (
    square?: Square["code"],
    name?: string,
    squareGeoJSON?: Feature
  ) => void;
  setProperty: (
    property?: Property["code"],
    name?: string,
    propertyGeoJSON?: Feature
  ) => void;
  clear: () => void;
}