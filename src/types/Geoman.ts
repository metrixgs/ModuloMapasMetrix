import type { Layer, PM } from "leaflet";

export interface GeomanCreateEvent {
  shape: PM.SUPPORTED_SHAPES;
  layer: Layer;
}