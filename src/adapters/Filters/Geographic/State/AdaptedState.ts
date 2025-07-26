import type { FeatureAPI } from "@/types/API";
import type { State, StateAPIProperties } from "@/types/Filters/State";

import { API_GEO_REFERENCE } from "@/config.api.geo";

const AdaptedState = (state: FeatureAPI<StateAPIProperties>): State => {
  const map = API_GEO_REFERENCE.state.fields;

  const parsed: State = {
    id: state.properties[map.id],
    code: state.properties[map.code],
    name: state.properties[map.name]
  }

  return parsed;
}

export default AdaptedState;