import { useEffect } from "react";
import { tileLayer } from "leaflet";

import useMapLayer from "@/hooks/useMapLayer";

import { LAYERS } from "@/config.map";

const Jawg = () => {
  const load = async () => {
    return tileLayer("https://tile.jawg.io/6ce62bcb-c195-4d31-a3ce-421b1d40f3bd/{z}/{x}/{y}{r}.png?access-token=xpGCLKVCsTyKo9B2QbcI9mKUWCpJdS4PEpT1rsVCeZoENPdujT3KjjiEe9YLIwCO", {
      maxZoom: 19,
    });
  }

  const { loadLayer } = useMapLayer({
    info: LAYERS.jawg,
    loadFunction: load,
  });

  useEffect(() => {
    loadLayer();
  }, [loadLayer]);

  return null;
};

export default Jawg;
