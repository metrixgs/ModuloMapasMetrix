import type { LeafletMouseEvent } from "leaflet";

import throttle from "lodash.throttle";

import { formatNumber } from "@/utils/numberUtils";

import { currentCoordsId } from "@/config.id";

const UpdateMouseCoordinates = throttle((e: LeafletMouseEvent) => {
  const currentCoords = document.getElementById(currentCoordsId);
  if (currentCoords) {
    currentCoords.innerHTML = `${formatNumber(e.latlng.lat, {
      maximumFractionDigits: 6,
    })} ${formatNumber(e.latlng.lng, { maximumFractionDigits: 6 })}`;
  }
}, 50);

export default UpdateMouseCoordinates;
