import { BiBody } from "react-icons/bi";

import { MapControl } from "@components/Pages/MapPage/Map/Controls/MapControl";
import { useStreetViewStore } from "@/stores/useStreetViewStore";

const StreetView = () => {
  const {
    isStreetViewActive,
    activeStreetView,
    deactiveStreetView
  } = useStreetViewStore((state) => state);

  const handleClick = () => {
    if (isStreetViewActive) {
      deactiveStreetView();
    } else {
      activeStreetView();
    }
  };

  return (
    <MapControl active={isStreetViewActive} onClick={handleClick}>
      <BiBody className="h-4 w-4" />
    </MapControl>
  );
};

export default StreetView;
