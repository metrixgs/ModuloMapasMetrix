import { useEffect } from "react";

import type { FeatureCollection } from "geojson";

import { geoJSON } from "leaflet";

import type { GeoJSONLayerItem } from "@/types/Stores/LayersManager";

import { useMapLayersStore } from "@/stores/useMapLayersStore";

import zonaPoniente from "@/assets/layers/zona_poniente.json";

const ZonaPoniente = () => {
  const { append, assignLayerToGroup } = useMapLayersStore((state) => state);

  const load = async () => {
    return geoJSON(zonaPoniente as FeatureCollection);
  };

  const info: GeoJSONLayerItem = {
    id: "metrix-layers-zona-poniente",
    active: false,
    format: "geojson",
    name: "Zona Poniente",
    type: "layer",
    temp: false,
    geometry: "Polygon",
    columns: Object.keys(
      (zonaPoniente as FeatureCollection).features[0].properties
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

export default ZonaPoniente;
