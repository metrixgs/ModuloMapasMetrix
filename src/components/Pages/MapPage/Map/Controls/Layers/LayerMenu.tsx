import { useState, type JSX } from "react";
import { useTranslation } from "react-i18next";
import { bbox } from "@turf/turf";
import {
  HelperText,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";

import { BiTable, BiTrash, BiDownload, BiRename, BiSave } from "react-icons/bi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { TbFocusCentered } from "react-icons/tb";

import { GeoJSON, latLng, latLngBounds } from "leaflet";
import type { LayerItem } from "@/types/Stores/LayersManager";
import type { Row } from "@tanstack/react-table";

import { useMapLayersStore } from "@/stores/useMapLayersStore";
import { useMapStore } from "@/stores/useMapStore";
import { useSidebarLeftStore } from "@/stores/useSidebarLeftStore";
import { useBottomDrawerStore } from "@/stores/useBottomDrawerStore";

import Menu from "@components/UI/Menu/Menu";
import MenuItem from "@components/UI/Menu/MenuItem";

import AttributesTable from "@components/Pages/MapPage/AttributesTable/AttributesTable";

import { extractGeoJSONProperties } from "@/utils/geometryUtils";
import { downloadGeoJSON } from "@/utils/downloadUtils";
import Button from "@components/UI/Button";

interface LayerMenuProps {
  layer: LayerItem;
}

interface AuxModalState {
  active: boolean;
  content: JSX.Element;
}

const LayerMenu = ({ layer }: LayerMenuProps) => {
  const { t } = useTranslation("global");

  const {
    toggleLayer,
    removeLayer,
    renameLayer,
    groups
  } = useMapLayersStore((state) => state);

  const { map } = useMapStore((state) => state);

  const { close: closeSidebarLeft } = useSidebarLeftStore((state) => state);

  const {
    setChildren,
    open,
    setTitle,
    disableHeader
  } = useBottomDrawerStore((state) => state);

  const [auxModalState, setAuxModalState] = useState<AuxModalState>({
    active: false,
    content: <></>,
  });

  const { id, active, format, name, temp, renamed, layer: layerClass } = layer;

  const groupId = Object.keys(groups).find((group) =>
    groups[group].layers.includes(id)
  );
  const group = groupId ? groups[groupId] : undefined;

  const handleAttributesTable = () => {
    if (
      layer.format === "geojson" &&
      layerClass instanceof GeoJSON &&
      layer.columns
    ) {
      const layerGeoJSON = layerClass.toGeoJSON();

      if (layerGeoJSON.type === "FeatureCollection") {
        const data = extractGeoJSONProperties(layerGeoJSON);

        const onSelectedRow = async (row: Row<(typeof data)[0]>) => {
          const feature = layerGeoJSON.features.find(
            (feature) => feature.properties === row.original
          );
          if (feature && map) {
            const bounds = bbox(feature);
            const min = latLng(bounds[1], bounds[0]);
            const max = latLng(bounds[3], bounds[2]);
            map.flyToBounds(latLngBounds(min, max), {
              paddingBottomRight: [0, 4 * 72], // Attributes table max height (h-72)
            });
          }
          return;
        };

        closeSidebarLeft();
        setTitle(name);
        disableHeader();
        setChildren(
          <AttributesTable
            data={data}
            columns={layer.columns}
            onSelectedRow={onSelectedRow}
          />
        );
        open();
      }
    }
  };

  const handleDownloadGeoJSON = () => {
    if (layerClass) {
      const geojson = (layerClass as GeoJSON).toGeoJSON();
      downloadGeoJSON(geojson, `${name}.geojson`);
    }
  };

  const handleFocus = () => {
    if (layerClass && map) {
      const bounds = (layerClass as GeoJSON).getBounds();
      map.flyToBounds(bounds);
    }
  };

  const handleRename = (id: string) => {
    const AuxModalContent = () => {
      const fieldReference = "new-layer-name";
      return (
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData.entries());

            const newName = data[fieldReference].toString();

            renameLayer(id, newName);

            setAuxModalState({
              ...auxModalState,
              active: false
            })
          }}
          className="w-full p-2 flex flex-col gap-4 items-center"
        >
          <div className="w-full">
            <TextInput
              id={"id-" + fieldReference}
              name={fieldReference}
              sizing="sm"
              defaultValue={name}
            />
            <HelperText className="text-xs">
              {t("body.controls.layers.layer-menu.rename.help")}
            </HelperText>
          </div>
          <Button className="w-fit h-8" type="submit">
            <BiSave className="w-5 h-5 mr-2" />
            <span className="text-xs">
              {t("body.controls.layers.layer-menu.rename.apply-button-title")}
            </span>
          </Button>
        </form>
      );
    };
    setAuxModalState({
      active: true,
      content: <AuxModalContent />,
    });
  };

  return (
    <>
      <Menu>
        <span className="text-sm pb-2 px-2 text-center font-bold">
          <i>{name}</i>
        </span>
        {format === "geojson" && (
          <>
            {layer.columns && (
              <MenuItem onClick={handleAttributesTable}>
                <BiTable className="w-5 h-5 mr-2" />
                <span>
                  {t("body.controls.layers.layer-menu.attributes-table")}
                </span>
              </MenuItem>
            )}
            <MenuItem onClick={handleDownloadGeoJSON}>
              <BiDownload className="w-5 h-5 mr-2" />
              <span>
                {t("body.controls.layers.layer-menu.download-geojson")}
              </span>
            </MenuItem>
            <MenuItem onClick={handleFocus}>
              <TbFocusCentered className="w-5 h-5 mr-2" />
              <span>{t("body.controls.layers.layer-menu.focus")}</span>
            </MenuItem>
          </>
        )}
        {group && group.type !== "radio" && (
          <MenuItem onClick={() => toggleLayer(id)}>
            {active ? (
              <>
                <FaRegEyeSlash className="w-5 h-5 mr-2" />
                <span>{t("body.controls.layers.layer-menu.hide")}</span>
              </>
            ) : (
              <>
                <FaRegEye className="w-5 h-5 mr-2" />
                <span>{t("body.controls.layers.layer-menu.show")}</span>
              </>
            )}
          </MenuItem>
        )}
        {renamed && (
          <MenuItem onClick={() => handleRename(id)}>
            <BiRename className="w-5 h-5 mr-2" />
            <span>
              {t("body.controls.layers.layer-menu.rename.button-title")}
            </span>
          </MenuItem>
        )}
        {temp && (
          <MenuItem onClick={() => removeLayer(id)}>
            <BiTrash className="w-5 h-5 mr-2" />
            <span>{t("body.controls.layers.layer-menu.delete")}</span>
          </MenuItem>
        )}
      </Menu>
      <Modal
        show={auxModalState.active}
        onClose={() => setAuxModalState({ ...auxModalState, active: false })}
        size="sm"
        popup
      >
        <ModalHeader />
        <ModalBody>{auxModalState.content}</ModalBody>
      </Modal>
    </>
  );
};

export default LayerMenu;
