import { useEffect } from "react";

import type { FeatureCollection } from "geojson";

import { geoJSON } from "leaflet";

import type { GeoJSONLayerItem } from "@/types/Stores/LayersManager";

import { useMapLayersStore } from "@/stores/useMapLayersStore";

import zonaSur from "@/assets/layers/zona_sur.json";

const ZonaSur = () => {
  const { append, assignLayerToGroup } = useMapLayersStore((state) => state);

  const load = async () => {
    return geoJSON(zonaSur as FeatureCollection);
  };

  const info: GeoJSONLayerItem = {
    id: "metrix-layers-zona-sur",
    active: false,
    format: "geojson",
    name: "Zona Sur",
    type: "layer",
    temp: false,
    columns: Object.keys(
      (zonaSur as FeatureCollection).features[0].properties
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

export default ZonaSur;
