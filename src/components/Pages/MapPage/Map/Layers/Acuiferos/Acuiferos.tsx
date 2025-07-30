import { useEffect } from "react";

import type { FeatureCollection } from "geojson";

import { geoJSON } from "leaflet";

import type { GeoJSONLayerItem } from "@/types/Stores/LayersManager";

import { useMapLayersStore } from "@/stores/useMapLayersStore";

import acuiferos from "@/assets/layers/acuiferos.json";

const Acuiferos = () => {
  const { append, assignLayerToGroup } = useMapLayersStore((state) => state);

  const load = async () => {
    return geoJSON(acuiferos as FeatureCollection);
  };

  const info: GeoJSONLayerItem = {
    id: "metrix-layers-acuiferos",
    active: false,
    format: "geojson",
    name: "Acuiferos",
    type: "layer",
    temp: false,
    geometry: "Polygon",
    columns: Object.keys(
      (acuiferos as FeatureCollection).features[0].properties
    ).map((prop) => ({
      header: prop,
      accessorKey: prop,
    })),
    renamed: false
  };

  useEffect(() => {
    const mount = async () => {
      const loaded = await append(info, load);
      if (loaded) {
        assignLayerToGroup(info.id, "metrix-water-infrastructure");
      }
    };
    mount();
  }, [append]);

  return null;
};

export default Acuiferos;
