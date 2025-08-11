import type { FeatureCollection } from "geojson";
import type {
  DivideFeaturesFilter,
  LayerItem,
} from "@/types/Stores/LayersManager";

import { useMapLayersStore } from "@/stores/useMapLayersStore";

import { GeoJSON, geoJSON } from "leaflet";

import { FILTER_GROUP } from "@/config.map";

export const divideFeaturesFilter = async (
  filter: DivideFeaturesFilter
): Promise<boolean> => {
  const {
    layers,
    layerFilter,
    append,
    turnOffLayer,
    focusLayer,
    assignLayerToGroup,
  } = useMapLayersStore.getState();

  // Separate features from a layer based on a selection of their properties.

  // Checks

  //   Target checks
  const target = layers[filter.target];

  // // The layer id must exist in "layers".
  if (!target) {
    console.warn(
      `The filter could not be applied. Make sure the target (${filter.target}) exists in the layer registry.`
    );
    return false;
  }

  //   Origin checks
  if (filter.selectedProps.length === 0) {
    console.warn(`The filter could not be applied. The "selectedProps properties is empty."`);
    return false;
  }

  const targetLayer = target.layer;

  // One layer is defined in the layer id of "layers".
  if (!targetLayer) {
    console.warn(
      `The filter could not be applied. Make sure the target (${filter.target}) has an associated layer.`
    );
    return false;
  }

  // The target has format "geojson" and is instance of GeoJSON.
  if (target.format != "geojson" || !(targetLayer instanceof GeoJSON)) {
    console.warn(
      `To apply an "intersection" type filter, the target must be a GeoJSON.`
    );
    return false;
  }

  const newLayerFilter = { ...layerFilter };
  const targetGeoJSON = targetLayer.toGeoJSON() as FeatureCollection;

  const originGeoJSON =
    filter.selectedProps.length === 0
      ? targetGeoJSON
      : ({
          type: "FeatureCollection",
          features: targetGeoJSON.features.filter((f) =>
            filter.selectedProps.includes(JSON.stringify(f.properties))
          ),
        } as FeatureCollection);

  const filterInfo: LayerItem = {
    ...target,
    id: filter.id,
    name: filter.name,
    active: true,
    format: "geojson",
    temp: true,
    type: "filtered",
    renamed: true,
  };

  const mount = await append(filterInfo, async () =>
    geoJSON(originGeoJSON, {
      pointToLayer: targetLayer.options.pointToLayer,
      onEachFeature: targetLayer.options.onEachFeature,
    })
  );

  if (mount) {
    assignLayerToGroup(filterInfo.id, FILTER_GROUP.id);
    turnOffLayer(filter.target);
    focusLayer(filter.id);
    newLayerFilter[filter.id] = filter;
    useMapLayersStore.setState({
      layerFilter: newLayerFilter,
    });
    return true;
  } else {
    console.warn("The filtered layer could not be added to the map.");
    return false;
  }
};
