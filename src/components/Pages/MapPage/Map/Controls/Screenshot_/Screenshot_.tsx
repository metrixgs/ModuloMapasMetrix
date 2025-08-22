import { BiScreenshot } from "react-icons/bi";

import leafletimage from "leaflet-image";

import { MapControl } from "../MapControl";
import { useMapStore } from "@/stores/useMapStore";

const Screenshot_ = () => {
  const map = useMapStore((state) => state.map);
  const shot = () => {
    leafletimage(map, (err, canvas) => {
      if (err) {
        alert("Error al capturar el mapa");
        return;
      }
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "mapa.png";
      link.click();
    });
  };
  return (
    <MapControl onClick={shot}>
      <BiScreenshot className="h-4 w-4" />
    </MapControl>
  );
};

export default Screenshot_;
