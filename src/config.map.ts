import { latLng, type PathOptions, type CircleMarkerOptions } from "leaflet";

import type { LayerItem, LayerGroupItem } from "@/types/Stores/LayersManager";

import { getTheme } from "@/utils/themeUtils";
import { themeOptions } from "@/config.theme";

export const MIN_ZOOM = 1;
export const MAX_ZOOM = 20;

export const INITIAL_VIEW = {
  center: latLng(23.634501, -102.552784),
  zoom: 6,
};

export const FILTER_GROUP: LayerGroupItem = {
  id: "metrix-filters",
  name: "Filtros",
  active: true,
  disabled: false,
  type: "checkbox",
  icon: "bi/BiCategory",
};

export const TEMPORAL_GROUP: LayerGroupItem = {
  id: "metrix-temporal-layers",
  name: "Temporal",
  active: true,
  disabled: false,
  type: "checkbox",
  icon: "bi/BiCategory",
};

export const INITIAL_LAYERS: LayerItem[] = [
  {
    id: "metrix-jawgmaps",
    active: getTheme() === themeOptions.dark, // For dark theme
    name: "Jawg Maps",
    temp: false,
    format: "tile",
    type: "layer",
    renamed: false,
    groupId: "metrix-basemaps",
    groupName: "Mapas base",
    source: {
      sourceType: "tile",
      endpoint:
        "https://tile.jawg.io/6ce62bcb-c195-4d31-a3ce-421b1d40f3bd/{z}/{x}/{y}{r}.png?access-token=xpGCLKVCsTyKo9B2QbcI9mKUWCpJdS4PEpT1rsVCeZoENPdujT3KjjiEe9YLIwCO",
    },
  },
  {
    id: "metrix-cartodb-positron",
    active: getTheme() === themeOptions.light, // For light theme
    name: "CartoDB Positron",
    temp: false,
    format: "tile",
    type: "layer",
    renamed: false,
    groupId: "metrix-basemaps",
    groupName: "Mapas base",
    source: {
      sourceType: "tile",
      endpoint:
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    },
  },
];

export const DefaultPointStyle: CircleMarkerOptions = {
  radius: 6,
  stroke: true,
  weight: 0.5,
  opacity: 1.0,
  color: "#267E26",
  fill: true,
  fillColor: "#267E26",
  fillOpacity: 1,
};

export const DefaultLineStringStyle: PathOptions = {
  stroke: true,
  weight: 2,
  opacity: 1.0,
  color: "#267E26",
}

export const DefaultPolygonStyle: PathOptions = {
  stroke: true,
  weight: 0.5,
  opacity: 1.0,
  color: "#267E26",
  fill: true,
  fillColor: "#267E26",
  fillOpacity: 0.2,
};
