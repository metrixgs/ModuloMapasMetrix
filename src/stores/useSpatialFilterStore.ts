import { create } from "zustand";

import { geoJSON } from "leaflet";

import type { SpatialFilterStore } from "@/types/Stores/SpatialFilterStore";
import type { LayerFilterItem } from "@/types/Stores/LayersManager";

import { useMapStore } from "./useMapStore";
import { useMapLayersStore } from "./useMapLayersStore";

export const useSpatialFilterStore = create<SpatialFilterStore>((set, get) => ({
  targetId: undefined,
  setTargetId: (id) => set({ targetId: id }),
  setCountry: async (country, name, countryGeoJSON) => {
    console.log(countryGeoJSON);
    const map = useMapStore.getState().map;
    const { targetId } = get();

    if (!targetId) return false;
    let newCountryLayer;

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
      });
      map.flyToBounds(newCountryLayer.getBounds());

      const { appendFilter } = useMapLayersStore.getState();
      const filterId = crypto.randomUUID();
      const filterName = `${name?.toLowerCase()} filter`;
      const filter: LayerFilterItem = {
        id: filterId,
        name: filterName,
        origin: newCountryLayer,
        target: targetId,
        type: "intersection",
      };

      set({
        country: country,
        state: undefined,
        municipality: undefined,
        hood: undefined,
        square: undefined,
        property: undefined,
      });

      return await appendFilter(filter);
    } else {
      return false;
    }
  },
  setState: async (state, name, stateGeoJSON) => {
    const map = useMapStore.getState().map;
    const { targetId } = get();

    if (!targetId) return false;
    let newStateLayer;

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
      });
      map.flyToBounds(newStateLayer.getBounds());

      const { appendFilter } = useMapLayersStore.getState();
      const filterId = crypto.randomUUID();
      const filterName = `${name?.toLowerCase()} filter`;
      const filter: LayerFilterItem = {
        id: filterId,
        name: filterName,
        origin: newStateLayer,
        target: targetId,
        type: "intersection",
      };

      set({
        state: state,
        municipality: undefined,
        hood: undefined,
        square: undefined,
        property: undefined,
      });

      return await appendFilter(filter);
    } else {
      return false;
    }
  },
  setMunicipality: async (municipality, name, municipalityLayer) => {
    const map = useMapStore.getState().map;
    const { targetId } = get();

    if (!targetId) return false;
    let newMunicipalityLayer;

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
      });
      map.flyToBounds(newMunicipalityLayer.getBounds());

      const { appendFilter } = useMapLayersStore.getState();
      const filterId = crypto.randomUUID();
      const filterName = `${name?.toLowerCase()} filter`;
      const filter: LayerFilterItem = {
        id: filterId,
        name: filterName,
        origin: newMunicipalityLayer,
        target: targetId,
        type: "intersection",
      };

      set({
        municipality: municipality,
        hood: undefined,
        square: undefined,
        property: undefined,
      });

      return await appendFilter(filter);
    } else {
      return false;
    }
  },
  setHood: async (hood, name, hoodGeoJSON) => {
    const map = useMapStore.getState().map;
    const { targetId } = get();

    if (!targetId) return false;
    let newHoodLayer;

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
      });
      map.flyToBounds(newHoodLayer.getBounds());

      const { appendFilter } = useMapLayersStore.getState();
      const filterId = crypto.randomUUID();
      const filterName = `${name?.toLowerCase()} filter`;
      const filter: LayerFilterItem = {
        id: filterId,
        name: filterName,
        origin: newHoodLayer,
        target: targetId,
        type: "intersection",
      };

      set({
        hood: hood,
        square: undefined,
        property: undefined,
      });

      return await appendFilter(filter);
    } else {
      return false;
    }
  },
  setSquare: async (square, name, squareGeoJSON) => {
    const map = useMapStore.getState().map;
    const { targetId } = get();

    if (!targetId) return false;
    let newSquareLayer;

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
      });
      map.flyToBounds(newSquareLayer.getBounds());

      const { appendFilter } = useMapLayersStore.getState();
      const filterId = crypto.randomUUID();
      const filterName = `${name?.toLowerCase()} filter`;
      const filter: LayerFilterItem = {
        id: filterId,
        name: filterName,
        origin: newSquareLayer,
        target: targetId,
        type: "intersection",
      };

      set({
        square: square,
        property: undefined,
      });

      return await appendFilter(filter);
    } else {
      return false;
    }
  },
  setProperty: async (property, name, propertyGeoJSON) => {
    const map = useMapStore.getState().map;
    const { targetId } = get();

    if (!targetId) return false;
    let newPropertyLayer;

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
      });
      map.flyToBounds(newPropertyLayer.getBounds());

      const { appendFilter } = useMapLayersStore.getState();
      const filterId = crypto.randomUUID();
      const filterName = `${name?.toLowerCase()} filter`;
      const filter: LayerFilterItem = {
        id: filterId,
        name: filterName,
        origin: newPropertyLayer,
        target: targetId,
        type: "intersection",
      };

      set({
        property: property,
      });

      return await appendFilter(filter);
    } else {
      return false;
    }
  },
  clear: () => {
    set({
      country: undefined,
      state: undefined,
      municipality: undefined,
      delegation: undefined,
      zip: undefined,
      hood: undefined,
      square: undefined,
      property: undefined,
    });
  },
}));
