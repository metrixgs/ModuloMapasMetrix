// Mock service para cargar detalles de incidencias
// En un entorno real, esto haría una llamada a tu API

export interface IncidentDetail {
  id: string
  cliente_id: string
  area_id: string
  usuario_id: string
  identificador: string
  titulo: string
  descripcion: string
  prioridad: string
  latitud: string
  longitud: string
  estado: string
  fecha_creacion: string
  fecha_modificacion?: string
  fecha_vencimiento: string
  direccion: string
  nombre_usuario: string
  nombre_cliente: string
  nombre_area: string
  municipio?: string
  colonia?: string
  codigo_postal?: string
  archivos: Array<{
    id: string
    ticket_id: string
    usuario_id: string
    descripcion: string
    ruta: string
    tipo_mime: string
    tamano: string
    fecha_subida: string
    ruta_firmada: string
  }>
}

export const ReadIncidentDetails = async (incidentId: string): Promise<IncidentDetail | null> => {
  try {
    // Primero intentar obtener el incidente específico por ID
    let response = await fetch(`https://api.soymetrix.com/api/incidencias/${incidentId}`)
    let data = null
    
    if (response.ok) {
      const responseData = await response.json()
      // Manejar la estructura de respuesta que puede tener una propiedad 'data'
      data = responseData.data || responseData
    } else {
      // Si el endpoint individual no funciona, buscar en la lista completa
      console.log(`Individual endpoint failed, searching in full list for ID: ${incidentId}`)
      response = await fetch('https://api.soymetrix.com/api/incidencias')
      
      if (!response.ok) {
        console.error(`Error fetching incidents list: ${response.status} ${response.statusText}`)
        return null
      }
      
      const listResponse = await response.json()
      const incidents = listResponse.data || listResponse
      
      // Buscar el incidente por ID en la lista
      data = incidents.find((incident: any) => incident.id === incidentId)
      
      if (!data) {
        console.error(`Incident with ID ${incidentId} not found in the list`)
        return null
      }
    }
    
    // Mapear la respuesta de la API al formato esperado por la interfaz
    const incidentDetail: IncidentDetail = {
      id: data.id || incidentId,
      cliente_id: data.cliente_id || "",
      area_id: data.area_id || "",
      usuario_id: data.usuario_id || "",
      identificador: data.identificador || "",
      titulo: data.titulo || "",
      descripcion: data.descripcion || "",
      prioridad: data.prioridad || "",
      latitud: data.latitud || "",
      longitud: data.longitud || "",
      estado: data.estado || data.estado_p || "",
      fecha_creacion: data.fecha_creacion || "",
      fecha_modificacion: data.fecha_modificacion || "",
      fecha_vencimiento: data.fecha_vencimiento || "",
      direccion: data.direccion || data.direccion_completa || "",
      nombre_usuario: data.nombre_usuario || "",
      nombre_cliente: data.nombre_cliente || "",
      nombre_area: data.nombre_area || "",
      municipio: data.municipio || "",
      colonia: data.colonia || "",
      codigo_postal: data.codigo_postal || "",
      archivos: data.archivos || []
    }

    return incidentDetail
  } catch (error) {
    console.error('Error fetching incident details:', error)
    return null
  }
}
