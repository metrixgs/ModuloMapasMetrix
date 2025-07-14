import { useEffect } from "react";
import { tileLayer } from "leaflet";

import { LAYERS } from "@/config.map";
import { useMapLayersStore } from "@/stores/useMapLayersStore";

const Osm = () => {
  const append = useMapLayersStore((state) => state.append);

  const load = async () => {
    return tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });
  };

  useEffect(() => {
    append(LAYERS.osm, load);
  }, [append]);

  return null;
};

export default Osm;
