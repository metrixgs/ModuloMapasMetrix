import type { FeatureCollection } from "geojson";

import {
  SymbologyType as SymbologyTypeOptions,
  type GeoJSONLayerItem,
  type SymbologyType,
} from "@/types/Stores/LayersManager";

import { useState, type ChangeEventHandler } from "react";
import { useTranslation } from "react-i18next";

import { Select, Label, HelperText } from "flowbite-react";

import SimpleSymbologyController from "./SymbologyTypes/SimpleSymbologyController";
import CategorizedSymbologyController from "./SymbologyTypes/CategorizedSymbology/CategorizedSymbologyController";

import { useMapLayersStore } from "@/stores/useMapLayersStore";

import { extractGeoJSONProperties } from "@/utils/geometryUtils";

interface SymbologyControllerProps {
  layer: GeoJSONLayerItem;
}

const SymbologyController = ({ layer }: SymbologyControllerProps) => {
  const { t } = useTranslation("global");
  const tref = "body.controls.layers.tabs.symbology.controller.form";

  const { setLayerSymbology } = useMapLayersStore((state) => state);

  const { symbology, geometry } = layer;

  const [type, setType] = useState<SymbologyType | undefined>(symbology?.type);

  const data = layer.layer
    ? extractGeoJSONProperties(layer.layer.toGeoJSON() as FeatureCollection)
    : [];

  const handleSelect: ChangeEventHandler<HTMLSelectElement> = (e) => {
    let value = e.target.value;
    if (
      value !== SymbologyTypeOptions.CATEGORIZED &&
      value !== SymbologyTypeOptions.SIMPLE
    ) {
      setType(undefined);
      return;
    }

    setType(value);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full">
        <Label>{t(tref + ".type-label")}:</Label>
        <Select value={type} onChange={handleSelect} sizing="sm">
          <option value="">{t(tref + ".type-option-undefined")}</option>
          <option value={SymbologyTypeOptions.SIMPLE}>
            {t(tref + ".type-option-simple")}
          </option>
          <option value={SymbologyTypeOptions.CATEGORIZED}>
            {t(tref + ".type-option-categorized")}
          </option>
        </Select>
        <HelperText>
          {
            type === SymbologyTypeOptions.SIMPLE ? (
              t(tref + ".type-simple-help")
            ) : (
              t(tref + ".type-categorized-help")
            )
          }
        </HelperText>
      </div>
      {type
        ? {
            [SymbologyTypeOptions.SIMPLE]: (
              <SimpleSymbologyController
                layerGeometry={geometry}
                initialSymbology={symbology}
                onSymbologyChange={(newSymbology) =>
                  setLayerSymbology(layer.id, newSymbology)
                }
              />
            ),
            [SymbologyTypeOptions.CATEGORIZED]: (
              <CategorizedSymbologyController
                layerGeometry={geometry}
                initialSymbology={symbology}
                onSymbologyChange={(newSymbology) =>
                  setLayerSymbology(layer.id, newSymbology)
                }
                data={data as Record<string, unknown>[]}
              />
            ),
          }[type]
        : null}
    </div>
  );
};

export default SymbologyController;
