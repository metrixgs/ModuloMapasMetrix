import { GeoJSON, PM } from "leaflet";

export type Modes = "measure" | "create" | "pending";

export interface DrawFeature {
  id: string;
  layer: GeoJSON;
  name: string;
  shape: PM.SUPPORTED_SHAPES;
}

export interface DrawStore {
  features?: DrawFeature[];
  mode?: Modes;
  isEditModeActive?: boolean;
  isRemovalModeActive?: boolean;
  shape?: PM.SUPPORTED_SHAPES;
  changeMode: (mode: Modes) => void;
  changeShape: (shape: PM.SUPPORTED_SHAPES) => void;
  addFeature: (feature: DrawFeature) => void;
  removeFeature: (layer: string) => void;
  replaceFeatures: (layers: DrawFeature[]) => void;
  clearStore: () => void;
  activeEditMode: () => void;
  deactiveEditMode: () => void;
  activeRemovalMode: () => void;
  deactiveRemovalMode: () => void;
}