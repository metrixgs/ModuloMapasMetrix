import type { GeoJSONLayerItem } from "@/types/Stores/LayersManager";
import { geoJSON } from "leaflet";

import { GetGeoJSONLayer } from "@/services/Geoserver/GetGeoJSONLayer";

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
      const load = async () => {
        return geoJSON(geojsonData);
      };

      newLayerItem.columns = Object.keys(geojsonData.features[0].properties).map(
        (f) => ({
          header: f,
          accessorKey: f,
        })
      );

      return { load: load, newLayerItem: newLayerItem };
    } else {
      return { load: undefined, newLayerItem: newLayerItem };
    }
  } else {
    return { load: undefined, newLayerItem: newLayerItem };
  }
};

export default LoadGeoserverGeoJSON;
