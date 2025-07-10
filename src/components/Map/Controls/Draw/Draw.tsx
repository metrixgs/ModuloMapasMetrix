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
import MeasureRectangle from "./interactions/MeasureRectangle";

const DrawContent = () => {
  const { clearStore } = useDrawStore((state) => state);

  return (
    <div className="flex flex-col py-2">
      <DrawItem onClick={CreateRectangle}>
        <BiShapeSquare className="w-5 h-5 mr-2" />
        Trazo rectángulo
      </DrawItem>
      <DrawItem onClick={CreateCircle}>
        <BiShapeCircle className="w-5 h-5 mr-2" />
        Trazo círculo
      </DrawItem>
      <DrawItem onClick={CreatePolygon}>
        <BiShapePolygon className="w-5 h-5 mr-2" />
        Trazo polígono
      </DrawItem>
      <DrawItem onClick={MeasureLine}>
        <BiRuler className="w-5 h-5 mr-2" />
        Medición de distancia
      </DrawItem>
      <DrawItem onClick={MeasureRectangle}>
        <BiArea className="w-5 h-5 mr-2" />
        Superficie de un área
      </DrawItem>
      <DrawItem>
        <BiEditAlt className="w-5 h-5 mr-2" />
        Edición de trazo
      </DrawItem>
      <DrawItem onClick={clearStore}>
        <BiEraser className="w-5 h-5 mr-2" />
        Eliminar trazo
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
