import React from "react";
import { createRoot } from "react-dom/client";

import { I18nextProvider } from "react-i18next";

import { create } from "zustand";

import { circle, circleMarker, popup } from "leaflet";

import { useMapStore } from "@/stores/useMapStore";

import type { UserLocationStore } from "@/types/Stores";

import LocationPopup from "@components/Pages/MapPage/Map/Controls/Location/LocationPopup";

import i18next from "@/translations/index";

export const useUserLocationStore = create<UserLocationStore>((set, get) => ({
  location: undefined,
  loading: undefined,
  accuracyLayer: undefined,
  centerLayer: undefined,
  setLocation: (e) => {
    const { accuracyLayer, centerLayer } = get();
    const map = useMapStore.getState().map;

    if (accuracyLayer) accuracyLayer.remove();
    if (centerLayer) centerLayer.remove();

    if (map) {
      const { latlng, accuracy } = e;
      const accuracyLayer_ = circle(latlng, {
        radius: accuracy,
        color: "#136AEC",
        fillColor: "#136AEC",
        fillOpacity: 0.2,
        stroke: false,
      }).addTo(map);

      const centerLayer_ = circleMarker(latlng, {
        radius: 6,
        color: "#2A93EE",
        fillColor: "#2A93EE",
        fillOpacity: 1,
      }).addTo(map);

      // Custom react element for popup
      const popupClass = popup({ closeButton: false });
      const popupElement = document.createElement("div");
      const root = createRoot(popupElement);
      root.render(
        React.createElement(
          I18nextProvider,
          { i18n: i18next },
          React.createElement(LocationPopup, {
            location: e,
            popup: popupClass,
            layers: [centerLayer_, accuracyLayer_],
          })
        )
      );
      popupClass.setContent(popupElement);
      accuracyLayer_.bindPopup(popupClass);
      centerLayer_.bindPopup(popupClass);

      map.flyToBounds(accuracyLayer_.getBounds());

      set({
        location: e,
        accuracyLayer: accuracyLayer_,
        centerLayer: centerLayer_,
      });
    }
  },
  startSearch: () => set({ loading: true }),
  endSearch: () => set({ loading: false }),
  clearLocation: () => {},
}));
