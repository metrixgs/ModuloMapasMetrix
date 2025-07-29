import { useEffect } from "react";

import type { FeatureCollection } from "geojson";

import { geoJSON } from "leaflet";

import type { GeoJSONLayerItem } from "@/types/Stores/LayersManager";

import { useMapLayersStore } from "@/stores/useMapLayersStore";

import parquesIndustria from "@/assets/layers/parques_industria.json";

const ParquesIndustria = () => {
  const { append, assignLayerToGroup } = useMapLayersStore((state) => state);

  const load = async () => {
    return geoJSON(parquesIndustria as FeatureCollection);
  };

  const info: GeoJSONLayerItem = {
    id: "metrix-layers-parques-industria",
    active: false,
    format: "geojson",
    name: "Parques Industria",
    type: "layer",
    temp: false,
    columns: Object.keys(
      (parquesIndustria as FeatureCollection).features[0].properties
    ).map((prop) => ({
      header: prop,
      accessorKey: prop,
    })),
  };

  useEffect(() => {
    const mount = async () => {
      const loaded = await append(info, load);
      if (loaded) {
        assignLayerToGroup(info.id, "metrix-administrative-cartography");
      }
    };
    mount();
  }, [append]);

  return null;
};

export default ParquesIndustria;
