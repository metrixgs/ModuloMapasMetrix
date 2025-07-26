import type { FeatureCollectionAPI } from "@/types/API";
import type { Delegation, DelegationAPIProperties } from "@/types/Filters/Delegation";

import AdaptedDelegation from "./AdaptedDelegation";

const AdaptedDelegations = (
  delegations: FeatureCollectionAPI<DelegationAPIProperties>
): Delegation[] => {
  const parsed = delegations.features.map((item) => AdaptedDelegation(item));
  return parsed;
};

export default AdaptedDelegations;