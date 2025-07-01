import { useCallback } from "react";
import type { Layer } from "leaflet";

import type { LayerInfoItem } from "@/types/Stores";
import { useMapStore } from "@/stores/useMapStore";
import { useMapLayersStore } from "@/stores/useMapLayersStore";

interface UseMapLayersParams {
  info: LayerInfoItem;
  loadFunction: () => Promise<Layer>;
}

const useMapLayer = ({ info, loadFunction }: UseMapLayersParams) => {
  const map = useMapStore((state) => state.map);
  const { layerList, append } = useMapLayersStore((state) => state);

  const loadLayer = useCallback(async (): Promise<boolean> => {
    const oldLayer = layerList[info.id];
    if (oldLayer) return false;

    try {
      const layer = await loadFunction();
      append(layer, info);

      if (info.active) {
        map?.addLayer(layer);
      }
      return true;
    } catch(error) {
      console.error(error);
      return false;
    }

  }, [loadFunction, info, layerList, append, map])

  return { loadLayer };
}

export default useMapLayer;