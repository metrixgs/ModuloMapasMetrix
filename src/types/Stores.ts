import type { Map, Layer, LocationEvent } from "leaflet";
import type { FeatureCollection } from "geojson";
import type { ReactNode } from "react";
import type { DynamicStringEnumKeysOf } from "flowbite-react/types";
import type { ModalSizes } from "flowbite-react";

export interface MapStore {
  map: Map | undefined;
  mapInit: boolean;
  setMap: (map: Map) => void;
}

export interface MapStateStore {
  zoom?: number;
  centerLat?: number;
  centerLng?: number;
  setMapState: (zoom: number, centerLat: number, centerLng: number) => void;
}

export interface MouseStore {
  mouseLat?: number;
  mouseLng?: number;
  setMouseState: (mouseLat: number, mouseLng: number) => void;
}

export interface SidebarStore {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  icon: ReactNode;
  open: () => void;
  close: () => void;
  setTitle: (content: string) => void;
  setChildren: (content: ReactNode) => void;
  setIcon: (content: ReactNode) => void;
}

export interface ModalStore {
  isOpen: boolean;
  size: DynamicStringEnumKeysOf<ModalSizes>;
  title: string;
  children: ReactNode;
  open: () => void;
  close: () => void;
  setSize: (size: DynamicStringEnumKeysOf<ModalSizes>) => void;
  setTitle: (content: string) => void;
  setChildren: (content: ReactNode) => void;
}

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
  setCountry: (country?: number, countryLayer?: FeatureCollection) => void;
  setState: (state?: number, stateLayer?: FeatureCollection) => void;
  setMunicipality: (
    municipality?: number,
    municipalityLayer?: FeatureCollection
  ) => void;
  setDelegation: (
    delegation?: number,
    delegationLayer?: FeatureCollection
  ) => void;
  setZip: (zip?: number, zipLayer?: FeatureCollection) => void;
  setHood: (hood?: number, hoodLayer?: FeatureCollection) => void;
  setSquare: (square?: number, squareLayer?: FeatureCollection) => void;
  setProperty: (property?: string, propertyLayer?: FeatureCollection) => void;
  clear: () => void;
}

export interface UserLocationStore {
  location?: LocationEvent;
  loading?: boolean;
  accuracyLayer?: Layer;
  centerLayer?: Layer;
  setLocation: (e: LocationEvent) => void;
  startSearch: () => void;
  endSearch: () => void;
  clearLocation: () => void;
}

export interface StreetViewStore {
  isStreetViewActive: boolean;
  activeStreetView: () => void;
  deactiveStreetView: () => void;
}
