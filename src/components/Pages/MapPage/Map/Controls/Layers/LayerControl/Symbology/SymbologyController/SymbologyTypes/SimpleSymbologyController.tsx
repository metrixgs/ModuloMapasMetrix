import type { PathOptions } from "leaflet";
import type { SymbologyControllerProps } from "@/types/Stores/LayersManager";

// import { useTranslation } from "react-i18next";

import PolygonPathOptions from "./SymbologyGeometries/PolygonPathOptions";
import PointPathOptions from "./SymbologyGeometries/PointPathOptions";
import LineStringPathOptions from "./SymbologyGeometries/LineStringPathOptions";

import {
  DefaultPointStyle,
  DefaultLineStringStyle,
  DefaultPolygonStyle,
} from "@/config.map";

const SimpleSymbologyController = ({
  layerGeometry,
  initialSymbology,
  onSymbologyChange,
}: SymbologyControllerProps) => {
  // const { t } = useTranslation("global");
  // const tref = "body.controls.layers.tabs.symbology.controller.type-simple";

  const simpleSymbology =
    initialSymbology?.type === "simple" ? initialSymbology : undefined;

  const handleSymbologyChange = (newPathOptions: PathOptions) => {
    if (onSymbologyChange) {
      onSymbologyChange({
        type: "simple",
        symbology: newPathOptions,
      });
    }
  };

  return (
    <div className="grow flex flex-col gap-2">
      {
        {
          Point: (
            <PointPathOptions
              initialPathOptions={
                simpleSymbology ? simpleSymbology.symbology : DefaultPointStyle
              }
              onPathOptionsChange={handleSymbologyChange}
            />
          ),
          LineString: (
            <LineStringPathOptions
              initialPathOptions={
                simpleSymbology
                  ? simpleSymbology.symbology
                  : DefaultLineStringStyle
              }
              onPathOptionsChange={handleSymbologyChange}
            />
          ),
          Polygon: (
            <PolygonPathOptions
              initialPathOptions={
                simpleSymbology
                  ? simpleSymbology.symbology
                  : DefaultPolygonStyle
              }
              onPathOptionsChange={handleSymbologyChange}
            />
          ),
        }[layerGeometry]
      }
    </div>
  );
};

export default SimpleSymbologyController;
