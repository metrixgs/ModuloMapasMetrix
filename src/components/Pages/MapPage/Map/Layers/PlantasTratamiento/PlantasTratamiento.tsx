import { useEffect } from "react";

import type { FeatureCollection } from "geojson";

import { geoJSON } from "leaflet";

import type { GeoJSONLayerItem } from "@/types/Stores/LayersManager";

import { useMapLayersStore } from "@/stores/useMapLayersStore";

import plantasTratamiento from "@/assets/layers/plantas_tratamiento.json";

const PlantasTratamiento = () => {
  const { append, assignLayerToGroup } = useMapLayersStore((state) => state);

  const load = async () => {
    return geoJSON(plantasTratamiento as FeatureCollection);
  };

  const info: GeoJSONLayerItem = {
    id: "metrix-layers-plantas-tratamiento",
    active: false,
    format: "geojson",
    name: "Plantas Tratamiento",
    type: "layer",
    temp: false,
    columns: Object.keys(
      (plantasTratamiento as FeatureCollection).features[0].properties
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

export default PlantasTratamiento;
