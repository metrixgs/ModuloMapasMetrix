import { useEffect } from "react";

import type { FeatureCollection } from "geojson";

import { geoJSON } from "leaflet";

import type { GeoJSONLayerItem } from "@/types/Stores/LayersManager";

import { useMapLayersStore } from "@/stores/useMapLayersStore";

import espacios from "@/assets/layers/espacios_publicos.json";

const EspaciosPublicos = () => {
  const { append, assignLayerToGroup } = useMapLayersStore((state) => state);

  const load = async () => {
    return geoJSON(espacios as FeatureCollection);
  };

  const info: GeoJSONLayerItem = {
    id: "metrix-layers-espacios-publicos",
    active: false,
    format: "geojson",
    name: "Espacios Públicos",
    type: "layer",
    temp: false,
    columns: Object.keys(
      (espacios as FeatureCollection).features[0].properties
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

export default EspaciosPublicos;
