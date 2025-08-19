import { useTranslation } from "react-i18next";

import {
  Drawer,
  DrawerHeader,
  Tabs,
  TabItem,
} from "flowbite-react";

import { BiLayer } from "react-icons/bi";

import LayersController from "./LayersController/LayersController";
import Symbology from "./Symbology/Symbology";

interface LayerControlProps {
  open: boolean;
  onClose: () => void;
}

const LayerControl = ({ open, onClose }: LayerControlProps) => {
  const { t } = useTranslation("global");
  const tref = "body.controls.layers"
  

  return (
    <Drawer
      className="h-[calc(100dvh-14*4px)] w-94 top-14"
      position="left"
      open={open}
      onClose={onClose}
      backdrop={false}
    >
      <div className="h-full flex flex-col">
        <DrawerHeader
          title={t(tref + ".sidebar-title")}
          titleIcon={() => <BiLayer className="mr-2" />}
        />
        <Tabs variant="underline">
          <TabItem title={t(tref + ".tabs.layers.title")}>
            <div className="grow overflow-y-auto">
              <LayersController />
            </div>
          </TabItem>
          <TabItem title={t(tref + ".tabs.symbology.title")}>
            <div className="grow overflow-y-auto">
              <Symbology />
            </div>
          </TabItem>
        </Tabs>
      </div>
    </Drawer>
  );
};

export default LayerControl;
