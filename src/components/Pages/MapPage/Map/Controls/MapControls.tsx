import { useEffect, useRef } from "react";

import { DomEvent } from "leaflet";

import Fullscreen from "@components/Pages/MapPage/Map/Controls/Fullscreen/Fullscreen";
import Layers from "@components/Pages/MapPage/Map/Controls/Layers/Layers";
import Bdd from "@components/Pages/MapPage/Map/Controls/Bdd/Bdd";
import Filters from "@components/Pages/MapPage/Map/Controls/Filters/Filters";
import StreetView from "@components/Pages/MapPage/Map/Controls/StreetView/StreetView";
import Draw from "@components/Pages/MapPage/Map/Controls/Draw/Draw";
import Location from "@components/Pages/MapPage/Map/Controls/Location/Location";
import Share from "@components/Pages/MapPage/Map/Controls/Share/Share";
import Zoom from "@components/Pages/MapPage/Map/Controls/Zoom/Zoom";

// Debug
import Screenshot_ from "./Screenshot_/Screenshot_";

const MapControls = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      DomEvent.disableClickPropagation(ref.current);
      DomEvent.disableScrollPropagation(ref.current);
    }
  }, []);

  return (
    <div
      ref={ref}
      className="absolute h-full right-0 mr-2 my-2 flex flex-col gap-3 z-[1000] pointer-events-auto"
    >
      <Fullscreen />
      <Layers />
      <Bdd />
      <Filters />
      <StreetView />
      <Draw />
      <Location />
      <Share />
      <Zoom />
      <Screenshot_/>
    </div>
  );
};

export default MapControls;
