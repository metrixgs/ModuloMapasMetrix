import type { Symbology } from "@/types/Stores/LayersManager";

interface PointProps {
  initialSymbology?: Symbology;
  onSymbologyChange?: (newSymbology: Symbology) => void;
}

const Point = ({}: PointProps) => {
  return (
    <div>Point</div>
  )
}

export default Point;