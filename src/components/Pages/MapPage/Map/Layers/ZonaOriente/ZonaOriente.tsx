import { useEffect } from "react";

import type { FeatureCollection } from "geojson";

import { geoJSON } from "leaflet";

import type { GeoJSONLayerItem } from "@/types/Stores/LayersManager";

import { useMapLayersStore } from "@/stores/useMapLayersStore";

import zonaOriente from "@/assets/layers/zon_oriente.json";

const ZonaOriente = () => {
  const { append, assignLayerToGroup } = useMapLayersStore((state) => state);

  const load = async () => {
    return geoJSON(zonaOriente as FeatureCollection);
  };

  const info: GeoJSONLayerItem = {
    id: "metrix-layers-zona-oriente",
    active: false,
    format: "geojson",
    name: "Zona Oriente",
    type: "layer",
    temp: false,
    columns: Object.keys(
      (zonaOriente as FeatureCollection).features[0].properties
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

export default ZonaOriente;
