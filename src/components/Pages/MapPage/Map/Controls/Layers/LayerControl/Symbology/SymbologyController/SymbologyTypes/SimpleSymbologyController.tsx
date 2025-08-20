import type { PathOptions } from "leaflet";
import type { SymbologyControllerProps } from "@/types/Stores/LayersManager";

import { HelperText } from "flowbite-react";
import { useTranslation } from "react-i18next";

import PolygonPathOptions from "./SymbologyGeometries/PolygonPathOptions";
import PointPathOptions from "./SymbologyGeometries/PointPathOptions";
import LineStringPathOptions from "./SymbologyGeometries/LineStringPathOptions";

const SimpleSymbologyController = ({
  layerGeometry,
  initialSymbology,
  onSymbologyChange,
}: SymbologyControllerProps) => {
  const { t } = useTranslation("global");
  const tref = "body.controls.layers.tabs.symbology.controller.type-simple";

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
    <div className="flex flex-col gap-2">
      <HelperText>{t(tref + ".help")}</HelperText>
      {
        {
          Point: (
            <PointPathOptions
              initialPathOptions={simpleSymbology?.symbology}
              onPathOptionsChange={handleSymbologyChange}
            />
          ),
          LineString: (
            <LineStringPathOptions
              initialPathOptions={simpleSymbology?.symbology}
              onPathOptionsChange={handleSymbologyChange}
            />
          ),
          Polygon: (
            <PolygonPathOptions
              initialPathOptions={simpleSymbology?.symbology}
              onPathOptionsChange={handleSymbologyChange}
            />
          ),
        }[layerGeometry]
      }
    </div>
  );
};

export default SimpleSymbologyController;
