import { latLng } from "leaflet";

import type { LayerItem, LayerGroupItem } from "@/types/Stores/LayersManager";

import { getTheme } from "@/utils/themeUtils";
import { themeOptions } from "@/config.theme";

export const MIN_ZOOM = 1;
export const MAX_ZOOM = 20;

export const INITIAL_VIEW = {
  center: latLng(19.4326, -99.1332),
  zoom: 11,
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
