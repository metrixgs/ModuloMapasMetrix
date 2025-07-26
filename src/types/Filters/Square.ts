export interface Square {
  id: number;
  code: string;
}

export interface SquareAPIProperties {
  id: number;
  fid: number;
  cu_mza: string;
  cve_pais: string;
  cve_ent: string;
  cu_mun: string;
  id_del: string;
  id_col: string;
  // sector: null;
  // distrito_f: null;
  // distrito_l: null;
  // seccion: null;
}