import { create } from "zustand";

import { geoJSON } from "leaflet";

import type { SpatialFilterStore } from "@/types/Stores/SpatialFilterStore";
import type { LayerFilterItem } from "@/types/Stores/LayersManager";

import { useMapStore } from "./useMapStore";
import { useMapLayersStore } from "./useMapLayersStore";

import { INITIAL_LAYERS } from "@/config.map";

export const useSpatialFilterStore = create<SpatialFilterStore>((set, get) => ({
  setCountry: async (country, name, countryGeoJSON) => {
    const map = useMapStore.getState().map;
    const {
      countryLayer: countryLayer_,
      stateLayer,
      municipalityLayer,
      delegationLayer,
      zipLayer,
      hoodLayer,
      squareLayer,
      propertyLayer,
    } = get();

    let newCountryLayer;

    if (countryLayer_) countryLayer_.remove();
    if (stateLayer) stateLayer.remove();
    if (municipalityLayer) municipalityLayer.remove();
    if (delegationLayer) delegationLayer.remove();
    if (zipLayer) zipLayer.remove();
    if (hoodLayer) hoodLayer.remove();
    if (squareLayer) squareLayer.remove();
    if (propertyLayer) propertyLayer.remove();

    if (countryGeoJSON && map) {
      newCountryLayer = geoJSON(countryGeoJSON, {
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
      map.flyToBounds(newCountryLayer.getBounds());

      const {
        layerFilter,
        appendFilter,
        assignLayerToGroup
      } = useMapLayersStore.getState();
      const filterId = `${name?.toLowerCase().replaceAll(" ", "-")}-filter-${Object.keys(layerFilter).length + 1}`;
      const filterName = `${name?.toLowerCase()} filter ${Object.keys(layerFilter).length + 1}`;
      const filter: LayerFilterItem = {
        id: filterId,
        name: filterName,
        origin: newCountryLayer,
        target: INITIAL_LAYERS["incidents"].id,
        type: "intersection"
      }

      await appendFilter(filter);
      assignLayerToGroup(filterId, "metrix-filters");
    }

    set({
      country: country,
      countryLayer: newCountryLayer,
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
  setState: async (state, name, stateGeoJSON) => {
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

    if (stateGeoJSON && map) {
      newStateLayer = geoJSON(stateGeoJSON, {
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

      const {
        layerFilter,
        appendFilter,
        assignLayerToGroup
      } = useMapLayersStore.getState();
      const filterId = `${name?.toLowerCase().replaceAll(" ", "-")}-filter-${Object.keys(layerFilter).length + 1}`;
      const filterName = `${name?.toLowerCase()} filter ${Object.keys(layerFilter).length + 1}`;
      const filter: LayerFilterItem = {
        id: filterId,
        name: filterName,
        origin: newStateLayer,
        target: INITIAL_LAYERS["incidents"].id,
        type: "intersection"
      }

      await appendFilter(filter);
      assignLayerToGroup(filterId, "metrix-filters");
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
  setMunicipality: async (municipality, name, municipalityLayer) => {
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

      const {
        layerFilter,
        appendFilter,
        assignLayerToGroup
      } = useMapLayersStore.getState();
      const filterId = `${name?.toLowerCase().replaceAll(" ", "-")}-filter-${Object.keys(layerFilter).length + 1}`;
      const filterName = `${name?.toLowerCase()} filter ${Object.keys(layerFilter).length + 1}`;
      const filter: LayerFilterItem = {
        id: filterId,
        name: filterName,
        origin: newMunicipalityLayer,
        target: INITIAL_LAYERS["incidents"].id,
        type: "intersection"
      }

      await appendFilter(filter);
      assignLayerToGroup(filterId, "metrix-filters");
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
  setDelegation: (delegation, _name, _delegationGeoJSON ) =>
    set({
      delegation: delegation,
      zip: undefined,
      hood: undefined,
      square: undefined,
      property: undefined,
    }),
  setZip: (zip, _name, _zipGeoJSON) =>
    set({
      zip: zip,
      hood: undefined,
      square: undefined,
      property: undefined,
    }),
  setHood: async (hood, name, hoodGeoJSON) => {
    const map = useMapStore.getState().map;
    const { hoodLayer: hoodLayer_, squareLayer, propertyLayer } = get();

    let newHoodLayer;

    if (hoodLayer_) hoodLayer_.remove();
    if (squareLayer) squareLayer.remove();
    if (propertyLayer) propertyLayer.remove();

    if (hoodGeoJSON && map) {
      newHoodLayer = geoJSON(hoodGeoJSON, {
        pmIgnore: true,
        style: () => {
          return {
            fillColor: "#FF894F",
            stroke: true,
            weight: 0.5,
            color: "#FF894F",
            opacity: 1.0,
          };
        },
      }).addTo(map);
      map.flyToBounds(newHoodLayer.getBounds());

      const {
        layerFilter,
        appendFilter,
        assignLayerToGroup
      } = useMapLayersStore.getState();
      const filterId = `${name?.toLowerCase().replaceAll(" ", "-")}-filter-${Object.keys(layerFilter).length + 1}`;
      const filterName = `${name?.toLowerCase()} filter ${Object.keys(layerFilter).length + 1}`;
      const filter: LayerFilterItem = {
        id: filterId,
        name: filterName,
        origin: newHoodLayer,
        target: INITIAL_LAYERS["incidents"].id,
        type: "intersection"
      }

      await appendFilter(filter);
      assignLayerToGroup(filterId, "metrix-filters");
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
  setSquare: async (square, name, squareGeoJSON) => {
    const map = useMapStore.getState().map;
    const { squareLayer: squareLayer_, propertyLayer } = get();

    let newSquareLayer;

    if (squareLayer_) squareLayer_.remove();
    if (propertyLayer) propertyLayer.remove();

    if (squareGeoJSON && map) {
      newSquareLayer = geoJSON(squareGeoJSON, {
        pmIgnore: true,
        style: () => {
          return {
            fillColor: "#EA5B6F",
            stroke: true,
            weight: 0.5,
            color: "#EA5B6F",
            opacity: 1.0,
          };
        },
      }).addTo(map);
      map.flyToBounds(newSquareLayer.getBounds());

      const {
        layerFilter,
        appendFilter,
        assignLayerToGroup
      } = useMapLayersStore.getState();
      const filterId = `${name?.toLowerCase().replaceAll(" ", "-")}-filter-${Object.keys(layerFilter).length + 1}`;
      const filterName = `${name?.toLowerCase()} filter ${Object.keys(layerFilter).length + 1}`;
      const filter: LayerFilterItem = {
        id: filterId,
        name: filterName,
        origin: newSquareLayer,
        target: INITIAL_LAYERS["incidents"].id,
        type: "intersection"
      }

      await appendFilter(filter);
      assignLayerToGroup(filterId, "metrix-filters");
    }

    set({
      square: square,
      squareLayer: newSquareLayer,
      property: undefined,
      propertyLayer: undefined,
    });
  },
  setProperty: async (property, name, propertyGeoJSON) => {
    const map = useMapStore.getState().map;
    const { propertyLayer: propertyLayer_ } = get();

    let newPropertyLayer;

    if (propertyLayer_) propertyLayer_.remove();

    if (propertyGeoJSON && map) {
      newPropertyLayer = geoJSON(propertyGeoJSON, {
        pmIgnore: true,
        style: () => {
          return {
            fillColor: "#1B3C53",
            stroke: true,
            weight: 0.5,
            color: "#1B3C53",
            opacity: 1.0,
          };
        },
      }).addTo(map);
      map.flyToBounds(newPropertyLayer.getBounds());

      const {
        layerFilter,
        appendFilter,
        assignLayerToGroup
      } = useMapLayersStore.getState();
      const filterId = `${name?.toLowerCase().replaceAll(" ", "-")}-filter-${Object.keys(layerFilter).length + 1}`;
      const filterName = `${name?.toLowerCase()} filter ${Object.keys(layerFilter).length + 1}`;
      const filter: LayerFilterItem = {
        id: filterId,
        name: filterName,
        origin: newPropertyLayer,
        target: INITIAL_LAYERS["incidents"].id,
        type: "intersection"
      }

      await appendFilter(filter);
      assignLayerToGroup(filterId, "metrix-filters");
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
