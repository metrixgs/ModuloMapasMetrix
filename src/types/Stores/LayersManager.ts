import type { ColumnDef } from "@tanstack/react-table";

import type { Layer, GeoJSON, TileLayer } from "leaflet";

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

export interface GeneratedLayerSource {
  sourceType: "generated";
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
}

export interface BaseLayerItem {
  id: string;
  name: string;
  active: boolean;
  temp: boolean;
  renamed: boolean;
  groupId?: string;
  groupName?: string;
  source:
    | GeneratedLayerSource
    | GeoserverLayerSource
    | TileLayerSource
    | APILayerSource;
}

export interface GeoJSONLayerItem extends BaseLayerItem {
  format: "geojson";
  type: "layer" | "filtered";
  geometry: "Point" | "Polygon" | "LineString";
  layer?: GeoJSON;
  columns?: ColumnDef<any>[];
}

export interface TileLayerItem extends BaseLayerItem {
  format: "tile";
  type: "layer";
  layer?: TileLayer;
}

export type LayerItem = GeoJSONLayerItem | TileLayerItem;

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
  toggleGroup: (id: keyof LayerGroup) => void;
  assignLayerToGroup: (
    layerId: keyof Layers,
    groupId: keyof LayerGroup
  ) => void;
  createGroup: (group: LayerGroupItem) => Promise<boolean>;
  deleteGroup: (groudId: keyof LayerGroup) => void;
}
