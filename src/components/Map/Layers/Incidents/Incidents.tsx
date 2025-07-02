import { useEffect, useRef } from "react";

import { createRoot } from "react-dom/client";

import { I18nextProvider } from "react-i18next";

import { geoJson, marker, popup } from "leaflet";

import i18next from "@/translations/index";

import { LAYERS } from "@/config.map";

import { ReadIncidents } from "@/services/Incidents/ReadIncidents";

import { json2geojsonPoint } from "@/utils/geometryUtils";

import useMapLayer from "@/hooks/useMapLayer";

import { customMarker } from "@components/Map/Icons/customIcons";

import IncidentPopup from "@components/Map/Layers/Incidents/IncidentPopup";

import "./IncidentPopup.css";

import HandleIncidentsLoadEvent from "./Events/IncidentsLoadEvent";

const Incidents = () => {
  const ref = useRef<boolean>(false);

  const load = async () => {
    const incidents = await ReadIncidents();
    const geojson = json2geojsonPoint(incidents as object[], "lat", "lng");
    const layer = geoJson(geojson, {
      pointToLayer: (_feature, latlng) => {
        return marker(latlng, { icon: customMarker });
      },
      onEachFeature: (feature, layer) => {
        const popupClass = popup({
          closeButton: false,
        });

        const popupElement = document.createElement("div");
        const root = createRoot(popupElement);
        root.render(
          <I18nextProvider i18n={i18next}>
            <IncidentPopup incident={feature.properties} popup={popupClass} />
          </I18nextProvider>
        );

        popupClass.setContent(popupElement);

        layer.on("click", (e) => {
          popupClass.setLatLng(e.latlng).openOn(e.target._map);
        });
      },
    });

    // Events
    layer.on("add", HandleIncidentsLoadEvent);
    return layer;
  };

  const { loadLayer } = useMapLayer({
    info: LAYERS.incidents,
    loadFunction: load,
  });

  useEffect(() => {
    if (ref.current) return;
    ref.current = true;
    loadLayer();
  }, [loadLayer]);

  return null;
};

export default Incidents;
