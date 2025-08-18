import type { LayerItem } from "@/types/Stores/LayersManager";

import { geoJSON, marker } from "leaflet";

import { ReadGeneralAPI } from "@/services/GeneralAPI/ReadGeneralAPI";

import { json2geojsonPoint } from "@/utils/geometryUtils";

import {
  getRandomColor,
  definedColorCircleMarker,
} from "../../Icons/customIcons";
import { customOnEachFeature } from "../CustomPopup/customOnEachFeature";

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

        newLayerItem.columns = geojsonData.features[0].properties
          ? Object.keys(geojsonData.features[0].properties).map((f) => ({
              header: f,
              accessorKey: f,
            }))
          : undefined;

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
