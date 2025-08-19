import type { Symbology } from "@/types/Stores/LayersManager";

interface LineStringProps {
  initialSymbology?: Symbology;
  onSymbologyChange?: (newSymbology: Symbology) => void;
}

const LineString = ({}: LineStringProps) => {
  return (
    <div>LineString</div>
  )
}

export default LineString;