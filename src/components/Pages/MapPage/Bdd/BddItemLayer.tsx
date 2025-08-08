import type { ReactNode } from "react";
import type { LayerGroupItem, LayerItem } from "@/types/Stores/LayersManager";

import classNames from "classnames";

import { useModalStore } from "@/stores/useModalStore";
import AddLayer from "../Map/Layers/AddLayer/AddLayer";

interface BddItemLayerProps {
  banner?: ReactNode;
  name?: string;
  description?: string;
  layerItem: LayerItem;
  groupItem: LayerGroupItem;
}

const BddItemLayer = ({
  banner,
  name,
  description,
  layerItem,
  groupItem,
}: BddItemLayerProps) => {

  const { close } = useModalStore((state) => state);

  const handleUpload = async () => {

    const result = await AddLayer({ layer: layerItem, group: groupItem });

    console.log(result);

    close();
  };

  return (
    <div
      className={classNames(
        "h-52 w-64",
        "transition-transform duration-300 hover:scale-105 hover:cursor-pointer",
        "border border-gray-300 dark:border-gray-600",
        "rounded-lg"
      )}
      onClick={handleUpload}
    >
      {banner}
      <div className="h-1/3">
        <h5 className="font-semibold text-sm">{name}</h5>
        <p className="text-xs">{description}</p>
      </div>
    </div>
  );
};

export default BddItemLayer;
