import type { GeoJSONLayerItem } from "@/types/Stores/LayersManager";

import { geoJSON, marker, type PathOptions } from "leaflet";

import { GetGeoJSONLayer } from "@/services/Geoserver/GetGeoJSONLayer";

import { customOnEachFeature } from "../Behaviors/customOnEachFeature";

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
      const defaultStyle: PathOptions = {
        stroke: true,
        weight: 0.5,
        opacity: 1.0,
        color: "#267E26",
        fill: true,
        fillColor: "#267E26",
        fillOpacity: 0.2
      };

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
                style: defaultStyle,
              });
            };

      newLayerItem.columns = geojsonData.features[0].properties
        ? Object.keys(geojsonData.features[0].properties).map((f) => ({
            header: f,
            accessorKey: f,
          }))
        : undefined;
      if (newLayerItem.geometry !== "Point") {
        newLayerItem.symbology = {
          type: "simple",
          symbology: defaultStyle,
        };
      }

      return { load: load, newLayerItem: newLayerItem };
    } else {
      return { load: undefined, newLayerItem: newLayerItem };
    }
  } else {
    return { load: undefined, newLayerItem: newLayerItem };
  }
};

export default LoadGeoserverGeoJSON;
