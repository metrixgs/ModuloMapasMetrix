import type { IncidentAPI } from "@/types/API";
import type { Incident } from "@/types/Incident";

const AdaptedIncident = (incident: IncidentAPI): Incident => {
  const parsed: Incident = {
    id: parseInt(incident.id),
    priority: parseInt(incident.prioridad),
    lat: parseFloat(incident.latitud),
    lng: parseFloat(incident.longitud),
    title: incident.titulo,
    identifier: incident.identificador,
    created: incident.fecha_creacion,
    expiry: incident.fecha_vencimiento,
    client: incident.nombre_cliente,
    municipality: incident.municipio
  };

  return parsed;
};

export default AdaptedIncident;
