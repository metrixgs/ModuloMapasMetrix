import type { LayerGroupItem, LayerItem } from "@/types/Stores/LayersManager";

export const AVAILABLE_GROUPS: Record<string, LayerGroupItem> = {
  "metrix-basemaps": {
    id: "metrix-basemaps",
    name: "Mapas base",
    active: true,
    disabled: false,
    type: "radio",
    icon: "bi/BiCategory",
  },
  "metrix-main": {
    id: "metrix-main",
    name: "Capas principales",
    active: true,
    disabled: false,
    type: "checkbox",
    icon: "bi/BiLeaf",
  },
  "metrix-geographic": {
    id: "metrix-geographic",
    name: "Capas Geográficas",
    active: true,
    disabled: false,
    type: "checkbox",
    icon: "gi/GiMexico"
  },
  "metrix-water": {
    id: "metrix-water",
    name: "Infraestructura Hídrica",
    active: true,
    disabled: false,
    type: "checkbox",
    icon: "bi/BiWater"
  },
  "metrix-ordenamiento": {
    id: "metrix-ordenamiento",
    name: "Ordenamiento Urbano",
    active: true,
    disabled: false,
    type: "checkbox",
    icon: "bi/BiBuildingHouse"
  }
};

export const GroupsAPI = async (): Promise<LayerGroupItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const groups = Object.keys(AVAILABLE_GROUPS).map(
        (k) => AVAILABLE_GROUPS[k]
      );
      resolve(groups);
    }, 200);
  });
};

export const AVAILABLE_LAYERS: LayerItem[] = [
  {
    id: "metrix-esri-satellite",
    active: false,
    name: "ESRI Satelite",
    temp: true,
    format: "tile",
    type: "layer",
    renamed: false,
    groupId: AVAILABLE_GROUPS["metrix-basemaps"].id,
    groupName: AVAILABLE_GROUPS["metrix-basemaps"].name,
    description: "Mapa satelital de ESRI.",
    source: {
      sourceType: "tile",
      endpoint: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
    }
  },
  {
    id: "metrix-osm",
    active: false,
    name: "Open Street Maps",
    temp: true,
    format: "tile",
    type: "layer",
    renamed: false,
    groupId: AVAILABLE_GROUPS["metrix-basemaps"].id,
    groupName: AVAILABLE_GROUPS["metrix-basemaps"].name,
    description: "Mapa mundial de Open Street Maps.",
    source: {
      sourceType: "tile",
      endpoint: "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
    }
  },
  {
    id: "metrix-incidents",
    name: "Incidentes",
    active: true,
    temp: true,
    format: "geojson",
    type: "layer",
    geometry: "Point",
    renamed: false,
    groupId: AVAILABLE_GROUPS["metrix-main"].id,
    groupName: AVAILABLE_GROUPS["metrix-main"].name,
    description: "Colección de incidentes.",
    source: {
      sourceType: "api",
      endpoint: "https://lightsteelblue-spoonbill-227005.hostingersite.com/api/incidencias",
      latitude: "latitud",
      longitude: "longitud"
    },
  },
  {
    id: "metrix-pais",
    name: "País",
    active: true,
    temp: true,
    format: "geojson",
    type: "layer",
    geometry: "Polygon",
    renamed: false,
    groupId: AVAILABLE_GROUPS["metrix-geographic"].id,
    groupName: AVAILABLE_GROUPS["metrix-geographic"].name,
    description: "Colección de paises alrededor del mundo.",
    source: {
      sourceType: "geoserver",
      serverUrl: "https://geoserver.soymetrix.com/geoserver/",
      workpace: "metrix",
      name: "pais"
    }
  },
  {
    id: "metrix-estados",
    name: "Estados",
    active: true,
    temp: true,
    format: "geojson",
    type: "layer",
    geometry: "Polygon",
    renamed: false,
    groupId: AVAILABLE_GROUPS["metrix-geographic"].id,
    groupName: AVAILABLE_GROUPS["metrix-geographic"].name,
    description: "Colección de estados alrededor del mundo.",
    source: {
      sourceType: "geoserver",
      serverUrl: "https://geoserver.soymetrix.com/geoserver/",
      workpace: "metrix",
      name: "estados"
    }
  },
  {
    id: "metrix-municipios",
    name: "Municipios",
    active: true,
    temp: true,
    format: "geojson",
    type: "layer",
    geometry: "Polygon",
    renamed: false,
    groupId: AVAILABLE_GROUPS["metrix-geographic"].id,
    groupName: AVAILABLE_GROUPS["metrix-geographic"].name,
    description: "Colección de municipios alrededor del mundo.",
    source: {
      sourceType: "geoserver",
      serverUrl: "https://geoserver.soymetrix.com/geoserver/",
      workpace: "metrix",
      name: "municipios"
    }
  },
  {
    id: "metrix-delegaciones",
    name: "Delegaciones",
    active: true,
    temp: true,
    format: "geojson",
    type: "layer",
    geometry: "Polygon",
    renamed: false,
    groupId: AVAILABLE_GROUPS["metrix-geographic"].id,
    groupName: AVAILABLE_GROUPS["metrix-geographic"].name,
    description: "Colección de delegaciones alrededor del mundo.",
    source: {
      sourceType: "geoserver",
      serverUrl: "https://geoserver.soymetrix.com/geoserver/",
      workpace: "metrix",
      name: "denue_quero"
    }
  },
  {
    id: "metrix-colonias",
    name: "Colonias",
    active: true,
    temp: true,
    format: "geojson",
    type: "layer",
    geometry: "Polygon",
    renamed: false,
    groupId: AVAILABLE_GROUPS["metrix-geographic"].id,
    groupName: AVAILABLE_GROUPS["metrix-geographic"].name,
    description: "Colección de colonias o barrios alrededor del mundo.",
    source: {
      sourceType: "geoserver",
      serverUrl: "https://geoserver.soymetrix.com/geoserver/",
      workpace: "metrix",
      name: "colonias"
    }
  },
  {
    id: "metrix-manzanas",
    name: "Manzanas",
    active: true,
    temp: true,
    format: "geojson",
    type: "layer",
    geometry: "Polygon",
    renamed: false,
    groupId: AVAILABLE_GROUPS["metrix-geographic"].id,
    groupName: AVAILABLE_GROUPS["metrix-geographic"].name,
    description: "Colección de manzanas alrededor del mundo.",
    source: {
      sourceType: "geoserver",
      serverUrl: "https://geoserver.soymetrix.com/geoserver/",
      workpace: "metrix",
      name: "manzanas"
    }
  },
  {
    id: "metrix-predios",
    name: "Predios",
    active: true,
    temp: true,
    format: "geojson",
    type: "layer",
    geometry: "Polygon",
    renamed: false,
    groupId: AVAILABLE_GROUPS["metrix-geographic"].id,
    groupName: AVAILABLE_GROUPS["metrix-geographic"].name,
    description: "Colección de predios o terrenos alrededor del mundo.",
    source: {
      sourceType: "geoserver",
      serverUrl: "https://geoserver.soymetrix.com/geoserver/",
      workpace: "metrix",
      name: "predios"
    }
  },
  {
    id: "metrix-acueductos",
    name: "Acueductos",
    active: true,
    temp: true,
    format: "geojson",
    type: "layer",
    geometry: "LineString",
    renamed: false,
    groupId: AVAILABLE_GROUPS["metrix-water"].id,
    groupName: AVAILABLE_GROUPS["metrix-water"].name,
    description: "Red de acueducto.",
    source: {
      sourceType: "geoserver",
      serverUrl: "https://geoserver.soymetrix.com/geoserver/",
      workpace: "metrix",
      name: "acueducto_metrix"
    }
  },
  {
    id: "metrix-plantas-tratamiento",
    name: "Plantas de tratamiento",
    active: true,
    temp: true,
    format: "geojson",
    type: "layer",
    geometry: "Point",
    renamed: false,
    groupId: AVAILABLE_GROUPS["metrix-water"].id,
    groupName: AVAILABLE_GROUPS["metrix-water"].name,
    description: "Colección de plantas de tratamiento de agua en México.",
    source: {
      sourceType: "geoserver",
      serverUrl: "https://geoserver.soymetrix.com/geoserver/",
      workpace: "metrix",
      name: "plantas_tratamiento"
    }
  },
  {
    id: "metrix-zona-norte",
    name: "Zona Norte",
    active: true,
    temp: true,
    format: "geojson",
    type: "layer",
    geometry: "Polygon",
    renamed: false,
    groupId: AVAILABLE_GROUPS["metrix-ordenamiento"].id,
    groupName: AVAILABLE_GROUPS["metrix-ordenamiento"].name,
    source: {
      sourceType: "geoserver",
      serverUrl: "https://geoserver.soymetrix.com/geoserver/",
      workpace: "metrix",
      name: "zon_norte"
    }
  },
  {
    id: "metrix-zona-poniente",
    name: "Zona Poniente",
    active: true,
    temp: true,
    format: "geojson",
    type: "layer",
    geometry: "Polygon",
    renamed: false,
    groupId: AVAILABLE_GROUPS["metrix-ordenamiento"].id,
    groupName: AVAILABLE_GROUPS["metrix-ordenamiento"].name,
    source: {
      sourceType: "geoserver",
      serverUrl: "https://geoserver.soymetrix.com/geoserver/",
      workpace: "metrix",
      name: "zon_poniente"
    }
  }, 
  {
    id: "metrix-zona-sur",
    name: "Zona Sur",
    active: true,
    temp: true,
    format: "geojson",
    type: "layer",
    geometry: "Polygon",
    renamed: false,
    groupId: AVAILABLE_GROUPS["metrix-ordenamiento"].id,
    groupName: AVAILABLE_GROUPS["metrix-ordenamiento"].name,
    source: {
      sourceType: "geoserver",
      serverUrl: "https://geoserver.soymetrix.com/geoserver/",
      workpace: "metrix",
      name: "zon_sur"
    }
  },
  {
    id: "metrix-zona-patrimonial-a",
    name: "Zona Patrimonial A",
    active: true,
    temp: true,
    format: "geojson",
    type: "layer",
    geometry: "Polygon",
    renamed: false,
    groupId: AVAILABLE_GROUPS["metrix-ordenamiento"].id,
    groupName: AVAILABLE_GROUPS["metrix-ordenamiento"].name,
    source: {
      sourceType: "geoserver",
      serverUrl: "https://geoserver.soymetrix.com/geoserver/",
      workpace: "metrix",
      name: "zona_patrimonial_a"
    }
  },
  {
    id: "metrix-zona-patrimonial-b",
    name: "Zona Patrimonial B",
    active: true,
    temp: true,
    format: "geojson",
    type: "layer",
    geometry: "Polygon",
    renamed: false,
    groupId: AVAILABLE_GROUPS["metrix-ordenamiento"].id,
    groupName: AVAILABLE_GROUPS["metrix-ordenamiento"].name,
    source: {
      sourceType: "geoserver",
      serverUrl: "https://geoserver.soymetrix.com/geoserver/",
      workpace: "metrix",
      name: "zona_patrimonial_b"
    }
  },
  {
    id: "metrix-zona-patrimonial-b3",
    name: "Zona Patrimonial B3",
    active: true,
    temp: true,
    format: "geojson",
    type: "layer",
    geometry: "Polygon",
    renamed: false,
    groupId: AVAILABLE_GROUPS["metrix-ordenamiento"].id,
    groupName: AVAILABLE_GROUPS["metrix-ordenamiento"].name,
    source: {
      sourceType: "geoserver",
      serverUrl: "https://geoserver.soymetrix.com/geoserver/",
      workpace: "metrix",
      name: "zona_patrimonial_b3"
    }
  },
  {
    id: "metrix-parques-industria",
    name: "Parques Industria",
    active: true,
    temp: true,
    format: "geojson",
    type: "layer",
    geometry: "Polygon",
    renamed: false,
    groupId: AVAILABLE_GROUPS["metrix-ordenamiento"].id,
    groupName: AVAILABLE_GROUPS["metrix-ordenamiento"].name,
    source: {
      sourceType: "geoserver",
      serverUrl: "https://geoserver.soymetrix.com/geoserver/",
      workpace: "metrix",
      name: "parques_industria"
    }
  },
  {
    id: "metrix-espacios-publicos",
    name: "Espacios Públicos",
    active: true,
    temp: true,
    format: "geojson",
    type: "layer",
    geometry: "Polygon",
    renamed: false,
    groupId: AVAILABLE_GROUPS["metrix-ordenamiento"].id,
    groupName: AVAILABLE_GROUPS["metrix-ordenamiento"].name,
    source: {
      sourceType: "geoserver",
      serverUrl: "https://geoserver.soymetrix.com/geoserver/",
      workpace: "metrix",
      name: "espacios_publicos"
    }
  },
];

export const LayersAPI = async (): Promise<LayerItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(AVAILABLE_LAYERS);
    }, 200);
  });
};
