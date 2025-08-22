import type { GeoJSONLayerItem } from "@/types/Stores/LayersManager";

import { Drawer, DrawerHeader } from "flowbite-react";

import { BiBrush } from "react-icons/bi";
import classNames from "classnames";

import SymbologyController from "./SymbologyController";

interface SymbologyDrawerProps {
  layer?: GeoJSONLayerItem;
  open: boolean;
  onClose: () => void;
}

const SymbologyDrawer = ({ layer, open, onClose }: SymbologyDrawerProps) => {
  return (
    <Drawer
      className={classNames("h-[calc(100dvh-14*4px)]", "top-14")}
      position="right"
      open={open}
      onClose={onClose}
      backdrop={false}
    >
      <DrawerHeader
        title={layer?.name}
        titleIcon={() => <BiBrush className="mr-2" />}
      />
      <div className="flex flex-col">
        {layer && <SymbologyController key={layer.id} layer={layer} />}
      </div>
    </Drawer>
  );
};

export default SymbologyDrawer;
