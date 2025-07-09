import { create } from "zustand";

import { geoJSON } from "leaflet";

import type { SpatialFilterStore } from "@/types/Stores";

import { useMapStore } from "./useMapStore";

export const useSpatialFilterStore = create<SpatialFilterStore>((set, get) => ({
  setCountry: (country) => {
    set({
      country: country,
      state: undefined,
      municipality: undefined,
      delegation: undefined,
      zip: undefined,
      hood: undefined,
      square: undefined,
      property: undefined,
    });
  },
  setState: (state, stateLayer) => {
    const map = useMapStore.getState().map;
    const {
      stateLayer: stateLayer_,
      municipalityLayer,
      delegationLayer,
      zipLayer,
      hoodLayer,
      squareLayer,
      propertyLayer,
    } = get();

    let newStateLayer;

    if (stateLayer_) stateLayer_.remove();
    if (municipalityLayer) municipalityLayer.remove();
    if (delegationLayer) delegationLayer.remove();
    if (zipLayer) zipLayer.remove();
    if (hoodLayer) hoodLayer.remove();
    if (squareLayer) squareLayer.remove();
    if (propertyLayer) propertyLayer.remove();

    if (stateLayer && map) {
      newStateLayer = geoJSON(stateLayer, {
        pmIgnore: true,
        style: () => {
          return {
            fillColor: "#267E26",
            stroke: true,
            weight: 0.5,
            color: "#267E26",
            opacity: 1.0,
          };
        },
      }).addTo(map);
      map.flyToBounds(newStateLayer.getBounds());
    }

    set({
      state: state,
      stateLayer: newStateLayer,
      municipality: undefined,
      municipalityLayer: undefined,
      delegation: undefined,
      delegationLayer: undefined,
      zip: undefined,
      zipLayer: undefined,
      hood: undefined,
      hoodLayer: undefined,
      square: undefined,
      squareLayer: undefined,
      property: undefined,
      propertyLayer: undefined,
    });
  },
  setMunicipality: (municipality, municipalityLayer) => {
    const map = useMapStore.getState().map;
    const {
      municipalityLayer: municipalityLayer_,
      delegationLayer,
      zipLayer,
      hoodLayer,
      squareLayer,
      propertyLayer,
    } = get();

    let newMunicipalityLayer;

    if (municipalityLayer_) municipalityLayer_.remove();
    if (delegationLayer) delegationLayer.remove();
    if (zipLayer) zipLayer.remove();
    if (hoodLayer) hoodLayer.remove();
    if (squareLayer) squareLayer.remove();
    if (propertyLayer) propertyLayer.remove();

    if (municipalityLayer && map) {
      newMunicipalityLayer = geoJSON(municipalityLayer, {
        pmIgnore: true,
        style: () => {
          return {
            fillColor: "#7BC11D",
            stroke: true,
            weight: 0.5,
            color: "#7BC11D",
            opacity: 1.0,
          };
        },
      }).addTo(map);
      map.flyToBounds(newMunicipalityLayer.getBounds());
    }

    set({
      municipality: municipality,
      municipalityLayer: newMunicipalityLayer,
      delegation: undefined,
      delegationLayer: undefined,
      zip: undefined,
      zipLayer: undefined,
      hood: undefined,
      hoodLayer: undefined,
      square: undefined,
      squareLayer: undefined,
      property: undefined,
      propertyLayer: undefined,
    });
  },
  setDelegation: (delegation) =>
    set({
      delegation: delegation,
      zip: undefined,
      hood: undefined,
      square: undefined,
      property: undefined,
    }),
  setZip: (zip) =>
    set({
      zip: zip,
      hood: undefined,
      square: undefined,
      property: undefined,
    }),
  setHood: (hood, hoodLayer) => {
    const map = useMapStore.getState().map;
    const { hoodLayer: hoodLayer_, squareLayer, propertyLayer } = get();

    let newHoodLayer;

    if (hoodLayer_) hoodLayer_.remove();
    if (squareLayer) squareLayer.remove();
    if (propertyLayer) propertyLayer.remove();

    if (hoodLayer && map) {
      newHoodLayer = geoJSON(hoodLayer, {
        pmIgnore: true,
        style: () => {
          return {
            fillColor: "#000000",
            stroke: true,
            weight: 0.5,
            color: "#000000",
            opacity: 1.0,
          };
        },
      }).addTo(map);
      map.flyToBounds(newHoodLayer.getBounds());
    }

    set({
      hood: hood,
      hoodLayer: newHoodLayer,
      square: undefined,
      squareLayer: undefined,
      property: undefined,
      propertyLayer: undefined,
    });
  },
  setSquare: (square, squareLayer) => {
    const map = useMapStore.getState().map;
    const { squareLayer: squareLayer_, propertyLayer } = get();

    let newSquareLayer;

    if (squareLayer_) squareLayer_.remove();
    if (propertyLayer) propertyLayer.remove();

    if (squareLayer && map) {
      newSquareLayer = geoJSON(squareLayer, {
        pmIgnore: true,
        style: () => {
          return {
            fillColor: "#000000",
            stroke: true,
            weight: 0.5,
            color: "#000000",
            opacity: 1.0,
          };
        },
      }).addTo(map);
      map.flyToBounds(newSquareLayer.getBounds());
    }

    set({
      square: square,
      squareLayer: newSquareLayer,
      property: undefined,
      propertyLayer: undefined,
    });
  },
  setProperty: (property, propertyLayer) => {
    const map = useMapStore.getState().map;
    const { propertyLayer: propertyLayer_ } = get();

    let newPropertyLayer;

    if (propertyLayer_) propertyLayer_.remove();

    if (propertyLayer && map) {
      newPropertyLayer = geoJSON(propertyLayer, {
        pmIgnore: true,
        style: () => {
          return {
            fillColor: "#000000",
            stroke: true,
            weight: 0.5,
            color: "#000000",
            opacity: 1.0,
          };
        },
      }).addTo(map);
      map.flyToBounds(newPropertyLayer.getBounds());
    }

    set({
      property: property,
      propertyLayer: newPropertyLayer,
    });
  },
  clear: () => {
    const {
      countryLayer,
      stateLayer,
      municipalityLayer,
      delegationLayer,
      zipLayer,
      hoodLayer,
      squareLayer,
      propertyLayer,
    } = get();

    if (countryLayer) countryLayer.remove();
    if (stateLayer) stateLayer.remove();
    if (municipalityLayer) municipalityLayer.remove();
    if (delegationLayer) delegationLayer.remove();
    if (zipLayer) zipLayer.remove();
    if (hoodLayer) hoodLayer.remove();
    if (squareLayer) squareLayer.remove();
    if (propertyLayer) propertyLayer.remove();

    set({
      country: undefined,
      countryLayer: undefined,
      state: undefined,
      stateLayer: undefined,
      municipality: undefined,
      municipalityLayer: undefined,
      delegation: undefined,
      delegationLayer: undefined,
      zip: undefined,
      zipLayer: undefined,
      hood: undefined,
      hoodLayer: undefined,
      square: undefined,
      squareLayer: undefined,
      property: undefined,
      propertyLayer: undefined,
    });
  },
}));
