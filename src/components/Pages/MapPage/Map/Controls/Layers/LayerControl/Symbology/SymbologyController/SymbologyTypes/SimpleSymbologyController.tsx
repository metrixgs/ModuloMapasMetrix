import type { PathOptions } from "leaflet";
import type { SymbologyControllerProps } from "@/types/Stores/LayersManager";

import { HelperText } from "flowbite-react";
import { useTranslation } from "react-i18next";

import PolygonPathOptions from "./SymbologyGeometries/PolygonPathOptions";
import Point from "./SymbologyGeometries/Point";
import LineString from "./SymbologyGeometries/LineString";

const SimpleSymbologyController = ({
  layerGeometry,
  initialSymbology,
  onSymbologyChange,
}: SymbologyControllerProps) => {
  const { t } = useTranslation("global");
  const tref = "body.controls.layers.tabs.symbology.controller.type-simple";

  const simpleSymbology = initialSymbology?.type === "simple" ? initialSymbology : undefined;

  const handlePolygonSymbologyChange = (newPathOptions: PathOptions) => {
    if (onSymbologyChange) {
      onSymbologyChange({
        type: "simple",
        symbology: newPathOptions
      })
    }
    console.log(newPathOptions);
  }

  return (
    <div className="flex flex-col gap-2">
      <HelperText>{t(tref + ".help")}</HelperText>
      {
        {
          Point: (
            <Point
              initialSymbology={initialSymbology}
              onSymbologyChange={onSymbologyChange}
            />
          ),
          LineString: (
            <LineString
              initialSymbology={initialSymbology}
              onSymbologyChange={onSymbologyChange}
            />
          ),
          Polygon: (
            <PolygonPathOptions
              initialPathOptions={simpleSymbology?.symbology}
              onPathOptionsChange={handlePolygonSymbologyChange}
            />
          ),
        }[layerGeometry]
      }
    </div>
  );
};

export default SimpleSymbologyController;
