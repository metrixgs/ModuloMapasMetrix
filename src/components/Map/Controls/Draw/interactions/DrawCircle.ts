import type { Map } from "leaflet";

const DrawCircle = (map: Map) => {
  map.pm.enableDraw("Circle", {
    snappable: true,
    snapDistance: 20,
  });
};

export default DrawCircle;