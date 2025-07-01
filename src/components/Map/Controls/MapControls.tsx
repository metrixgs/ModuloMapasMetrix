import { useEffect, useRef } from "react";

import { DomEvent } from "leaflet";

import Fullscreen from "@components/Map/Controls/Fullscreen/Fullscreen";
import Layers from "@components/Map/Controls/Layers/Layers";
import Bdd from "@components/Map/Controls/Bdd/Bdd";
import Filters from "@components/Map/Controls/Filters/Filters";
import Draw from "@components/Map/Controls/Draw/Draw";
import Location from "@components/Map/Controls/Location/Location";
import Share from "@components/Map/Controls/Share/Share";
import Zoom from "@components/Map/Controls/Zoom/Zoom";

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
      <Draw />
      <Location />
      <Share />
      <Zoom />
    </div>
  );
};

export default MapControls;
