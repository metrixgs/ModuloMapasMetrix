import type { TileLayerItem } from "@/types/Stores/LayersManager";
import { tileLayer } from "leaflet";

const LoadTileLayer = async (layerItem: TileLayerItem) => {
  const { source } = layerItem;
  if (source.sourceType === "tile") {
    const load = async () => {
      return tileLayer(source.endpoint, {
        maxZoom: 20,
      });
    };

    return {
      load: load,
      newLayerItem: layerItem
    };
  } else {
    return {
      load: undefined,
      newLayerItem: layerItem
    };
  }
};

export default LoadTileLayer;
