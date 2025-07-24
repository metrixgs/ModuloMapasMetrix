import type { Map, Layer, LocationEvent } from "leaflet";
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

export interface BottomDrawer extends SidebarStore {
  isHeaderEnabled: boolean;
  disableHeader: () => void;
  enableHeader: () => void;
  isFullscreen: boolean;
  enableFullscreen: () => void;
  disableFullscreen: () => void;
  toggleFullscreen: () => void;
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
