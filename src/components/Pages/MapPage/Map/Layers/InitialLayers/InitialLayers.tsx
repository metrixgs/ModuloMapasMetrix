import { useEffect } from "react";

import { INITIAL_LAYERS } from "@/config.map";

import { AVAILABLE_GROUPS } from "@/config.map.layers";

import AddLayer from "../AddLayer/AddLayer";

const InitialLayers = () => {
  const mountInitialLayers = async () => {
    for (const l of INITIAL_LAYERS) {
      const group = l.groupId ? AVAILABLE_GROUPS[l.groupId] : undefined;

      if (group) {
        const result = await AddLayer({
          layer: l,
          group: group,
        });
      } else {
        const result = await AddLayer({
          layer: l,
          group: {
            id: crypto.randomUUID(),
            name: "Temp group",
            type: "checkbox",
            active: true,
            disabled: false,
          }
        })
      }
    }
  };

  useEffect(() => {
    mountInitialLayers();
  }, []);

  return null;
};

export default InitialLayers;
