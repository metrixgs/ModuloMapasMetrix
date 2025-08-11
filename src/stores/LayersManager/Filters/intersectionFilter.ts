import type { FeatureCollection } from "geojson";

import type {
  GeoJSONLayerItem,
  IntersectionFilter,
  LayerItem,
} from "@/types/Stores/LayersManager";

import { useMapLayersStore } from "@/stores/useMapLayersStore";

import { GeoJSON, geoJSON } from "leaflet";
import { pointsWithinPolygon, featureCollection, intersect } from "@turf/turf";

import { FILTER_GROUP, TEMPORAL_GROUP } from "@/config.map";

export const intersectionFilter = async (
  filter: IntersectionFilter
): Promise<boolean> => {
  const {
    layers,
    layerFilter,
    append,
    turnOffLayer,
    focusLayer,
    assignLayerToGroup,
    createGroup,
  } = useMapLayersStore.getState();
  // Intersection between points and a polygon

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

  // One layer is defined in the layer id of "layers".
  if (!target.layer) {
    console.warn(
      `The filter could not be applied. Make sure the target (${filter.target}) has an associated layer.`
    );
    return false;
  }

  // The target has format "geojson" and is instance of GeoJSON.
  if (target.format != "geojson" || !(target.layer instanceof GeoJSON)) {
    console.warn(
      `To apply an "intersection" type filter, the target must be a GeoJSON.`
    );
    return false;
  }

  //   Origin checks
  const originLayer = filter.origin;

  // Logic
  const newLayerFilter = { ...layerFilter };
  const originGeoJSON = originLayer.toGeoJSON() as FeatureCollection;
  const targetLayer = target.layer;
  const targetGeoJSON = targetLayer.toGeoJSON();

  try {
    if (target.geometry === "Point") {
      const filteredLayerGeoJSON = pointsWithinPolygon(
        targetGeoJSON,
        originGeoJSON
      );

      const filterInfo: LayerItem = {
        id: filter.id,
        name: filter.name,
        active: true,
        format: "geojson",
        temp: true,
        type: "filtered",
        geometry: "Point",
        columns: target["columns"],
        renamed: true,
        source: {
          sourceType: "generated",
        },
      };

      const mount = await append(filterInfo, async () =>
        geoJSON(filteredLayerGeoJSON, {
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

        await createGroup(TEMPORAL_GROUP);
        const originId = crypto.randomUUID();
        const originInfo: GeoJSONLayerItem = {
          id: originId,
          active: true,
          format: "geojson",
          geometry: "Polygon",
          name: filterInfo.name + " shape",
          renamed: true,
          columns: originGeoJSON.features[0].properties
            ? Object.keys(originGeoJSON.features[0].properties).map((f) => ({
                header: f,
                accessorKey: f,
              }))
            : undefined,
          source: {
            sourceType: "generated",
          },
          temp: true,
          type: "layer",
        };
        const originMounted = await append(originInfo, async () => originLayer);
        if (originMounted) {
          assignLayerToGroup(originId, TEMPORAL_GROUP.id);
        }
        return true;
      } else {
        console.warn("The filtered layer could not be added to the map.");
        return false;
      }
    } else if (target.geometry === "Polygon") {
      const filteredLayerGeoJSON = intersect(
        featureCollection(targetGeoJSON, originGeoJSON)
      );

      const filterInfo: LayerItem = {
        id: filter.id,
        name: filter.name,
        active: true,
        format: "geojson",
        temp: true,
        type: "filtered",
        geometry: "Polygon",
        columns: target["columns"],
        renamed: true,
        source: {
          sourceType: "generated",
        },
      };

      const mount = await append(filterInfo, async () =>
        geoJSON(filteredLayerGeoJSON, {
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
    } else {
      console.warn(
        `The filter could not be applied. The geometry of the "target" has not considered.`
      );
      return false;
    }
  } catch (error) {
    console.error(
      `The filter could not be applied, an error occurred: ${error}`
    );
    return false;
  }
};
