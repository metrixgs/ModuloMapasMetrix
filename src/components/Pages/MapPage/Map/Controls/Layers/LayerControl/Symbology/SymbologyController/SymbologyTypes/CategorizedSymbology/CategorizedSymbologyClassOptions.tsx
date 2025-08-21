import type { PathOptions } from "leaflet";

import { type Geometry } from "@/types/Stores/LayersManager";

import PointPathOptions from "../SymbologyGeometries/PointPathOptions";
import LineStringPathOptions from "../SymbologyGeometries/LineStringPathOptions";
import PolygonPathOptions from "../SymbologyGeometries/PolygonPathOptions";

interface CategorizedSymbologyClassOptionsProps {
  classIndex: number;
  layerGeometry: Geometry;
  initialPathOptions?: PathOptions;
  onClassOptionsChange: (
    classIndex: number,
    newClassOptions: PathOptions
  ) => void;
}

const CategorizedSymbologyClassOptions = ({
  classIndex,
  layerGeometry,
  initialPathOptions,
  onClassOptionsChange,
}: CategorizedSymbologyClassOptionsProps) => {
  const onPathOptionsChange = (newPathOptions: PathOptions) => {
    onClassOptionsChange(classIndex, newPathOptions);
  };

  const OptionsComponent = {
    Point: (
      <PointPathOptions
        initialPathOptions={initialPathOptions}
        onPathOptionsChange={onPathOptionsChange}
      />
    ),
    LineString: (
      <LineStringPathOptions
        initialPathOptions={initialPathOptions}
        onPathOptionsChange={onPathOptionsChange}
      />
    ),
    Polygon: (
      <PolygonPathOptions
        initialPathOptions={initialPathOptions}
        onPathOptionsChange={onPathOptionsChange}
      />
    ),
  }[layerGeometry];

  return OptionsComponent;
};

export default CategorizedSymbologyClassOptions;
