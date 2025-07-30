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
    geometry: "Point",
    columns: Object.keys(INCIDENT_LAYER.fields).map((field) => ({
      accessorKey: field,
      header: INCIDENT_LAYER.fields[field as keyof typeof INCIDENT_LAYER.fields]
    })),
    renamed: false
  },
  osm: {
    id: "metrix-osm",
    active: false,
    name: "Open Street Maps",
    temp: false,
    format: "tile",
    type: "layer",
    renamed: false
  },
  positron: {
    id: "metrix-cartodb-positron",
    active: getTheme() === themeOptions.light, // For light theme
    name: "CartoDB Positron",
    temp: false,
    format: "tile",
    type: "layer",
    renamed: false
  },
  jawg: {
    id: "metrix-jawgmaps",
    active: getTheme() === themeOptions.dark, // For dark theme
    name: "Jawg Maps",
    temp: false,
    format: "tile",
    type: "layer",
    renamed: false
  },
  esri: {
    id: "esri-satellite",
    active: false,
    name: "ESRI Satelite",
    temp: false,
    format: "tile",
    type: "layer",
    renamed: false
  }
}

export const GROUPS: LayerGroup = {
  "metrix-main-group": {
    id: "metrix-main-group",
    name: "Capas Principales",
    active: true,
    layers: [
      LAYERS["incidents"].id
    ],
    disabled: false,
    type: "checkbox"
  },
  "metrix-basemaps": {
    id: "metrix-basemaps",
    name: "Mapas base",
    active: true,
    layers: [
      LAYERS["osm"].id,
      LAYERS["positron"].id,
      LAYERS["jawg"].id,
      LAYERS["esri"].id
    ],
    disabled: false,
    type: "radio"
  },
  "metrix-administrative-cartography": {
    id: "metrix-administrative-cartography",
    name: "Cartografía Administrativa",
    active: true,
    layers: [],
    disabled: false,
    type: "checkbox"
  },
  "metrix-electoral-cartography": {
    id: "metrix-electoral-cartography",
    name: "Cartografía Electoral",
    active: false,
    layers: [],
    disabled: true,
    type: "checkbox"
  },
  "metrix-statistics-demographics": {
    id: "metrix-statistics-demographics",
    name: "Estadística & Demografía",
    active: false,
    layers: [],
    disabled: true,
    type: "checkbox"
  },
  "metrix-road-infrastructure": {
    id: "metrix-road-infrastructure",
    name: "Infraestructura Vial",
    active: false,
    layers: [],
    disabled: true,
    type: "checkbox"
  },
  "metrix-water-infrastructure": {
    id: "metrix-water-infrastructure",
    name: "Infraestructura Hídrica",
    active: true,
    layers: [],
    disabled: false,
    type: "checkbox"
  },
  "metrix-election-days": {
    id: "metrix-election-days",
    name: "Jornadas Electorales",
    active: false,
    layers: [],
    disabled: true,
    type: "checkbox"
  },
  "metrix-urban-planning": {
    id: "metrix-urban-planning",
    name: "Ordenamiento Urbano",
    active: false,
    layers: [],
    disabled: true,
    type: "checkbox"
  },
  "metrix-civil-protection-security": {
    id: "metrix-civil-protection-security",
    name: "Protección Civil & Seguridad",
    active: false,
    layers: [],
    disabled: true,
    type: "checkbox"
  },
  "metrix-public-services": {
    id: "metrix-public-services",
    name: "Servicios Públicos",
    active: false,
    layers: [],
    disabled: true,
    type: "checkbox"
  },
  "metrix-filters": {
    id: "metrix-filters",
    name: "Filtros",
    active: true,
    layers: [],
    disabled: false,
    type: "checkbox"
  },
  "metrix-draws": {
    id: "metrix-draws",
    name: "Dibujos",
    active: true,
    layers: [],
    disabled: false,
    type: "checkbox"
  },
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