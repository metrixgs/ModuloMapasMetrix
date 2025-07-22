import { useState, type Dispatch, type SetStateAction } from "react";

import { useTranslation } from "react-i18next";

import { Popover } from "flowbite-react";

import {
  BiEdit,
  BiShapeSquare,
  BiShapeCircle,
  BiShapePolygon,
  BiRuler,
  BiArea,
  BiEditAlt,
  BiEraser,
  BiTrash
} from "react-icons/bi";

import { useDrawStore } from "@/stores/useDrawStore";

import { MapControl } from "@components/Map/Controls/MapControl";

import MeasureResult from "./MeasureResult";

import Menu from "@components/UI/Menu/Menu";
import MenuItem from "@components/UI/Menu/MenuItem";

import CreateRectangle from "./interactions/CreateRectangle";
import CreateCircle from "./interactions/CreateCircle";
import CreatePolygon from "./interactions/CreatePolygon";
import MeasureLine from "./interactions/MeasureLine";
import MeasurePolygon from "./interactions/MeasurePolygon";
import ToggleEdit from "./interactions/ToggleEdit";
import ToggleDeleteElement from "./interactions/ToggleDeleteElement";

const DrawContent = ({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { t } = useTranslation("global");

  const { features, clearStore, isEditModeActive, isRemovalModeActive } = useDrawStore(
    (state) => state
  );

  const editDisabled = !features || features.length === 0;
  const removalDisabled = !features;

  return (
    <Menu>
      <span className="text-sm pt-1 pb-2 px-2 text-gray-700 dark:text-gray-200 text-center font-bold">
        <i>{ t("body.controls.draw.create.title") }</i>
      </span>
      <MenuItem
        onClick={() => {
          setOpen(false);
          CreateRectangle();
        }}
      >
        <BiShapeSquare className="w-5 h-5 mr-2" />
        {t("body.controls.draw.create.rectangle.title")}
      </MenuItem>
      <MenuItem
        onClick={() => {
          setOpen(false);
          CreateCircle();
        }}
      >
        <BiShapeCircle className="w-5 h-5 mr-2" />
        {t("body.controls.draw.create.circle.title")}
      </MenuItem>
      <MenuItem
        onClick={() => {
          setOpen(false);
          CreatePolygon();
        }}
      >
        <BiShapePolygon className="w-5 h-5 mr-2" />
        {t("body.controls.draw.create.polygon.title")}
      </MenuItem>
      <span className="text-sm pt-3 pb-2 px-2 text-gray-700 dark:text-gray-200 text-center font-bold">
        <i>{ t("body.controls.draw.measure.title") }</i>
      </span>
      <MenuItem
        onClick={() => {
          setOpen(false);
          MeasureLine();
        }}
      >
        <BiRuler className="w-5 h-5 mr-2" />
        {t("body.controls.draw.measure.distance.title")}
      </MenuItem>
      <MenuItem
        onClick={() => {
          setOpen(false);
          MeasurePolygon();
        }}
      >
        <BiArea className="w-5 h-5 mr-2" />
        {t("body.controls.draw.measure.area.title")}
      </MenuItem>
      <span className="text-sm pt-3 pb-2 px-2 text-gray-700 dark:text-gray-200 text-center font-bold">
        <i>{ t("body.controls.draw.edit.title") }</i>
      </span>
      <MenuItem
        onClick={() => {
          setOpen(false);
          ToggleEdit();
        }}
        disabled={editDisabled}
      >
        <BiEditAlt className="w-5 h-5 mr-2" />
        {isEditModeActive
          ? t("body.controls.draw.edit.deactive.title")
          : t("body.controls.draw.edit.active.title")}
      </MenuItem>
      <MenuItem
        onClick={() => {
          if (!isRemovalModeActive) {
            setOpen(false);
          }
          ToggleDeleteElement();
        }}
        disabled={removalDisabled}
      >
        <BiEraser className="w-5 h-5 mr-2" />
        {isRemovalModeActive
          ? t("body.controls.draw.delete.deactive.title")
          : t("body.controls.draw.delete.active.title")}
      </MenuItem>
      <MenuItem
        onClick={() => {
          clearStore();
        }}
        disabled={editDisabled}
      >
        <BiTrash className="w-5 h-5 mr-2" />
        {t("body.controls.draw.delete-all.title")}
      </MenuItem>
    </Menu>
  );
};

const Draw = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Popover
        open={open}
        onOpenChange={setOpen}
        placement="left"
        content={<DrawContent setOpen={setOpen} />}
        arrow={false}
      >
        <MapControl>
          <BiEdit className="w-4 h-4" />
        </MapControl>
      </Popover>
      <MeasureResult />
    </>
  );
};

export default Draw;
