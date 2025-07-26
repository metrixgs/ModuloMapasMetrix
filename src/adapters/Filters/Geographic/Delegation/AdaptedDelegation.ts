import type { FeatureAPI } from "@/types/API";
import type { Delegation, DelegationAPIProperties } from "@/types/Filters/Delegation";

import { API_GEO_REFERENCE } from "@/config.api.geo";

const AdaptedDelegation = (delegation: FeatureAPI<DelegationAPIProperties>): Delegation => {
  const map = API_GEO_REFERENCE.delegation.fields;

  const parsed: Delegation = {
    id: delegation.properties[map.id],
    code: delegation.properties[map.code],
    name: delegation.properties[map.name]
  }

  return parsed;
}

export default AdaptedDelegation;