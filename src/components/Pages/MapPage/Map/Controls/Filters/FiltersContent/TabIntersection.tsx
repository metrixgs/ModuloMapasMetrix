import { useState } from "react";

import { useTranslation } from "react-i18next";

import { GeoJSON } from "leaflet";

import { Label, Select, HelperText, TextInput } from "flowbite-react";

import { PiIntersectFill } from "react-icons/pi";

import type { IntersectionFilter } from "@/types/Stores/LayersManager";

import { useMapLayersStore } from "@/stores/useMapLayersStore";

import Button from "@components/UI/Button";

import {
  filtersIntersectionTargetId,
  filtersIntersectionMaskId,
  filtersIntersectionResultNameId,
} from "@/config.id";

const TabIntersection = () => {
  const { t } = useTranslation("global");
  const {
    layers: layersManager,
    appendFilter,
    assignLayerToGroup
  } = useMapLayersStore((state) => state);

  const [targetId, setTargetId] = useState<string | undefined>(undefined);
  const [maskId, setMaskId] = useState<string | undefined>(undefined);
  const [resultName, setResultName] = useState<string>("");

  const targetLayers = Object.keys(layersManager)
    .map((layerId) => layersManager[layerId])
    .filter((layer) => layer.format === "geojson")
    .filter((layer) => layer.geometry === "Point");

  const maskLayers = Object.keys(layersManager)
    .map((layerId) => layersManager[layerId])
    .filter((layer) => layer.format === "geojson")
    .filter((layer) => layer.geometry === "Polygon");

  const handleExecute = async () => {
    if (!targetId || !maskId) {
      console.warn(`Failed to execute. "targetId" or "maskId" is not defined.`);
      return;
    };

    const {
      name: targetName
    } = layersManager[targetId];

    const {
      name: maskName,
      layer: maskLayer
    } = layersManager[maskId];

    if (!maskLayer || !(maskLayer instanceof GeoJSON)) {
      console.warn("Could not execute. The mask layer is not defined.");
      return;
    }

    const filter: IntersectionFilter = {
      id: crypto.randomUUID(), // `${targetName.toLowerCase().replaceAll(" ", "-")}-${maskName.toLowerCase().replaceAll(" ", "-")}-intersection`,
      type: "intersection",
      name: resultName ? resultName : `${targetName} - ${maskName} - intersection`,
      origin: maskLayer,
      target: targetId
    };

    const result = await appendFilter(filter);
    if (result) {
      assignLayerToGroup(filter.id, "metrix-filters");
    } else {
      // TODO
    }
  };

  return (
    <div className="flex flex-col gap-2 p-1">
      <HelperText>
        {t("body.controls.filters.tabs.intersection.description")}
      </HelperText>
      <div>
        <Label htmlFor={filtersIntersectionTargetId}>
          {t("body.controls.filters.tabs.intersection.target-label")}* :
        </Label>
        <Select
          id={filtersIntersectionTargetId}
          sizing="sm"
          value={targetId}
          onChange={(e) => setTargetId(e.target.value)}
        >
          <option value="">
            {t("body.controls.filters.tabs.intersection.target-placeholder")}
          </option>
          {targetLayers.map((layer, index) => {
            const { id, name, geometry } = layer;
            return (
              <option key={index} value={id}>
                { name } ({ geometry })
              </option>
            );
          })}
        </Select>
      </div>
      <div>
        <Label htmlFor={filtersIntersectionMaskId}>
          {t("body.controls.filters.tabs.intersection.mask-label")}* :
        </Label>
        <Select
          id={filtersIntersectionMaskId}
          sizing="sm"
          value={maskId}
          onChange={(e) => setMaskId(e.target.value)}
        >
          <option value="">
            {t("body.controls.filters.tabs.intersection.mask-placeholder")}
          </option>
          {maskLayers.map((layer, index) => {
            const { id, name, geometry } = layer;
            return (
              <option key={index} value={id}>
                { name } ({ geometry })
              </option>
            );
          })}
        </Select>
      </div>
      <div>
        <Label htmlFor={filtersIntersectionResultNameId}>
          {t("body.controls.filters.tabs.intersection.resultname-label")}:
        </Label>
        <TextInput
          id={filtersIntersectionResultNameId}
          sizing="sm"
          placeholder={t("body.controls.filters.tabs.intersection.resultname-placeholder")}
          value={resultName}
          onChange={(e) => setResultName(e.target.value)}
        />
      </div>
      <Button
        className="h-8 mt-2 text-sm font-bold justify-center"
        onClick={handleExecute}
        disabled={!targetId || !maskId}
      >
        <PiIntersectFill className="mr-2" />
        {t("body.controls.filters.tabs.intersection.execute")}
      </Button>
    </div>
  );
};

export default TabIntersection;
