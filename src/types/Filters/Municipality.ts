export interface Municipality {
  id: number;
  code: string;
  name: string;
}

export interface MunicipalityAPIProperties {
  id: number;
  fid: number;
  cu_mun: string;
  cve_pais: string;
  cve_ent: string;
  nom_mun: string;
}