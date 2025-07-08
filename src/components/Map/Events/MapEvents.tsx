import MouseMove from "./MouseMove/MouseMove";
import MoveEnd from "./MoveEnd/MoveEnd";
import LocationFound from "./LocationFound/LocationFound";
import Click from "./Click/Click";

const MapEvents = () => {
  return (
    <>
      <MouseMove />
      <MoveEnd />
      <LocationFound />
      <Click />
    </>
  );
};

export default MapEvents;
