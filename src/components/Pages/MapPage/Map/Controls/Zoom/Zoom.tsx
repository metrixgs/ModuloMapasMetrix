import { BiPlus, BiMinus } from "react-icons/bi";

import { MapControl, MapControlGroup } from "@components/Pages/MapPage/Map/Controls/MapControl";
import { useMapStore } from "@/stores/useMapStore";

const Zoom = () => {
  const { map } = useMapStore((state) => state);

  const zoomIn = () => {
    map?.zoomIn();
  }

  const zoomOut = () => {
    map?.zoomOut();
  }

  return (
    <MapControlGroup>
      <MapControl onClick={zoomIn}>
        <BiPlus className="h-4 w-4" />
      </MapControl>
      <MapControl onClick={zoomOut}>
        <BiMinus className="h-4 w-4" />
      </MapControl>
    </MapControlGroup>
  )
}

export default Zoom;