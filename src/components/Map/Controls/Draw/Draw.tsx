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

const DrawContent = () => {
  const { t } = useTranslation("global");

  const { features, clearStore, isEditModeActive } = useDrawStore((state) => state);

  const editDisabled = !features;

  return (
    <div className="flex flex-col py-2">
      <DrawItem onClick={CreateRectangle}>
        <BiShapeSquare className="w-5 h-5 mr-2" />
        { t("body.controls.draw.create.rectangle.title") }
      </DrawItem>
      <DrawItem onClick={CreateCircle}>
        <BiShapeCircle className="w-5 h-5 mr-2" />
        { t("body.controls.draw.create.circle.title") }
      </DrawItem>
      <DrawItem onClick={CreatePolygon}>
        <BiShapePolygon className="w-5 h-5 mr-2" />
        { t("body.controls.draw.create.polygon.title") }
      </DrawItem>
      <DrawItem onClick={MeasureLine}>
        <BiRuler className="w-5 h-5 mr-2" />
        { t("body.controls.draw.measure.distance.title") }
      </DrawItem>
      <DrawItem onClick={MeasurePolygon}>
        <BiArea className="w-5 h-5 mr-2" />
        { t("body.controls.draw.measure.area.title") }
      </DrawItem>
      <DrawItem onClick={ToggleEdit} disabled={editDisabled}>
        <BiEditAlt className="w-5 h-5 mr-2" />
        {
          isEditModeActive
            ? t("body.controls.draw.edit.deactive.title")
            : t("body.controls.draw.edit.active.title")
        }
      </DrawItem>
      <DrawItem onClick={clearStore}>
        <BiEraser className="w-5 h-5 mr-2" />
        { t("body.controls.draw.delete.title") }
      </DrawItem>
    </div>
  );
};

const Draw = () => {
  return (
    <>
      <Popover placement="left" content={<DrawContent />}>
        <MapControl>
          <BiEdit className="w-4 h-4" />
        </MapControl>
      </Popover>
      <MeasureResult />
    </>
  );
};

export default Draw;
