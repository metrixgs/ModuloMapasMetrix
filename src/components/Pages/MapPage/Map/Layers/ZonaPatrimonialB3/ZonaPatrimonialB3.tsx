import { useEffect } from "react";

import type { FeatureCollection } from "geojson";

import { geoJSON } from "leaflet";

import type { GeoJSONLayerItem } from "@/types/Stores/LayersManager";

import { useMapLayersStore } from "@/stores/useMapLayersStore";

import zonaPatrimonialB3 from "@/assets/layers/zona_patrimonial_b3.json";

const ZonaPatrimonialB3 = () => {
  const { append, assignLayerToGroup } = useMapLayersStore((state) => state);

  const load = async () => {
    return geoJSON(zonaPatrimonialB3 as FeatureCollection);
  };

  const info: GeoJSONLayerItem = {
    id: "metrix-layers-zona-patrimonial-b3",
    active: false,
    format: "geojson",
    name: "Zona Patrimonial B3",
    type: "layer",
    temp: false,
    columns: Object.keys(
      (zonaPatrimonialB3 as FeatureCollection).features[0].properties
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
        assignLayerToGroup(info.id, "metrix-administrative-cartography");
      }
    };
    mount();
  }, [append]);

  return null;
};

export default ZonaPatrimonialB3;
