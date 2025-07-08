import MouseMove from "./MouseMove/MouseMove";
import MoveEnd from "./MoveEnd/MoveEnd";
import LocationFound from "./LocationFound/LocationFound";

const MapEvents = () => {
  return (
    <>
      <MouseMove />
      <MoveEnd />
      <LocationFound />
    </>
  );
};

export default MapEvents;
