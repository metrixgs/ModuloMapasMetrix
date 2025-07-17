import { latLng } from "leaflet";

import type {
  LayerInfoItem,
  LayerInfoGroup
} from "@/types/Stores/LayersManager";

import { getTheme } from "@/utils/themeUtils";
import { themeOptions } from "@/config.theme";

export const MIN_ZOOM = 1;
export const MAX_ZOOM = 20;

export const INITIAL_VIEW = {
  center: latLng(19.4326, -99.1332),
  zoom: 11,
};

export const LAYERS: { [key: string]: LayerInfoItem } = {
  incidents: {
    id: "metrix-incidents",
    active: true,
    name: "Incidentes",
    temp: false,
    type: "layer",
  },
  osm: {
    id: "metrix-osm",
    active: false,
    name: "Open Street Maps",
    temp: false,
    type: "layer",
  },
  positron: {
    id: "metrix-cartodb-positron",
    active: getTheme() === themeOptions.light, // For light theme
    name: "CartoDB Positron",
    temp: false,
    type: "layer"
  },
  jawg: {
    id: "metrix-jawgmaps",
    active: getTheme() === themeOptions.dark, // For dark theme
    name: "Jawg Maps",
    temp: false,
    type: "layer"
  }
}

export const GROUPS: LayerInfoGroup = {
  "metrix-main-group": {
    id: "metrix-main-group",
    name: "Capas Principales",
    active: true,
    layers: [
      LAYERS["incidents"].id
    ]
  },
  "metrix-basemap": {
    id: "metrix-basemaps",
    name: "Mapas base",
    active: true,
    layers: [
      LAYERS["osm"].id,
      LAYERS["positron"].id,
      LAYERS["jawg"].id
    ]
  }
}