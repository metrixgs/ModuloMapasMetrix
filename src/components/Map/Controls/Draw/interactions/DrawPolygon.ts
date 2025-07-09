import type { Map } from "leaflet";

const DrawPolygon = (map: Map) => {
  map.pm.enableDraw("Polygon", {
    snappable: true,
    snapDistance: 20,
  });
};

export default DrawPolygon;