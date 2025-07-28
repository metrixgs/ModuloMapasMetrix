import React from "react";

import type { LeafletMouseEvent } from "leaflet";

import StreetViewContainer from "./StreetViewContainer";

import { useStreetViewStore } from "@/stores/useStreetViewStore";
import { useModalStore } from "@/stores/useModalStore";

const StreetViewEvent = (e: LeafletMouseEvent) => {
  const { isStreetViewActive } = useStreetViewStore.getState();
  const { open, setChildren, setTitle, setSize } = useModalStore.getState();

  if (isStreetViewActive) {
    setTitle("Street View");
    setSize("6xl");
    setChildren(
      React.createElement(StreetViewContainer, {
        center: { lat: e.latlng.lat, lng: e.latlng.lng },
      })
    );
    open();
  }
};

export default StreetViewEvent;
