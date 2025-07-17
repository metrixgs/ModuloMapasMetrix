import type { Layer } from "leaflet";

export interface LayerInfoGroupItem {
  id: string;
  name: string;
  active: boolean;
  layers: (keyof LayerInfo)[];
}

export interface LayerInfoGroup {
  [id: string]: LayerInfoGroupItem;
}

export interface LayerInfoItem {
  id: string;
  name: string;
  active: boolean;
  type: "layer" | "filtered";
  temp: boolean;
}

export interface LayerList {
  [id: string]: Layer;
}

export interface LayerInfo {
  [id: string]: LayerInfoItem;
}

export interface BaseFilter {
  id: string;
  name: string;
  target: keyof LayerList;
}

export interface IntersectionFilter extends BaseFilter {
  type: "intersection";
  origin: Layer;
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
  groups: LayerInfoGroup;
  layerList: LayerList;
  layerInfo: LayerInfo;
  append: (
    info: LayerInfoItem,
    loadLayerFunction: LoadLayerFunction
  ) => Promise<boolean>;
  toggleLayer: (id: keyof LayerInfo) => void;
  turnOffLayer: (id: keyof LayerInfo) => void;
  turnOnLayer: (id: keyof LayerInfo) => void;
  toggleGroup: (id: keyof LayerInfoGroup) => void;
}