import type { ColumnDef } from "@tanstack/react-table";

import type { FeatureCollection } from "geojson";

import L, {
  type Layer,
  type GeoJSON,
  type TileLayer,
  type PathOptions,
} from "leaflet";

export type Geometry = "Point" | "Polygon" | "LineString";

export interface LayerGroupItem {
  id: string;
  name: string;
  active: boolean;
  layers?: (keyof Layers)[];
  disabled: boolean;
  type: "checkbox" | "radio";
  icon?: string;
}

export interface LayerGroup {
  [id: string]: LayerGroupItem;
}

export const SymbologyType = {
  SIMPLE: "simple",
  CATEGORIZED: "categorized",
} as const;

export type SymbologyType = (typeof SymbologyType)[keyof typeof SymbologyType];

export type CategorizedSymbologyClass = {
  fieldValue: any;
  options: PathOptions;
  quantity?: number;
};

export interface CategorizedSymbology {
  type: typeof SymbologyType.CATEGORIZED;
  symbology: {
    fieldName?: string;
    classes?: CategorizedSymbologyClass[];
  };
}

export interface SimpleSymbology {
  type: typeof SymbologyType.SIMPLE;
  symbology: PathOptions;
}

export type Symbology = SimpleSymbology | CategorizedSymbology;

export interface SymbologyControllerProps {
  initialSymbology?: Symbology;
  onSymbologyChange?: (newSymbology: Symbology) => void;
  data?: Record<string, unknown>[];
  layerGeometry: Geometry;
}

export interface GeneratedLayerSource {
  sourceType: "generated";
  geojson?: FeatureCollection;
}

export interface GeoserverLayerSource {
  sourceType: "geoserver";
  serverUrl: string;
  workpace: string;
  name: string;
}

export interface TileLayerSource {
  sourceType: "tile";
  endpoint: string;
}

export interface APILayerSource {
  sourceType: "api";
  endpoint: string;
  geom?: string;
  latitude?: string;
  longitude?: string;
}

export interface BaseLayerItem {
  id: string;
  name: string;
  active: boolean;
  temp: boolean;
  renamed: boolean;
  groupId?: string;
  groupName?: string;
  thumbnail?: string;
  description?: string;
  source:
    | GeneratedLayerSource
    | GeoserverLayerSource
    | TileLayerSource
    | APILayerSource;
}

export interface GridLayerItem extends BaseLayerItem {
  format: "geojson-grid";
  type: "layer" | "filtered";
  geometry: Geometry;
  layer?: L.VectorGrid.Slicer;
  columns?: ColumnDef<any>[];
}

export interface GeoJSONLayerItem extends BaseLayerItem {
  format: "geojson";
  type: "layer" | "filtered";
  geometry: Geometry;
  layer?: GeoJSON;
  columns?: ColumnDef<any>[];
  symbology?: Symbology;
}

export interface TileLayerItem extends BaseLayerItem {
  format: "tile";
  type: "layer";
  layer?: TileLayer;
}

export type LayerItem = GeoJSONLayerItem | GridLayerItem | TileLayerItem;

export interface LayerList {
  [id: string]: Layer;
}

export interface Layers {
  [id: string]: LayerItem;
}

export interface BaseFilter {
  id: string;
  name: string;
  target: string; // keyof LayerList;
}

export interface IntersectionFilter extends BaseFilter {
  type: "intersection";
  origin: GeoJSON;
}

export interface DivideFeaturesFilter extends BaseFilter {
  type: "divideFeatures";
  selectedProps: string[];
}

export interface TodoFilter extends BaseFilter {
  type: "TODO";
}

export type LayerFilterItem = IntersectionFilter | DivideFeaturesFilter;

export interface LayerFilter {
  [id: string]: LayerFilterItem;
}

export type LoadLayerFunction = () => Promise<LayerItem["layer"]>;

export interface MapLayersStore {
  groups: LayerGroup;
  layers: Layers;
  layerFilter: LayerFilter;
  layersAsArray: () => LayerItem[];
  append: (
    info: LayerItem,
    loadLayerFunction: LoadLayerFunction
  ) => Promise<boolean>;
  appendFilter: (properties: LayerFilterItem) => Promise<boolean>;
  removeLayer: (id: keyof Layers) => void;
  toggleLayer: (layerId: keyof Layers) => void;
  turnOffLayer: (id: keyof Layers) => void;
  turnOnLayer: (id: keyof Layers) => void;
  focusLayer: (id: keyof Layers) => void;
  renameLayer: (id: keyof Layers, newName: string) => void;
  setLayerSymbology: (id: keyof Layers, symbology: Symbology) => void;
  toggleGroup: (id: keyof LayerGroup) => void;
  assignLayerToGroup: (
    layerId: keyof Layers,
    groupId: keyof LayerGroup
  ) => void;
  createGroup: (group: LayerGroupItem) => Promise<boolean>;
  deleteGroup: (groudId: keyof LayerGroup) => void;
}
