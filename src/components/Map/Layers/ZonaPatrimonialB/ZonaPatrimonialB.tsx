import { useEffect } from "react";

import type { FeatureCollection } from "geojson";

import { geoJSON } from "leaflet";

import type { GeoJSONLayerItem } from "@/types/Stores/LayersManager";

import { useMapLayersStore } from "@/stores/useMapLayersStore";

import zonaPatrimonialB from "@/assets/layers/zona_patrimonial_b.json";

const ZonaPatrimonialB = () => {
  const { append, assignLayerToGroup } = useMapLayersStore((state) => state);

  const load = async () => {
    return geoJSON(zonaPatrimonialB as FeatureCollection);
  };

  const info: GeoJSONLayerItem = {
    id: "metrix-layers-zona-patrimonial-b",
    active: false,
    format: "geojson",
    name: "Zona Patrimonial B",
    type: "layer",
    temp: false,
    columns: Object.keys(
      (zonaPatrimonialB as FeatureCollection).features[0].properties
    ).map((prop) => ({
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

export default ZonaPatrimonialB;
