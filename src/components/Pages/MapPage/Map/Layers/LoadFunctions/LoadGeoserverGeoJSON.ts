import type { GeoJSONLayerItem } from "@/types/Stores/LayersManager";

import { geoJSON, marker } from "leaflet";

import { GetGeoJSONLayer } from "@/services/Geoserver/GetGeoJSONLayer";

import { customOnEachFeature } from "../CustomPopup/customOnEachFeature";

import {
  getRandomColor,
  definedColorCircleMarker,
} from "../../Icons/customIcons";

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
      const load =
        newLayerItem.geometry === "Point"
          ? async () => {
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
            }
          : async () => {
              return geoJSON(geojsonData, {
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

      return { load: load, newLayerItem: newLayerItem };
    } else {
      return { load: undefined, newLayerItem: newLayerItem };
    }
  } else {
    return { load: undefined, newLayerItem: newLayerItem };
  }
};

export default LoadGeoserverGeoJSON;
