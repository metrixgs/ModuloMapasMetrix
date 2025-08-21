import type { LayerItem } from "@/types/Stores/LayersManager";

import { geoJSON, marker } from "leaflet";

import { ReadGeneralAPI } from "@/services/GeneralAPI/ReadGeneralAPI";

import { json2geojsonPoint } from "@/utils/geometryUtils";

import {
  getRandomColor,
  definedColorCircleMarker,
} from "../../Icons/customIcons";
import { customOnEachFeature } from "../Behaviors/customOnEachFeature";
import { categoriesMap, subcategoriesMap, prioritiesMap } from "@/utils/incidentDataMappers";

const LoadAPI = async (layerItem: LayerItem) => {
  const { source } = layerItem;
  const newLayerItem = { ...layerItem };

  if (source.sourceType === "api") {
    if (source.geom) {
      // TODO
      return {
        load: undefined,
        newLayerItem: newLayerItem,
      };
    } else if (
      newLayerItem.format === "geojson" &&
      source.latitude &&
      source.longitude
    ) {
      const data = await ReadGeneralAPI({ endpoint: source.endpoint });

      if (data) {
        const geojsonData = json2geojsonPoint(
          data.data as object[],
          source.latitude,
          source.longitude
        );

        const load = async () => {
          const color = getRandomColor();
          return geoJSON(geojsonData, {
            pmIgnore: true,
            pointToLayer: (_feature, latlng) => {
              return marker(latlng, {
                icon: definedColorCircleMarker(color),
                pmIgnore: true,
              });
            },
            onEachFeature: (feature, layer) =>
              customOnEachFeature(newLayerItem.id, feature, layer),
          });
        };

        newLayerItem.columns = [
          { header: "Cliente", accessorKey: "nombre_cliente" },
          { header: "ID Campaña", accessorKey: "campana_id" },
          { header: "ID Ronda", accessorKey: "ronda_id" },
          { header: "ID Ticket", accessorKey: "identificador" },
          {
            header: "Fecha",
            accessorKey: "fecha_creacion",
            cell: (info: any) => {
              const date = new Date(info.getValue());
              return date.toLocaleDateString("es-ES");
            },
          },
          {
            header: "Categoría",
            accessorKey: "categoria_id",
            cell: (info: any) => categoriesMap[info.getValue()] || info.getValue(),
          },
          {
            header: "Clasificación",
            accessorKey: "subcategoria_id",
            cell: (info: any) => subcategoriesMap[info.getValue()] || info.getValue(),
          },
          {
            header: "Prioridad",
            accessorKey: "prioridad",
            cell: (info: any) => prioritiesMap[info.getValue()] || info.getValue(),
          },
          { header: "Estatus", accessorKey: "estado_p" },
          { header: "Área Responsable", accessorKey: "nombre_area" },
          { header: "Operador(a)", accessorKey: "nombre_usuario" },
          { header: "Estado", accessorKey: "estado" },
          { header: "Municipio", accessorKey: "municipio" },
          { header: "Código Postal", accessorKey: "codigo_postal" },
          { header: "Distrito Federal", accessorKey: "df" },
          { header: "Distrito Local", accessorKey: "dl" },
          { header: "Sección Electoral", accessorKey: "seccion_electoral" },
        ];

        newLayerItem.geometry = "Point";

        return { load: load, newLayerItem: newLayerItem };
      } else {
        return {
          load: undefined,
          newLayerItem: newLayerItem,
        };
      }
    } else {
      return {
        load: undefined,
        newLayerItem: newLayerItem,
      };
    }
  } else {
    return {
      load: undefined,
      newLayerItem: newLayerItem,
    };
  }
};

export default LoadAPI;
