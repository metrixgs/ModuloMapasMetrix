import { useState } from "react";

import { useMapLayersStore } from "@/stores/useMapLayersStore";

import SymbologyLayer from "./SymbologyLayer";
import SymbologyDrawer from "./SymbologyController/SymbologyDrawer";

const Symbology = () => {
  // const tref = "body.controls.layers.tabs.symbology";

  const { layersAsArray } = useMapLayersStore((state) => state);

  const [activeLayerId, setActiveLayerId] = useState<string>();
  const [openDrawer, setOpenDrawer] = useState(false);

  const layers = layersAsArray().filter((l) => l.format === "geojson");

  const activeLayer = layers.find((l) => l.id === activeLayerId);

  return (
    <>
      <div className="flex flex-col gap-1">
        {layers &&
          layers.map((layer, i) => {
            return (
              <SymbologyLayer
                key={i}
                layer={layer}
                active={activeLayerId === layer.id}
                onSetLayer={(layerId) => {
                  setOpenDrawer(true);
                  setActiveLayerId(layerId);
                }}
              />
            );
          })}
      </div>
      <SymbologyDrawer
        layer={activeLayer}
        open={openDrawer}
        onClose={() => {
          setActiveLayerId(undefined);
          setOpenDrawer(false);
        }}
      />
    </>
  );
};

export default Symbology;
