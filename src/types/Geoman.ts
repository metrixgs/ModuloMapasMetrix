import type { PM, Layer, Map } from "leaflet";

export interface GeomanCreateEvent {
  shape: PM.SUPPORTED_SHAPES;
  layer: Layer;
}

export interface GeomanEditEvent {
  enabled: boolean;
  map: Map;
}

export interface GeomanRemoveEvent {
  layer: Layer,
  shape: PM.SUPPORTED_SHAPES
}