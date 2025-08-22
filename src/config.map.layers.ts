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
    name: "División política",
    active: true,
    disabled: false,
    type: "checkbox",
    icon: "gi/GiMexico"
  },
  "metrix-electorales": {
    id: "metrix-electorales",
    name: "Electorales",
    active: true,
    disabled: false,
    type: "checkbox",
    icon: "md/MdOutlineHowToVote"
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
  },
  "metrix-estadistica-demografia": {
    id: "metrix-estadistica-demografia",
    name: "Estadística & Demografía",
    active: true,
    disabled: false,
    type: "checkbox",
    icon: "bi/BiMaleFemale"
  },
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
    renamed: true,
    groupId: AVAILABLE_GROUPS["metrix-basemaps"].id,
    groupName: AVAILABLE_GROUPS["metrix-basemaps"].name,
    description: "Mapa satelital de ESRI.",
    thumbnail: "/layers-images/esri-satellite.png",
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
    renamed: true,
    groupId: AVAILABLE_GROUPS["metrix-basemaps"].id,
    groupName: AVAILABLE_GROUPS["metrix-basemaps"].name,
    description: "Mapa mundial de Open Street Maps.",
    thumbnail: "/layers-images/osm.png",
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
    renamed: true,
    groupId: AVAILABLE_GROUPS["metrix-main"].id,
    groupName: AVAILABLE_GROUPS["metrix-main"].name,
    description: "Colección de incidentes.",
    thumbnail: "/layers-images/incidentes.png",
    source: {
      sourceType: "api",
      endpoint: "https://api.soymetrix.com/api/incidencias",
      latitude: "latitud",
      longitude: "longitud"
    },
  },
  {
    id: "metrix-dummy",
    name: "Liderazgos y combinaciones",
    active: true,
    temp: true,
    format: "geojson",
    type: "layer",
    geometry: "Point",
    renamed: true,
    groupId: AVAILABLE_GROUPS["metrix-main"].id,
    groupName: AVAILABLE_GROUPS["metrix-main"].name,
    description: "Concentrado de liderazgos y coordinaciones por secciones electorales 2021-2025",
    thumbnail: "/layers-images/dummy.png",
    source: {
      sourceType: "geoserver",
      serverUrl: "https://geoserver.soymetrix.com/geoserver/",
      workpace: "metrix",
      name: "demo"
    },
  },
  {
    id: "metrix-denue-queretaro",
    name: "DENUE (Querétaro)",
    active: true,
    temp: true,
    format: "geojson",
    type: "layer",
    geometry: "Point",
    renamed: true,
    groupId: AVAILABLE_GROUPS["metrix-estadistica-demografia"].id,
    groupName: AVAILABLE_GROUPS["metrix-estadistica-demografia"].name,
    description: "Directorio Estadístico Nacional de Unidades Económicas en el estado de Querétaro.",
    source: {
      sourceType: "geoserver",
      serverUrl: "https://geoserver.soymetrix.com/geoserver/",
      workpace: "metrix",
      name: "denue_quero"
    },
  },
  {
    id: "metrix-circunscripcion",
    name: "Circunscripción",
    active: true,
    temp: true,
    format: "geojson",
    type: "layer",
    geometry: "Polygon",
    renamed: true,
    groupId: AVAILABLE_GROUPS["metrix-electorales"].id,
    groupName: AVAILABLE_GROUPS["metrix-electorales"].name,
    description: "",
    thumbnail: "/layers-images/circunscripcion.png",
    source: {
      sourceType: "geoserver",
      serverUrl: "https://geoserver.soymetrix.com/geoserver/",
      workpace: "metrix",
      name: "circunscripcion"
    }
  },
  {
    id: "metrix-distritos-federales",
    name: "Distritos Federales",
    active: true,
    temp: true,
    format: "geojson",
    type: "layer",
    geometry: "Polygon",
    renamed: true,
    groupId: AVAILABLE_GROUPS["metrix-electorales"].id,
    groupName: AVAILABLE_GROUPS["metrix-electorales"].name,
    description: "",
    thumbnail: "/layers-images/distritos-federales.png",
    source: {
      sourceType: "geoserver",
      serverUrl: "https://geoserver.soymetrix.com/geoserver/",
      workpace: "metrix",
      name: "distritos_federales"
    }
  },
  {
    id: "metrix-distritos-locales",
    name: "Distritos Locales",
    active: true,
    temp: true,
    format: "geojson",
    type: "layer",
    geometry: "Polygon",
    renamed: true,
    groupId: AVAILABLE_GROUPS["metrix-electorales"].id,
    groupName: AVAILABLE_GROUPS["metrix-electorales"].name,
    description: "",
    thumbnail: "/layers-images/distritos-locales.png",
    source: {
      sourceType: "geoserver",
      serverUrl: "https://geoserver.soymetrix.com/geoserver/",
      workpace: "metrix",
      name: "distritos_locales"
    }
  },
  {
    id: "metrix-pais",
    name: "País",
    active: true,
    temp: true,
    format: "geojson",
    type: "layer",
    geometry: "Polygon",
    renamed: true,
    groupId: AVAILABLE_GROUPS["metrix-geographic"].id,
    groupName: AVAILABLE_GROUPS["metrix-geographic"].name,
    description: "Colección de paises alrededor del mundo.",
    thumbnail: "/layers-images/pais.png",
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
    renamed: true,
    groupId: AVAILABLE_GROUPS["metrix-geographic"].id,
    groupName: AVAILABLE_GROUPS["metrix-geographic"].name,
    description: "Colección de estados alrededor del mundo.",
    thumbnail: "/layers-images/estados.png",
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
    renamed: true,
    groupId: AVAILABLE_GROUPS["metrix-geographic"].id,
    groupName: AVAILABLE_GROUPS["metrix-geographic"].name,
    description: "Colección de municipios alrededor del mundo.",
    thumbnail: "/layers-images/municipios.png",
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
    renamed: true,
    groupId: AVAILABLE_GROUPS["metrix-geographic"].id,
    groupName: AVAILABLE_GROUPS["metrix-geographic"].name,
    description: "Colección de delegaciones.",
    thumbnail: "/layers-images/delegaciones.png",
    source: {
      sourceType: "geoserver",
      serverUrl: "https://geoserver.soymetrix.com/geoserver/",
      workpace: "metrix",
      name: "delegaciones"
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
    renamed: true,
    groupId: AVAILABLE_GROUPS["metrix-geographic"].id,
    groupName: AVAILABLE_GROUPS["metrix-geographic"].name,
    description: "Colección de colonias alrededor del mundo.",
    thumbnail: "/layers-images/colonias.png",
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
    renamed: true,
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
    renamed: true,
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
    renamed: true,
    groupId: AVAILABLE_GROUPS["metrix-water"].id,
    groupName: AVAILABLE_GROUPS["metrix-water"].name,
    description: "Red de acueducto.",
    thumbnail: "/layers-images/acueductos.png",
    source: {
      sourceType: "geoserver",
      serverUrl: "https://geoserver.soymetrix.com/geoserver/",
      workpace: "metrix",
      name: "acueducto"
    }
  },
  {
    id: "metrix-acuiferos",
    name: "Acuiferos",
    active: true,
    temp: true,
    format: "geojson",
    type: "layer",
    geometry: "Polygon",
    renamed: true,
    groupId: AVAILABLE_GROUPS["metrix-water"].id,
    groupName: AVAILABLE_GROUPS["metrix-water"].name,
    description: "",
    thumbnail: "/layers-images/acuiferos.png",
    source: {
      sourceType: "geoserver",
      serverUrl: "https://geoserver.soymetrix.com/geoserver/",
      workpace: "metrix",
      name: "acuiferos"
    }
  },
  {
    id: "metrix-cuerpos-agua",
    name: "Cuerpos de agua",
    active: true,
    temp: true,
    format: "geojson",
    type: "layer",
    geometry: "Polygon",
    renamed: true,
    groupId: AVAILABLE_GROUPS["metrix-water"].id,
    groupName: AVAILABLE_GROUPS["metrix-water"].name,
    description: "",
    thumbnail: "/layers-images/cuerpos-agua.png",
    source: {
      sourceType: "geoserver",
      serverUrl: "https://geoserver.soymetrix.com/geoserver/",
      workpace: "metrix",
      name: "cuerpos_agua"
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
    renamed: true,
    groupId: AVAILABLE_GROUPS["metrix-water"].id,
    groupName: AVAILABLE_GROUPS["metrix-water"].name,
    description: "Colección de plantas de tratamiento de agua en México.",
    thumbnail: "/layers-images/plantas-tratamiento.png",
    source: {
      sourceType: "geoserver",
      serverUrl: "https://geoserver.soymetrix.com/geoserver/",
      workpace: "metrix",
      name: "plantas_tratamiento"
    }
  },
  {
    id: "metrix-anp",
    name: "Área Natural Protegida (ANP)",
    active: true,
    temp: true,
    format: "geojson",
    type: "layer",
    geometry: "Polygon",
    renamed: true,
    groupId: AVAILABLE_GROUPS["metrix-ordenamiento"].id,
    groupName: AVAILABLE_GROUPS["metrix-ordenamiento"].name,
    thumbnail: "/layers-images/anp.png",
    source: {
      sourceType: "geoserver",
      serverUrl: "https://geoserver.soymetrix.com/geoserver/",
      workpace: "metrix",
      name: "anp"
    }
  },
  {
    id: "metrix-zona-norte",
    name: "Zonificación Secundaria - Norte",
    active: true,
    temp: true,
    format: "geojson",
    type: "layer",
    geometry: "Polygon",
    renamed: true,
    groupId: AVAILABLE_GROUPS["metrix-ordenamiento"].id,
    groupName: AVAILABLE_GROUPS["metrix-ordenamiento"].name,
    thumbnail: "/layers-images/zona-norte.png",
    source: {
      sourceType: "geoserver",
      serverUrl: "https://geoserver.soymetrix.com/geoserver/",
      workpace: "metrix",
      name: "zon_norte"
    }
  },
  {
    id: "metrix-zona-oriente",
    name: "Zonificación Secundaria - Oriente",
    active: true,
    temp: true,
    format: "geojson",
    type: "layer",
    geometry: "Polygon",
    renamed: true,
    groupId: AVAILABLE_GROUPS["metrix-ordenamiento"].id,
    groupName: AVAILABLE_GROUPS["metrix-ordenamiento"].name,
    thumbnail: "/layers-images/zona-oriente.png",
    source: {
      sourceType: "geoserver",
      serverUrl: "https://geoserver.soymetrix.com/geoserver/",
      workpace: "metrix",
      name: "zon_oriente"
    }
  },
  {
    id: "metrix-zona-poniente",
    name: "Zonificación Secundaria - Poniente",
    active: true,
    temp: true,
    format: "geojson",
    type: "layer",
    geometry: "Polygon",
    renamed: true,
    groupId: AVAILABLE_GROUPS["metrix-ordenamiento"].id,
    groupName: AVAILABLE_GROUPS["metrix-ordenamiento"].name,
    thumbnail: "/layers-images/zona-poniente.png",
    source: {
      sourceType: "geoserver",
      serverUrl: "https://geoserver.soymetrix.com/geoserver/",
      workpace: "metrix",
      name: "zon_poniente"
    }
  }, 
  {
    id: "metrix-zona-sur",
    name: "Zonificación Secundaria - Sur",
    active: true,
    temp: true,
    format: "geojson",
    type: "layer",
    geometry: "Polygon",
    renamed: true,
    groupId: AVAILABLE_GROUPS["metrix-ordenamiento"].id,
    groupName: AVAILABLE_GROUPS["metrix-ordenamiento"].name,
    thumbnail: "/layers-images/zona-sur.png",
    source: {
      sourceType: "geoserver",
      serverUrl: "https://geoserver.soymetrix.com/geoserver/",
      workpace: "metrix",
      name: "zon_sur"
    }
  },
  {
    id: "metrix-zona-patrimonial-a",
    name: "Zonas Patrimoniales - A",
    active: true,
    temp: true,
    format: "geojson",
    type: "layer",
    geometry: "Polygon",
    renamed: true,
    groupId: AVAILABLE_GROUPS["metrix-ordenamiento"].id,
    groupName: AVAILABLE_GROUPS["metrix-ordenamiento"].name,
    thumbnail: "/layers-images/zona-patrimonial-a.png",
    source: {
      sourceType: "geoserver",
      serverUrl: "https://geoserver.soymetrix.com/geoserver/",
      workpace: "metrix",
      name: "zona_patrimonial_a"
    }
  },
  {
    id: "metrix-zona-patrimonial-b",
    name: "Zonas Patrimoniales - B",
    active: true,
    temp: true,
    format: "geojson",
    type: "layer",
    geometry: "Polygon",
    renamed: true,
    groupId: AVAILABLE_GROUPS["metrix-ordenamiento"].id,
    groupName: AVAILABLE_GROUPS["metrix-ordenamiento"].name,
    thumbnail: "/layers-images/zona-patrimonial-b.png",
    source: {
      sourceType: "geoserver",
      serverUrl: "https://geoserver.soymetrix.com/geoserver/",
      workpace: "metrix",
      name: "zona_patrimonial_b"
    }
  },
  {
    id: "metrix-zona-patrimonial-b3",
    name: "Zonas Patrimoniales - B3",
    active: true,
    temp: true,
    format: "geojson",
    type: "layer",
    geometry: "Polygon",
    renamed: true,
    groupId: AVAILABLE_GROUPS["metrix-ordenamiento"].id,
    groupName: AVAILABLE_GROUPS["metrix-ordenamiento"].name,
    thumbnail: "/layers-images/zona-patrimonial-b3.png",
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
    renamed: true,
    groupId: AVAILABLE_GROUPS["metrix-ordenamiento"].id,
    groupName: AVAILABLE_GROUPS["metrix-ordenamiento"].name,
    thumbnail: "/layers-images/parques-industria.png",
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
    renamed: true,
    groupId: AVAILABLE_GROUPS["metrix-ordenamiento"].id,
    groupName: AVAILABLE_GROUPS["metrix-ordenamiento"].name,
    thumbnail: "/layers-images/espacios-publicos.png",
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
