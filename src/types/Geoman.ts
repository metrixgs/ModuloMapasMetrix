import type { PM, Layer } from "leaflet";

export interface GeomanCreateEvent {
  shape: PM.SUPPORTED_SHAPES;
  layer: Layer;
}