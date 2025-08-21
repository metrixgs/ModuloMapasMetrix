import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Modal, ModalBody, ModalHeader, Popover } from "flowbite-react";
import { BiChevronDown, BiFilterAlt } from "react-icons/bi";

import type { LayerItem } from "@/types/Stores/LayersManager";
import type { LayerMenuAuxModalState } from "@/types/LayerMenu";

import { useMapLayersStore } from "@/stores/useMapLayersStore";

import Menu from "@components/UI/Menu/Menu";
import MenuItem from "@components/UI/Menu/MenuItem";

import FilterByColumns from "./Actions/FilterByColumns/FilterByColumns";
import FocusLayer from "./Actions/FocusLayer/FocusLayer";
import DownloadGeoJSON from "./Actions/DownloadGeoJSON/DownloadGeoJSON";
import ShowAttributesLayer from "./Actions/ShowAttributesTable/ShowAttributesTable";
import RenameLayer from "./Actions/RenameLayer/RenameLayer";
import RemoveLayer from "./Actions/RemoveLayer/RemoveLayer";
import ToggleLayer from "./Actions/ToggleLayer/ToggleLayer";
import FilterByExpression from "./Actions/FilterByExpression/FilterByExpression";

interface LayerMenuProps {
  layer: LayerItem;
}

const LayerMenu = ({ layer }: LayerMenuProps) => {
  const { t } = useTranslation("global");
  const tref = "body.controls.layers.tabs.layers.layer-menu";

  const { groups } = useMapLayersStore((state) => state);

  const [auxModalState, setAuxModalState] = useState<LayerMenuAuxModalState>({
    active: false,
    content: <></>,
  });

  const { id, format, name, temp, renamed } = layer;

  const groupId = Object.keys(groups).find((group) =>
    groups[group].layers?.includes(id)
  );
  const group = groupId ? groups[groupId] : undefined;

  return (
    <>
      <Menu>
        <span className="max-w-40 text-sm pb-2 px-2 text-center font-bold">
          <i>{name}</i>
        </span>
        {format === "geojson" && (
          <>
            {layer.columns && (
              <ShowAttributesLayer targetLayer={layer} translation={t} />
            )}
            <DownloadGeoJSON targetLayer={layer} translation={t} />
            <FocusLayer targetLayer={layer} translation={t} />
            <Popover
              trigger="hover"
              placement="right"
              arrow={false}
              content={
                <Menu className="w-fit">
                  <FilterByColumns
                    targetLayer={layer}
                    translation={t}
                    auxModalState={auxModalState}
                    setAuxModalState={setAuxModalState}
                  />
                  <FilterByExpression
                    targetLayer={layer}
                    translation={t}
                    auxModalState={auxModalState}
                    setAuxModalState={setAuxModalState}
                  />
                </Menu>
              }
            >
              <MenuItem>
                <BiFilterAlt className="w-5 h-5 mr-2" />
                <span>{t(tref + ".filters.button-title")}</span>
                <BiChevronDown className="w-5 h-5" />
              </MenuItem>
            </Popover>
          </>
        )}
        {group && group.type !== "radio" && (
          <ToggleLayer targetLayer={layer} translation={t} />
        )}
        {renamed && (
          <RenameLayer
            targetLayer={layer}
            translation={t}
            auxModalState={auxModalState}
            setAuxModalState={setAuxModalState}
          />
        )}
        {temp && <RemoveLayer targetLayer={layer} translation={t} />}
      </Menu>
      <Modal
        show={auxModalState.active}
        onClose={() => setAuxModalState({ ...auxModalState, active: false })}
        size="lg"
        popup
      >
        <ModalHeader />
        <ModalBody>{auxModalState.content}</ModalBody>
      </Modal>
    </>
  );
};

export default LayerMenu;
