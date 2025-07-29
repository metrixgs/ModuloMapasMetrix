import { useEffect } from "react";
import { tileLayer } from "leaflet";

import { LAYERS } from "@/config.map";
import { useMapLayersStore } from "@/stores/useMapLayersStore";

const ESRISatellite = () => {
  const append = useMapLayersStore((state) => state.append);

  const load = async () => {
    return tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
      attribution: "ESRI",
      maxZoom: 20
    });
  }

  useEffect(() => {
    append(LAYERS.esri, load);
  }, [append]);

  return null;
};

export default ESRISatellite;