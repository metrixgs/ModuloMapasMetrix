import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";

import type { LayerMenuItemActionProps } from "@/types/LayerMenu";

import MenuItem from "@components/UI/Menu/MenuItem";

import { useMapLayersStore } from "@/stores/useMapLayersStore";

const ToggleLayer = ({
  targetLayer,
  translation,
}: LayerMenuItemActionProps) => {
  const tref = "body.controls.layers.tabs.layers.layer-menu";

  const { toggleLayer } = useMapLayersStore((state) => state);

  return (
    <MenuItem onClick={() => toggleLayer(targetLayer.id)}>
      {targetLayer.active ? (
        <>
          <FaRegEyeSlash className="w-5 h-5 mr-2" />
          <span>{translation(tref + ".hide")}</span>
        </>
      ) : (
        <>
          <FaRegEye className="w-5 h-5 mr-2" />
          <span>{translation(tref + ".show")}</span>
        </>
      )}
    </MenuItem>
  );
};

export default ToggleLayer;
