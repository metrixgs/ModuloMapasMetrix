import type { GeoJSONLayerItem } from "@/types/Stores/LayersManager";

import { geoJSON, circleMarker } from "leaflet";

import { GetGeoJSONLayer } from "@/services/Geoserver/GetGeoJSONLayer";

import { customOnEachFeature } from "../Behaviors/customOnEachFeature";

import {
  DefaultPointStyle,
  DefaultLineStringStyle,
  DefaultPolygonStyle,
} from "@/config.map";

const LoadGeoserverGeoJSON = async (layerItem: GeoJSONLayerItem) => {
  const { source } = layerItem;

  const newLayerItem = { ...layerItem };

  if (source.sourceType === "geoserver") {
    const geojsonData = await GetGeoJSONLayer({
      serverUrl: source.serverUrl,
      workspace: source.workpace,
      name: source.name,
    });

    if (geojsonData) {
      const load = {
        Point: async () => {
          newLayerItem.symbology = {
            type: "simple",
            symbology: DefaultPointStyle,
          };
          return geoJSON(geojsonData, {
            pmIgnore: true,
            pointToLayer: (_feature, latlng) => {
              return circleMarker(latlng, DefaultPointStyle);
            },
            onEachFeature: (feature, layer) =>
              customOnEachFeature(newLayerItem.id, feature, layer),
          });
        },
        LineString: async () => {
          newLayerItem.symbology = {
            type: "simple",
            symbology: DefaultLineStringStyle,
          };
          return geoJSON(geojsonData, {
            onEachFeature: (feature, layer) =>
              customOnEachFeature(newLayerItem.id, feature, layer),
            style: DefaultLineStringStyle,
          });
        },
        Polygon: async () => {
          newLayerItem.symbology = {
            type: "simple",
            symbology: DefaultPolygonStyle,
          };
          return geoJSON(geojsonData, {
            onEachFeature: (feature, layer) =>
              customOnEachFeature(newLayerItem.id, feature, layer),
            style: DefaultPolygonStyle,
          });
        },
      }[newLayerItem.geometry];

      newLayerItem.columns = geojsonData.features[0].properties
        ? Object.keys(geojsonData.features[0].properties).map((f) => ({
            header: f,
            accessorKey: f,
          }))
        : undefined;

      return { load: load, newLayerItem: newLayerItem };
    } else {
      return { load: undefined, newLayerItem: newLayerItem };
    }
  } else {
    return { load: undefined, newLayerItem: newLayerItem };
  }
};

export default LoadGeoserverGeoJSON;
