import { useEffect } from "react";
import { tileLayer } from "leaflet";

import { LAYERS } from "@/config.map";
import useMapLayer from "@/hooks/useMapLayer";

const CartoDBpositron = () => {

  const load = async () => {
    return tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    });
  }

  const { loadLayer } = useMapLayer({
    info: LAYERS.positron,
    loadFunction: load
  });

  useEffect(() => {
    loadLayer();
  }, [loadLayer]);

  return null;
};

export default CartoDBpositron;