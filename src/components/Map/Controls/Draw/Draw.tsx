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

import { MapControl } from "@components/Map/Controls/MapControl";

const DrawItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-48 px-2 py-2 flex items-center text-sm dark:text-white hover:cursor-pointer hover:bg-primary-400 dark:hover:bg-primary-500">
      {children}
    </div>
  );
};

const DrawContent = () => {
  return (
    <div className="flex flex-col py-2">
      <DrawItem>
        <BiShapeSquare className="w-5 h-5 mr-2" />
        Trazo rectángulo
      </DrawItem>
      <DrawItem>
        <BiShapeCircle className="w-5 h-5 mr-2" />
        Trazo círculo
      </DrawItem>
      <DrawItem>
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
      <DrawItem>
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
