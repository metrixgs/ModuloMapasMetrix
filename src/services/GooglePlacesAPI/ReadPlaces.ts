import axios from "axios";

import type { PlacesResponse } from "@/types/GooglePlaces/Place";

interface ReadPlacesInputs {
  query: string;
}

const ReadPlaces = async ({ query }: ReadPlacesInputs) => {
  const data = {
    textQuery: query,
  };

  try {
    const response = await axios.post<PlacesResponse>(
      "https://places.googleapis.com/v1/places:searchText",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_PLACES_API_KEY,
          "X-Goog-FieldMask":
            "places.displayName,places.formattedAddress,places.location,places.viewport",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default ReadPlaces;
