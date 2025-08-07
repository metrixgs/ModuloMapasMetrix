import type { TileLayerItem } from "@/types/Stores/LayersManager";
import { tileLayer } from "leaflet";

const LoadTileLayer = async (layerItem: TileLayerItem) => {
  return async () => {
    return tileLayer(layerItem.endpoint, {
      maxZoom: 20,
    });
  };
};

export default LoadTileLayer;
