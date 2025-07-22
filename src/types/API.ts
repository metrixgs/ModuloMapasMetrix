export interface PluralResponseAPI<T> {
  status: number;
  error: boolean;
  data: T[];
}

export interface CountryAPI {
  id: number;
  fid: number;
  cve_pais: string;
  nom_pais: string;
}
