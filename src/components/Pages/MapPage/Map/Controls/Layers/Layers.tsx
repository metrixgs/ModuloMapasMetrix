import { useState } from "react";

// import { useTranslation } from "react-i18next";

import { BiLayer } from "react-icons/bi";

import { MapControl } from "@components/Pages/MapPage/Map/Controls/MapControl";
import LayerControl from "./LayerControl/LayerControl";

const Layers = () => {
  // const { t } = useTranslation("global");

  const [active, setActive] = useState(false);

  const closeLayerControl = () => {
    setActive(false);
  };

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <>
      <MapControl active={active} onClick={handleClick}>
        <BiLayer className="h-4 w-4" />
      </MapControl>
      <LayerControl open={active} onClose={closeLayerControl} />
    </>
  );
};

export default Layers;
