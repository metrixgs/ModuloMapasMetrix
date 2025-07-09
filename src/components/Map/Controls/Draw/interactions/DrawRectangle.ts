import type { Map } from "leaflet";

const DrawRectangle = (map: Map) => {
  map.pm.enableDraw("Rectangle", {
    snappable: true,
    snapDistance: 20,
  });
};

export default DrawRectangle;
