import type { LeafletMouseEvent } from "leaflet";

import throttle from "lodash.throttle";

import { currentCoordsId } from "@/config.id";

export const updateMouseState = throttle((e: LeafletMouseEvent) => {
  const currentCoords = document.getElementById(currentCoordsId);
  if (currentCoords) {
    currentCoords.innerHTML = `${e.latlng.lat.toFixed(6)}, ${e.latlng.lng.toFixed(6)}`
  }
}, 50);

// export const updateMouseState = (e: LeafletMouseEvent) => {
//   const currentCoords = document.getElementById(currentCoordsId);
//   if (currentCoords) {
//     currentCoords.innerHTML = `${e.latlng.lat.toFixed(6)}, ${e.latlng.lng.toFixed(6)}`
//   }
// };
