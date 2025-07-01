import type { Map, Layer } from "leaflet";
import type { ReactNode } from "react";

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

export interface LayerInfoItem {
  id: string;
  name: string;
  active: boolean;
}

export interface LayerList {
  [id: string]: Layer;
}

export interface LayerInfo {
  [id: string]: LayerInfoItem
}

export interface MapLayersStore {
  layerList: LayerList;
  layerInfo: LayerInfo;
  append: (layer: Layer, info: LayerInfoItem) => void;
  toggleLayer: (id: keyof LayerInfo) => void;
  turnOffLayer: (id: keyof LayerInfo) => void;
  turnOnLayer: (id: keyof LayerInfo) => void;
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
  title: string;
  children: ReactNode;
  open: () => void;
  close: () => void;
  setTitle: (content: string) => void;
  setChildren: (content: ReactNode) => void;
}