import type { LayerItem } from "@/types/Stores/LayersManager";
import classNames from "classnames";

interface SymbologyLayerProps {
  layer: LayerItem;
  active: boolean;
  onSetLayer: (layerId: string) => void;
}

const SymbologyLayer = ({
  layer,
  active,
  onSetLayer,
}: SymbologyLayerProps) => {
  const { id, name } = layer;

  return (
    <div
      className={classNames(
        "h-8 px-4",
        "flex gap-4 items-center justify-items-start",
        "text-sm",
        "hover:cursor-pointer",
        "transition-colors duration-200",
        "rounded-lg",
        {
          "hover:bg-gray-200 dark:hover:bg-metrixblack-700": !active,
          "bg-primary-400/70 dark:bg-primary-400/50": active,
          "text-primary-950 dark:text-primary-100": active,
        }
      )}
      onClick={() => {
        onSetLayer(id);
      }}
    >
      <span className="text-sm dark:text-white">{name}</span>
    </div>
  );
};

export default SymbologyLayer;
