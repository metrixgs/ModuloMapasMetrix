import { latLng } from "leaflet";

import type {
  LayerItem,
  LayerGroup
} from "@/types/Stores/LayersManager";

import { INCIDENT_LAYER } from "./types/Incident";

import { getTheme } from "@/utils/themeUtils";
import { themeOptions } from "@/config.theme";


export const MIN_ZOOM = 1;
export const MAX_ZOOM = 20;

export const INITIAL_VIEW = {
  center: latLng(19.4326, -99.1332),
  zoom: 11,
};

export const LAYERS: { [key: string]: LayerItem } = {
  incidents: {
    id: INCIDENT_LAYER.id,
    active: true,
    name: INCIDENT_LAYER.name,
    temp: false,
    format: "geojson",
    type: "layer",
    columns: Object.keys(INCIDENT_LAYER.fields).map((field) => ({
      accessorKey: field,
      header: INCIDENT_LAYER.fields[field as keyof typeof INCIDENT_LAYER.fields]
    }))
  },
  osm: {
    id: "metrix-osm",
    active: false,
    name: "Open Street Maps",
    temp: false,
    format: "tile",
    type: "layer"
  },
  positron: {
    id: "metrix-cartodb-positron",
    active: getTheme() === themeOptions.light, // For light theme
    name: "CartoDB Positron",
    temp: false,
    format: "tile",
    type: "layer"
  },
  jawg: {
    id: "metrix-jawgmaps",
    active: getTheme() === themeOptions.dark, // For dark theme
    name: "Jawg Maps",
    temp: false,
    format: "tile",
    type: "layer"
  }
}

export const GROUPS: LayerGroup = {
  "metrix-main-group": {
    id: "metrix-main-group",
    name: "Capas Principales",
    active: true,
    layers: [
      LAYERS["incidents"].id
    ]
  },
  "metrix-basemaps": {
    id: "metrix-basemaps",
    name: "Mapas base",
    active: true,
    layers: [
      LAYERS["osm"].id,
      LAYERS["positron"].id,
      LAYERS["jawg"].id
    ]
  },
  "metrix-filters": {
    id: "metrix-filters",
    name: "Filtros",
    active: true,
    layers: []
  }
  // "metrix-basemaps2": {
  //   id: "metrix-basemaps2",
  //   name: "Mapas base 2",
  //   active: true,
  //   layers: [
  //     LAYERS["osm"].id,
  //     LAYERS["positron"].id,
  //     LAYERS["jawg"].id
  //   ]
  // },
  // "metrix-basemaps3": {
  //   id: "metrix-basemaps3",
  //   name: "Mapas base 3",
  //   active: true,
  //   layers: [
  //     LAYERS["osm"].id,
  //     LAYERS["positron"].id,
  //     LAYERS["jawg"].id
  //   ]
  // },
  // "metrix-basemaps4": {
  //   id: "metrix-basemaps4",
  //   name: "Mapas base 4",
  //   active: true,
  //   layers: [
  //     LAYERS["osm"].id,
  //     LAYERS["positron"].id,
  //     LAYERS["jawg"].id
  //   ]
  // },
  // "metrix-basemaps5": {
  //   id: "metrix-basemaps5",
  //   name: "Mapas base 5",
  //   active: true,
  //   layers: [
  //     LAYERS["osm"].id,
  //     LAYERS["positron"].id,
  //     LAYERS["jawg"].id
  //   ]
  // },
  // "metrix-basemaps6": {
  //   id: "metrix-basemaps6",
  //   name: "Mapas base 6",
  //   active: true,
  //   layers: [
  //     LAYERS["osm"].id,
  //     LAYERS["positron"].id,
  //     LAYERS["jawg"].id
  //   ]
  // },
  // "metrix-basemaps7": {
  //   id: "metrix-basemaps7",
  //   name: "Mapas base 7",
  //   active: true,
  //   layers: [
  //     LAYERS["osm"].id,
  //     LAYERS["positron"].id,
  //     LAYERS["jawg"].id
  //   ]
  // }
}