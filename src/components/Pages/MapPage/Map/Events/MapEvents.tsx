import MouseMove from "./MouseMove/MouseMove";
import MoveEnd from "./MoveEnd/MoveEnd";
import LocationFound from "./LocationFound/LocationFound";
import Click from "./Click/Click";
import LayerAdd from "./LayerAdd/LayerAdd";
import LayerRemove from "./LayerRemove/LayerRemove";

import GeomanCreate from "./GeomanCreate/GeomanCreate";
import GeomanEdit from "./GeomanEdit/GeomanEdit";
import GeomanRemove from "./GeomanRemove/GeomanRemove";

const MapEvents = () => {
  return (
    <>
      <MouseMove />
      <MoveEnd />
      <LocationFound />
      <Click />
      <LayerAdd />
      <LayerRemove />
      <GeomanCreate />
      <GeomanEdit />
      <GeomanRemove />
    </>
  );
};

export default MapEvents;
