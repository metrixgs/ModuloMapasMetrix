import { latLng } from "leaflet";

import type { LayerInfoItem } from "@/types/Stores";
import { getTheme } from "@/utils/themeUtils";
import { themeOptions } from "@/config.theme";

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
    type: "layer"
  },
  osm: {
    id: "metrix-osm",
    active: false,
    name: "Open Street Maps",
    temp: false,
    type: "layer"
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
