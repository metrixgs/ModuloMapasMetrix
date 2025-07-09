import MouseMove from "./MouseMove/MouseMove";
import MoveEnd from "./MoveEnd/MoveEnd";
import LocationFound from "./LocationFound/LocationFound";
import Click from "./Click/Click";

import GeomanCreate from "./GeomanCreate/GeomanCreate";

const MapEvents = () => {
  return (
    <>
      <MouseMove />
      <MoveEnd />
      <LocationFound />
      <Click />
      <GeomanCreate />
    </>
  );
};

export default MapEvents;
