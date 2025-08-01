import { BiTrash } from "react-icons/bi";

import type { LayerMenuItemActionProps } from "@/types/LayerMenu";

import MenuItem from "@components/UI/Menu/MenuItem";

import { useMapLayersStore } from "@/stores/useMapLayersStore";

const RemoveLayer = ({ targetLayer, translation }: LayerMenuItemActionProps) => {
  const { removeLayer } = useMapLayersStore((state) => state);

  return (
    <MenuItem onClick={() => removeLayer(targetLayer.id)}>
      <BiTrash className="w-5 h-5 mr-2" />
      <span>{translation("body.controls.layers.layer-menu.delete")}</span>
    </MenuItem>
  );
};

export default RemoveLayer;
