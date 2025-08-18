import type { GridLayerItem } from "@/types/Stores/LayersManager";

import L from "leaflet";

import { getRandomColor } from "../../Icons/customIcons";

import GridClickEvent from "../Events/GridClickEvent";

const LoadGeoJSONGrid = async (layerItem: GridLayerItem) => {
  const { source } = layerItem;
  const newLayerItem = { ...layerItem };

  if (source.sourceType === "generated") {
    if (source.geojson) {
      const geojsonData = source.geojson;

      const load = async () => {
        const color = getRandomColor();
        const vectorGrid = L.vectorGrid
          .slicer(geojsonData, {
            // rendererFactory: L.svg.tile,
            minZoom: 1,
            maxZoom: 20,
            interactive: true,
            vectorTileLayerStyles: {
              sliced: {
                color: color,
                fill: true,
                fillColor: color,
              },
            }
          }).on("click", (e) => console.log(e));
        
        console.log(vectorGrid)

        return vectorGrid;
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

export default LoadGeoJSONGrid;
