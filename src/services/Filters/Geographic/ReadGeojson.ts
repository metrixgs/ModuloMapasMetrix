import axios from "axios";

import type { FeatureCollection } from "geojson";

const ReadGeojson = async (
  level?: string,
  filename?: string
): Promise<FeatureCollection | undefined> => {
  if (!level && filename) {
    return undefined;
  }

  try {
    const response = await axios.get(`/geographic/${level}/${filename}`, {
      responseType: "json",
    });
    return response.data as FeatureCollection;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export default ReadGeojson;
