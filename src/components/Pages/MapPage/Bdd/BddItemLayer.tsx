import type { LayerGroupItem, LayerItem } from "@/types/Stores/LayersManager";
import type { Dispatch, SetStateAction } from "react";

import { useTranslation } from "react-i18next";

import classNames from "classnames";

import { TbPoint, TbLine, TbPolygon } from "react-icons/tb";
import { BiGridAlt } from "react-icons/bi";

import { useModalStore } from "@/stores/useModalStore";
import { useModalErrorStore } from "@/stores/useModalErrorStore";

import AddLayer from "../Map/Layers/AddLayer/AddLayer";

interface BddItemLayerProps {
  setLoad: Dispatch<SetStateAction<boolean>>;
  layerItem: LayerItem;
  groupItem: LayerGroupItem;
}

const BddItemLayer = ({ setLoad, layerItem, groupItem }: BddItemLayerProps) => {
  const { t } = useTranslation("global");
  const tref = "body.bdd";

  const { name, description, thumbnail } = layerItem;
  const { close } = useModalStore((state) => state);
  const {
    open: openModalError,
    setChildren: setModalErrorChildren
  } = useModalErrorStore((state) => state);

  const handleUpload = async () => {
    setLoad(true);
    const { status, message } = await AddLayer({
      layer: layerItem,
      group: groupItem,
    });

    if (!status) {
      console.log(message);
      setModalErrorChildren(
        <span>
          {t(tref + ".load-error")}: <span className="font-semibold">{layerItem.name}</span>.
        </span>
      );
      openModalError();
    }

    setLoad(false);
    close();
  };

  return (
    <div
      className={classNames(
        "h-64 w-64",
        "transition-transform duration-300 hover:scale-105 hover:cursor-pointer",
        "border border-gray-300 dark:border-gray-600",
        "rounded-lg"
      )}
      onClick={handleUpload}
    >
      {thumbnail ? (
        <img
          className="rounded-t-lg w-full h-2/3 object-cover"
          src={thumbnail}
          alt={description}
        />
      ) : (
        <div className="rounded-t-lg w-full h-2/3 bg-gray-500 text-white flex items-center justify-center">
          {t(tref + ".image-not-found")}
        </div>
      )}
      <div className="h-1/3 py-3 px-2 tracking-tight text-md flex flex-col">
        <h5 className="flex justify-between items-center font-semibold text-sm">
          <span>{name}</span>
          <span>
            {layerItem.format === "geojson" ? (
              {
                Point: <TbPoint className="h-6 w-6" />,
                LineString: <TbLine className="h-6 w-6" />,
                Polygon: <TbPolygon className="h-6 w-6" />,
              }[layerItem.geometry]
            ) : (
              <BiGridAlt className="h-6 w-6" />
            )}
          </span>
        </h5>
        <span className="text-xs">{description}</span>
      </div>
    </div>
  );
};

export default BddItemLayer;
