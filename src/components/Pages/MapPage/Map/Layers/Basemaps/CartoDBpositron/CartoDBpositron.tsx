import { useEffect } from "react";
import { tileLayer } from "leaflet";

import { LAYERS } from "@/config.map";
import { useMapLayersStore } from "@/stores/useMapLayersStore";

const CartoDBpositron = () => {
  const append = useMapLayersStore((state) => state.append);

  const load = async () => {
    return tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    });
  }

  useEffect(() => {
    append(LAYERS.positron, load);
  }, [append]);

  return null;
};

export default CartoDBpositron;