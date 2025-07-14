import { useEffect } from "react";
import { tileLayer } from "leaflet";

import { LAYERS } from "@/config.map";
import { useMapLayersStore } from "@/stores/useMapLayersStore";

const Jawg = () => {
  const append = useMapLayersStore((state) => state.append);

  const load = async () => {
    return tileLayer("https://tile.jawg.io/6ce62bcb-c195-4d31-a3ce-421b1d40f3bd/{z}/{x}/{y}{r}.png?access-token=xpGCLKVCsTyKo9B2QbcI9mKUWCpJdS4PEpT1rsVCeZoENPdujT3KjjiEe9YLIwCO", {
      maxZoom: 19,
    });
  }

  useEffect(() => {
    append(LAYERS.jawg, load);
  }, [append]);

  return null;
};

export default Jawg;
