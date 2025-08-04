import { useState } from "react";
import { useTranslation } from "react-i18next";
import sift from "sift";

import type { FeatureCollection } from "geojson";
import type { GeoJSONLayerItem, DivideFeaturesFilter } from "@/types/Stores/LayersManager";

import { Label, Select, TextInput } from "flowbite-react";
import { BiMath } from "react-icons/bi";

import ToolDescription from "../ToolDescription";
import FeatureExpressionItem from "./FeatureExpressionItem";
import Button from "@components/UI/Button";

import { useMapLayersStore } from "@/stores/useMapLayersStore";

import { inferFieldTypes } from "@/utils/jsonUtils";
import { extractGeoJSONProperties } from "@/utils/geometryUtils";

const FeatureExpression = () => {
  const { t } = useTranslation("global");
  const tref = "body.tools.feature-expression";

  const { layers, appendFilter } = useMapLayersStore((state) => state);

  const targetLayerItems = Object.keys(layers)
    .map((i) => layers[i])
    .filter((l) => l.format === "geojson");

  const [selectedLayerItem, setSelectedLayerItem] = useState<
    GeoJSONLayerItem | undefined
  >();

  const [filterQuery, setFilterQuery] = useState({});

  const [resultName, setResultName] = useState<string | undefined>();

  const data =
    selectedLayerItem && selectedLayerItem.layer
      ? (extractGeoJSONProperties(
          selectedLayerItem.layer.toGeoJSON() as FeatureCollection
        ) as object[])
      : [];

  const fieldTypes =
    selectedLayerItem && selectedLayerItem.layer && inferFieldTypes(data);

  const handleExecute = () => {
    if (selectedLayerItem) {
      const selectedFeatures = data.filter(sift(filterQuery));
      const selectedFeaturesString = selectedFeatures.map(i => JSON.stringify(i));
      const filterItem: DivideFeaturesFilter = {
        id: crypto.randomUUID(),
        type: "divideFeatures",
        name: resultName ? resultName : selectedLayerItem.name + " expression",
        selectedProps: selectedFeaturesString,
        target: selectedLayerItem.id,
      }
      appendFilter(filterItem);

      console.log(filterQuery);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-1">
      <ToolDescription description={t(tref + ".description")} />
      <div>
        <Label>{t(tref + ".target-label")}</Label>
        <Select
          sizing="sm"
          value={selectedLayerItem?.id}
          onChange={(e) => {
            const targetLayerItem = targetLayerItems.find(
              (l) => l.id === e.target.value
            );
            setSelectedLayerItem(targetLayerItem);
          }}
        >
          <option value="">{t(tref + ".target-placeholder")} ...</option>
          {targetLayerItems.map((l, i) => (
            <option key={i} value={l.id}>
              {l.name} ({l.geometry})
            </option>
          ))}
        </Select>
      </div>
      <div>
        {selectedLayerItem && selectedLayerItem.columns && fieldTypes ? (
          <div className="flex flex-col gap-2">
            <FeatureExpressionItem
              columns={selectedLayerItem.columns.map((c) => ({
                header: c.header?.toString() || "",
                type: fieldTypes[(c as any).accessorKey || ""],
              }))}
              filter={filterQuery}
              setFilter={setFilterQuery}
            />
          </div>
        ) : (
          <p className="text-center text-sm dark:text-white">
            {t(tref + ".target-error")}
          </p>
        )}
      </div>
      <div>
        <Label>
          Nombre del resultado
        </Label>
        <TextInput
          value={resultName}
          onChange={(e) => setResultName(e.target.value)}
          sizing="sm"
        />
      </div>
      <Button
        className="h-8 mt-2 text-sm font-bold justify-center"
        onClick={handleExecute}
      >
        <BiMath className="mr-2" />
        {t("body.tools.intersection.execute")}
      </Button>
    </div>
  );
};

export default FeatureExpression;
