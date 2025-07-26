import type { FeatureCollectionAPI } from "@/types/API";
import type { State, StateAPIProperties } from "@/types/Filters/State";

import AdaptedState from "./AdaptedState";

const AdaptedStates = (
  states: FeatureCollectionAPI<StateAPIProperties>
): State[] => {
  const parsed = states.features.map((item) => AdaptedState(item));
  return parsed;
};

export default AdaptedStates;