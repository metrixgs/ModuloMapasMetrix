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

import { useMapStore } from "@/stores/useMapStore";

import { MapControl } from "@components/Map/Controls/MapControl";
import DrawItem from "./DrawItem";

import DrawRectangle from "./interactions/DrawRectangle";
import DrawCircle from "./interactions/DrawCircle";
import DrawPolygon from "./interactions/DrawPolygon";

const DrawContent = () => {
  const { map } = useMapStore();
  return (
    <div className="flex flex-col py-2">
      <DrawItem
        onClick={() => {
          if (map) {
            DrawRectangle(map);
          }
        }}
      >
        <BiShapeSquare className="w-5 h-5 mr-2" />
        Trazo rectángulo
      </DrawItem>
      <DrawItem
        onClick={() => {
          if (map) {
            DrawCircle(map);
          }
        }}
      >
        <BiShapeCircle className="w-5 h-5 mr-2" />
        Trazo círculo
      </DrawItem>
      <DrawItem
        onClick={() => {
          if (map) {
            DrawPolygon(map);
          }
        }}
      >
        <BiShapePolygon className="w-5 h-5 mr-2" />
        Trazo polígono
      </DrawItem>
      <DrawItem>
        <BiRuler className="w-5 h-5 mr-2" />
        Medición de distancia
      </DrawItem>
      <DrawItem>
        <BiArea className="w-5 h-5 mr-2" />
        Superficie de un área
      </DrawItem>
      <DrawItem>
        <BiEditAlt className="w-5 h-5 mr-2" />
        Edición de trazo
      </DrawItem>
      <DrawItem
        onClick={() => {
          const shapes = map?.pm.getGeomanLayers();
          console.log(shapes);
        }}
      >
        <BiEraser className="w-5 h-5 mr-2" />
        Eliminar trazo
      </DrawItem>
    </div>
  );
};

const Draw = () => {
  return (
    <Popover placement="left" content={<DrawContent />}>
      <MapControl>
        <BiEdit className="w-4 h-4" />
      </MapControl>
    </Popover>
  );
};

export default Draw;
