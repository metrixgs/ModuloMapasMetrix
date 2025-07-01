import { useEffect } from "react";
import { tileLayer } from "leaflet";

import useMapLayer from "@/hooks/useMapLayer";

import { LAYERS } from "@/config.map";

const Osm = () => {
  const load = async () => {
    return tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });
  };

  const { loadLayer } = useMapLayer({
    info: LAYERS.osm,
    loadFunction: load
  })

  useEffect(() => {
    loadLayer();
  }, [loadLayer]);

  return null;
};

export default Osm;
