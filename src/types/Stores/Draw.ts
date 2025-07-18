import { GeoJSON, PM } from "leaflet";

export type Modes = "measure" | "create" | "pending";

export interface DrawStore {
  features?: GeoJSON[];
  mode?: Modes;
  isEditModeActive?: boolean;
  isRemovalModeActive?: boolean;
  shape?: PM.SUPPORTED_SHAPES;
  changeMode: (mode: Modes) => void;
  changeShape: (shape: PM.SUPPORTED_SHAPES) => void;
  addFeature: (layer: GeoJSON) => void;
  removeFeature: (layer: GeoJSON) => void;
  replaceFeatures: (layers: GeoJSON[]) => void;
  clearStore: () => void;
  activeEditMode: () => void;
  deactiveEditMode: () => void;
  activeRemovalMode: () => void;
  deactiveRemovalMode: () => void;
}