import type { LayerGroupItem, LayerItem } from "@/types/Stores/LayersManager";

export const AVAILABLE_GROUPS: Record<string, LayerGroupItem> = {
  "metrix-basemaps": {
    id: "metrix-basemaps",
    name: "Mapas base",
    active: true,
    disabled: false,
    type: "radio",
  },
  "metrix-main": {
    id: "metrix-main",
    name: "Capas principales",
    active: true,
    disabled: false,
    type: "checkbox",
  }
};

export const AVAILABLE_LAYERS: LayerItem[] = [
  {
    id: "metrix-esri-satellite",
    active: false,
    name: "ESRI Satelite",
    temp: false,
    format: "tile",
    type: "layer",
    renamed: false,
    groupId: AVAILABLE_GROUPS["metrix-basemaps"].id,
    groupName: AVAILABLE_GROUPS["metrix-basemaps"].name,
    source: "api",
    endpoint:
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  },
  {
    id: "metrix-osm",
    active: false,
    name: "Open Street Maps",
    temp: false,
    format: "tile",
    type: "layer",
    renamed: false,
    groupId: AVAILABLE_GROUPS["metrix-basemaps"].id,
    groupName: AVAILABLE_GROUPS["metrix-basemaps"].name,
    source: "api",
    endpoint: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  },
  {
    id: "metrix-incidents",
    name: "Incidentes",
    active: true,
    temp: false,
    format: "geojson",
    type: "layer",
    geometry: "Point",
    renamed: false,
    groupId: AVAILABLE_GROUPS["metrix-main"].id,
    groupName: AVAILABLE_GROUPS["metrix-main"].name,
    source: "api",
    endpoint: "https://lightsteelblue-spoonbill-227005.hostingersite.com/api/incidencias"
  },
];
