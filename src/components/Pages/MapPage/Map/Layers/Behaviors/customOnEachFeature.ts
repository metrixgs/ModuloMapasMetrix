import type { Feature } from "geojson";
import { popup, type Layer } from "leaflet";
import { createElement } from "react";

import { createRoot } from "react-dom/client";

import { I18nextProvider } from "react-i18next";
import i18next from "@/translations/index";

import MetrixPopup from "../CustomPopup/MetrixPopup";
import DefaultPopup from "../CustomPopup/DefaultPopup";

export const customOnEachFeature = (
  layerId: string,
  feature: Feature,
  layer: Layer
) => {
  const onEachFeature = (feature: Feature, layer: Layer) => {
    const popupClass = popup({
      closeButton: false,
    });

    const popupElement = document.createElement("div");
    const root = createRoot(popupElement);

    switch (layerId) {
      case "metrix-incidents":
        root.render(
          createElement(
            I18nextProvider,
            { i18n: i18next },
            createElement(MetrixPopup, {
              data: feature.properties,
              popup: popupClass,
            })
          )
        );
        break;
      default:
        root.render(
          createElement(
            I18nextProvider,
            { i18n: i18next },
            createElement(DefaultPopup, {
              data: feature.properties,
              popup: popupClass,
            })
          )
        );
        break;
    }

    popupClass.setContent(popupElement);

    layer.on("click", (e) => {
      popupClass.setLatLng(e.latlng).openOn(e.target._map);
    });
  };

  return onEachFeature(feature, layer);
};
