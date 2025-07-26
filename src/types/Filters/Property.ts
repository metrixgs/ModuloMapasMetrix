export interface Property {
  id: number;
	code: string;
}

export interface PropertyAPIProperties {
  id: number;
  fid: number;
  cve_cat: string;
  cve_pais: string;
  cve_ent: string;
  cu_mun: string;
  id_del: string;
  ed_col: string;
  cu_mza: string;
  calle: string;
  num_ext: string;
  no_int: string;
  letra: string;
  colonia: string;
  sector: string;
  distrito_f: string;
  distrito_l: string;
  seccion: string;
  circuito: string;
  distrito_j: string;
  // estatus: null;
  // direccion: null;
  // propietario: null;
  // num_int: null;
  // cp_prop: null;
  // telefono_p: null;
  // rcf_prop: null;
  // tipo_perso: null;
}