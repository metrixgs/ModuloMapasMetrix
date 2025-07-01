export interface Incident {
  id: number;
  priority: number;
  lat: number;
  lng: number;
  title: string;
  identifier: string;
  created: string;
  expiry: string;
  client: string;
  municipality: string;
}