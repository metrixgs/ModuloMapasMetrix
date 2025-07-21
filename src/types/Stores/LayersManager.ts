import type { Layer, GeoJSON } from "leaflet";

export interface LayerGroupItem {
  id: string;
  name: string;
  active: boolean;
  layers: (keyof Layers)[];
}

export interface LayerGroup {
  [id: string]: LayerGroupItem;
}

export interface LayerItem {
  id: string;
  name: string;
  active: boolean;
  layer?: Layer;
  format: "geojson" | "tile";
  type: "layer" | "filtered";
  temp: boolean;
}

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

export interface TodoFilter extends BaseFilter {
  type: "TODO";
}

export type LayerFilterItem = IntersectionFilter | TodoFilter;

export interface LayerFilter {
  [id: string]: LayerFilterItem;
}

export type LoadLayerFunction = () => Promise<Layer>;

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
  toggleLayer: (id: keyof Layers) => void;
  turnOffLayer: (id: keyof Layers) => void;
  turnOnLayer: (id: keyof Layers) => void;
  toggleGroup: (id: keyof LayerGroup) => void;
  assignLayerToGroup: (
    layerId: keyof Layers,
    groupId: keyof LayerGroup
  ) => void;
}
