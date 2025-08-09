import axios from "axios";

import type { PluralResponseAPI } from "@/types/API";

interface ReadGeneralAPIInputs {
  endpoint: string;
}

export const ReadGeneralAPI = async ({ endpoint }: ReadGeneralAPIInputs) => {

  try {
    const response = await axios.get<PluralResponseAPI>(endpoint);
    const parsed = response.data;
    return parsed;
  } catch (error) {
    console.error(error);
    return null;
  }
}