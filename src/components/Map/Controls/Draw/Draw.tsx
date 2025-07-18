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
import DrawItem from "./DrawItem";

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
    <div className="flex flex-col py-2">
      <span className="text-sm dark:text-white text-center my-1 font-bold">
        {t("body.controls.draw.create.title")}
      </span>
      <DrawItem
        onClick={() => {
          setOpen(false);
          CreateRectangle();
        }}
      >
        <BiShapeSquare className="w-5 h-5 mr-2" />
        {t("body.controls.draw.create.rectangle.title")}
      </DrawItem>
      <DrawItem
        onClick={() => {
          setOpen(false);
          CreateCircle();
        }}
      >
        <BiShapeCircle className="w-5 h-5 mr-2" />
        {t("body.controls.draw.create.circle.title")}
      </DrawItem>
      <DrawItem
        onClick={() => {
          setOpen(false);
          CreatePolygon();
        }}
      >
        <BiShapePolygon className="w-5 h-5 mr-2" />
        {t("body.controls.draw.create.polygon.title")}
      </DrawItem>
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
      <span className="text-sm dark:text-white text-center mt-3 mb-1 font-bold">
        {t("body.controls.draw.measure.title")}
      </span>
      <DrawItem
        onClick={() => {
          setOpen(false);
          MeasureLine();
        }}
      >
        <BiRuler className="w-5 h-5 mr-2" />
        {t("body.controls.draw.measure.distance.title")}
      </DrawItem>
      <DrawItem
        onClick={() => {
          setOpen(false);
          MeasurePolygon();
        }}
      >
        <BiArea className="w-5 h-5 mr-2" />
        {t("body.controls.draw.measure.area.title")}
      </DrawItem>
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
      <span className="text-sm dark:text-white text-center mt-3 mb-1 font-bold">
        {t("body.controls.draw.edit.title")}
      </span>
      <DrawItem
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
      </DrawItem>
      <DrawItem
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
      </DrawItem>
      <DrawItem
        onClick={() => {
          clearStore();
        }}
        disabled={editDisabled}
      >
        <BiTrash className="w-5 h-5 mr-2" />
        {t("body.controls.draw.delete-all.title")}
      </DrawItem>
    </div>
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
