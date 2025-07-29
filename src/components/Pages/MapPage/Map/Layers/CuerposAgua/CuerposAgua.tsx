import { useEffect } from "react";

import type { FeatureCollection } from "geojson";

import { geoJSON } from "leaflet";

import type { GeoJSONLayerItem } from "@/types/Stores/LayersManager";

import { useMapLayersStore } from "@/stores/useMapLayersStore";

import cuerpos_agua from "@/assets/layers/cuerpos_agua.json";

const CuerposAgua = () => {
  const { append, assignLayerToGroup } = useMapLayersStore((state) => state);

  const load = async () => {
    return geoJSON(cuerpos_agua as FeatureCollection);
  };

  const info: GeoJSONLayerItem = {
    id: "metrix-layers-cuerpos-agua",
    active: false,
    format: "geojson",
    name: "Cuerpos de Agua",
    type: "layer",
    temp: false,
    columns: Object.keys(
      (cuerpos_agua as FeatureCollection).features[0].properties
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

export default CuerposAgua;
