import { TbFocusCentered } from "react-icons/tb";

import type { LayerMenuItemActionProps } from "@/types/LayerMenu";

import MenuItem from "@components/UI/Menu/MenuItem";

import { useMapStore } from "@/stores/useMapStore";

const FocusLayer = ({
  targetLayer,
  translation,
}: LayerMenuItemActionProps) => {

  const { map } = useMapStore((state) => state);

  const handleFocus = () => {
    if (
      map &&
      targetLayer &&
      targetLayer.layer &&
      targetLayer.format === "geojson"
    ) {
      const bounds = targetLayer.layer.getBounds();
      map.flyToBounds(bounds);
    }
  };

  return (
    <MenuItem onClick={handleFocus}>
      <TbFocusCentered className="w-5 h-5 mr-2" />
      <span>{translation("body.controls.layers.layer-menu.focus")}</span>
    </MenuItem>
  );
};

export default FocusLayer;