export interface PluralResponseAPI<T> {
  status: number;
  error: boolean;
  data: T[];
}

export interface IncidentAPI {
  id: string;
  cliente_id: string;
  area_id: string;
  usuario_id: string;
  campana_id: string;
  ronda_id: string;
  tipo_id?: string;
  identificador: string;
  titulo: string;
  descripcion: string;
  prioridad: string;
  latitud: string;
  longitud: string;
  estado_p: string;
  estado: string;
  fecha_modificacion?: string;
  municipio: string;
  colonia: string;
  df: string;
  dl: string;
  seccion_electoral: string;
  codigo_postal: string;
  direccion_completa: string;
  direccion_solicitante: string;
  mismo_domicilio: string;
  fecha_creacion: string;
  fecha_cierre?: string;
  fecha_vencimiento: string;
  cuenta_id?: string;
  estado_articulo?: string;
  direccion: string;
  nombreCiudadano: string;
  correoCiudadano: string;
  telefonoCiudadano: string;
  categoria_id: string;
  subcategoria_id: string;
  prioridad_id: string;
  encuesta_contestada: string;
  tipo_ticket_id: string;
  nombre_usuario: string;
  nombre_cliente: string;
  nombre_area: string;
  color_sla: string;
  url: string;
}
