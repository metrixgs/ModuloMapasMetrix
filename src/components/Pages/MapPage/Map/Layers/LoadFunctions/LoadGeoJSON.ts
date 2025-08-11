import type { GeoJSONLayerItem } from "@/types/Stores/LayersManager";

import { geoJSON, marker } from "leaflet";

import { extractGeoJSONGeometry } from "@/utils/geometryUtils";

import {
  getRandomColor,
  definedColorCircleMarker,
} from "../../Icons/customIcons";

const LoadGeoJSON = async (layerItem: GeoJSONLayerItem) => {
  const { source } = layerItem;
  const newLayerItem = { ...layerItem };

  if (source.sourceType === "generated") {
    if (source.geojson) {
      const geojsonData = source.geojson;
      const geometry = extractGeoJSONGeometry(geojsonData);

      const load = async () => {
        const color = getRandomColor();
        return geoJSON(geojsonData, {
          pmIgnore: true,
          ...(geometry === "Point" && {
            pointToLayer: (_feature, latlng) => {
              return marker(latlng, {
                icon: definedColorCircleMarker(color),
                pmIgnore: true,
              });
            },
          }),
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

export default LoadGeoJSON;
