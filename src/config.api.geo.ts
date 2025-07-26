import type { Country, CountryAPIProperties } from "@/types/Filters/Country";
import type { State, StateAPIProperties } from "@/types/Filters/State";
import type { Municipality, MunicipalityAPIProperties } from "@/types/Filters/Municipality";
import type { Delegation, DelegationAPIProperties } from "@/types/Filters/Delegation";
import type { Square, SquareAPIProperties } from "@/types/Filters/Square";
import type { Hood, HoodAPIProperties } from "@/types/Filters/Hood";
import type { Zip, ZipAPIProperties } from "@/types/Filters/Zip";
import type { Property, PropertyAPIProperties } from "@/types/Filters/Property";

export const API_GEO = "https://soymetrix.com/api";

export const API_GEO_REFERENCE = {
  country: {
    endpoint: "/pais",
    endpointId: "/geo/pais",
    fields: {
      id: "id",
      code: "cve_pais",
      name: "nom_pais"
    } satisfies Record<keyof Country, keyof CountryAPIProperties>,
    params: {
      filter: "level_1",
      geom: "with_geom",
      sort: "sort_by",
      order: "order"
    }
  },
  state: {
    endpoint: "/estados",
    endpointId: "/geo/estados",
    fields: {
      id: "id",
      code: "cve_ent",
      name: "nom_ent"
    } satisfies Record<keyof State, keyof StateAPIProperties>,
    params: {
      filter: "level_1",
      geom: "with_geom",
      sort: "sort_by",
      order: "order"
    }
  },
  municipality: {
    endpoint: "/municipios",
    endpointId: "/geo/municipios",
    fields: {
      id: "id",
      code: "cu_mun",
      name: "nom_mun"
    } satisfies Record<keyof Municipality, keyof MunicipalityAPIProperties>,
    params: {
      filter: "level_1",
      geom: "with_geom",
      sort: "sort_by",
      order: "order"
    }
  },
  hood: {
    endpoint: "/colonias",
    endpointId: "/geo/colonias",
    fields: {
      id: "id",
      code: "id_col",
      name: "nom_col"
    } satisfies Record<keyof Hood, keyof HoodAPIProperties>,
    params: {
      filter: "level_1",
      geom: "with_geom",
      sort: "sort_by",
      order: "order"
    }
  },
  square: {
    endpoint: "/manzanas",
    endpointId: "/geo/manzanas",
    fields: {
      id: "id",
      code: "cu_mza",
    } satisfies Record<keyof Square, keyof SquareAPIProperties>,
    params: {
      filter: "level_1",
      geom: "with_geom",
      sort: "sort_by",
      order: "order"
    }
  },
  property: {
    endpoint: "/predios",
    endpointId: "/geo/predios",
    fields: {
      id: "id",
      code: "cve_cat"
    } satisfies Record<keyof Property, keyof PropertyAPIProperties>,
    params: {
      filter: "level_1",
      geom: "with_geom",
      sort: "sort_by",
      order: "order"
    }
  },
  delegation: {
    endpoint: "/delegaciones",
    fields: {
      id: "id",
      code: "id_del",
      name: "nom_del"
    } satisfies Record<keyof Delegation, keyof DelegationAPIProperties>
  },
  zip: {
    endpoint: "/cod_postal",
    fields: {
      id: "id",
      code: "cp"
    } satisfies Record<keyof Zip, keyof ZipAPIProperties>,
    params: {
      filter: "level_1",
      geom: "with_geom"
    }
  },
}