import type { GeoJSON as GeoJSON_ } from "leaflet";

import type {
  GeoJSON,
  Feature,
  FeatureCollection,
  Geometry
} from "geojson";

import {
  featureCollection as tFeatureCollection,
} from "@turf/turf";

import type { GeoJSONLayerItem } from "@/types/Stores/LayersManager";

import { useMapStore } from "@/stores/useMapStore";

import { px2mm } from "./uiUtils";

export const json2geojsonPoint = (
  json: object[],
  lat: string,
  lng: string
): FeatureCollection => {
  return {
    type: "FeatureCollection",
    features: json.map((item) => ({
      type: "Feature",
      properties: {
        ...item,
      },
      geometry: {
        coordinates: [
          Number(item[lng as keyof typeof item]),
          Number(item[lat as keyof typeof item]),
        ],
        type: "Point",
      },
    })),
  };
};

export const getScaleFactor = () => {
  const { map } = useMapStore.getState();

  let center;
  let realWorldMetersPer100pixels;
  const screenMetersPer100pixels = px2mm(100) / 1000;

  if (map) {
    center = map.getSize().y / 2;
    realWorldMetersPer100pixels = map.distance(
      map.containerPointToLatLng([0, center]),
      map.containerPointToLatLng([100, center])
    );

    return realWorldMetersPer100pixels / screenMetersPer100pixels;
  } else {
    return undefined;
  }
};

export const layers2features = (
  layers: GeoJSON_[]
) => {
  const features = layers.map((layer) => layer.toGeoJSON()) as unknown as Feature[];
  const collection = tFeatureCollection(features);
  return collection;
};

export const extractGeoJSONProperties = <T>(
  geojson?: FeatureCollection<Geometry, T>
): T[] => {
  if (geojson) {
    return geojson.features.map((feature) => feature.properties);
  } else {
    return [];
  }
}

export const extractGeoJSONGeometry = (geojson: FeatureCollection): GeoJSONLayerItem["geometry"] | undefined => {
  if (geojson) {
    const feature = geojson.features[0];
    const geometry = feature.geometry.type;
    
    if (geometry === "LineString" || geometry === "MultiLineString") {
      return "LineString";
    } else if (geometry === "MultiPoint" || geometry === "Point") {
      return "Point";
    } else if (geometry === "MultiPolygon" || geometry === "Polygon") {
      return "Polygon";
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
}