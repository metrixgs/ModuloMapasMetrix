import axios from "axios";
import qs from "qs";

import type { FeatureCollection } from "geojson";

interface GetGeoJSONLayerInput {
  serverUrl: string;
  workspace: string;
  name: string;
}

export const GetGeoJSONLayer = async ({
  serverUrl,
  workspace,
  name,
}: GetGeoJSONLayerInput) => {
  const params = qs.stringify(
    {
      service: "WFS",
      version: "1.0.0",
      request: "GetFeature",
      typeName: `${workspace}:${name}`,
      outputFormat: "application/json",
      srsName: "EPSG:4326"
    },
    {
      encode: false,
    }
  );

  const sanitizedServerUrl = serverUrl.replace(/\/+$/, "");
  const endpoint = `${sanitizedServerUrl}/ows?${params}`;

  try {
    const response = await axios.get<FeatureCollection>(endpoint);
    const parsed = response.data;
    return parsed;
  } catch (error) {
    console.error(error);
    return null;
  }
};
