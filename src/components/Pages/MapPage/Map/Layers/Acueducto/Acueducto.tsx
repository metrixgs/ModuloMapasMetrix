import { useEffect } from "react";

import type { FeatureCollection } from "geojson";

import { geoJSON } from "leaflet";

import type { GeoJSONLayerItem } from "@/types/Stores/LayersManager";

import { useMapLayersStore } from "@/stores/useMapLayersStore";

import acueducto from "@/assets/layers/acueducto.json";

const Acueducto = () => {
  const { append, assignLayerToGroup } = useMapLayersStore((state) => state);

  const load = async () => {
    return geoJSON(acueducto as FeatureCollection, {
      pmIgnore: true,
    });
  };

  const info: GeoJSONLayerItem = {
    id: "metrix-layers-acueducto",
    active: false,
    format: "geojson",
    name: "Acueducto",
    type: "layer",
    temp: false,
    geometry: "LineString",
    columns: Object.keys(
      (acueducto as FeatureCollection).features[0].properties
    ).map((prop) => ({
      header: prop,
      accessorKey: prop,
    })),
    renamed: false,
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

export default Acueducto;
