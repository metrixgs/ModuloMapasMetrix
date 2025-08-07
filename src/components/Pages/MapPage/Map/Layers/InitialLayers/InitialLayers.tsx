import { useEffect } from "react";

import { INITIAL_LAYERS } from "@/config.map";

import { AVAILABLE_GROUPS } from "@/config.map.layers";

import { useMapLayersStore } from "@/stores/useMapLayersStore";

import LoadTileLayer from "../LoadFunctions/LoadTileLayer";

const InitialLayers = () => {
  const {
    append,
    createGroup,
    assignLayerToGroup
  } = useMapLayersStore((state) => state);

  const mountInitialLayers = async () => {
    for (const el of INITIAL_LAYERS) {
      if (el.format === "tile") {
        
        const loadFunction = await LoadTileLayer(el);
        const layerLoaded = await append(el, loadFunction);

        const group = el.groupId ? AVAILABLE_GROUPS[el.groupId] : undefined;
        
        if (layerLoaded) {
          if (group) {
            await createGroup(group);
            assignLayerToGroup(el.id, group.id);
          }
        }
      }
    }
  }

  useEffect(() => {
    mountInitialLayers();
  }, [])

  return null;
}

export default InitialLayers;