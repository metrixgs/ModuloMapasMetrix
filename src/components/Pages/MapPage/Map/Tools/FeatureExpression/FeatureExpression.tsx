import { useState } from "react";
import { useTranslation } from "react-i18next";
import sift from "sift";

import type { FeatureCollection } from "geojson";
import type {
  GeoJSONLayerItem,
  DivideFeaturesFilter,
} from "@/types/Stores/LayersManager";
import { type QueryChangeEvent } from "@/types/Filters/ColumnFilter";

import { Label, Select, TextInput } from "flowbite-react";
import { BiMath, BiPlus, BiTrash } from "react-icons/bi";

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
  const columns = selectedLayerItem ? selectedLayerItem.columns : undefined;

  const [queryItems, setQueryItems] = useState<
    { [key: string]: object } | undefined
  >();

  const [resultName, setResultName] = useState<string | undefined>();

  const data =
    selectedLayerItem && selectedLayerItem.layer
      ? (extractGeoJSONProperties(
          selectedLayerItem.layer.toGeoJSON() as FeatureCollection
        ) as object[])
      : [];

  const fieldTypes =
    selectedLayerItem && selectedLayerItem.layer && inferFieldTypes(data);

  const handleQueryChange = (e: QueryChangeEvent) => {
    const { queryId, query } = e;
    if (queryItems && query) {
      setQueryItems({
        ...queryItems,
        [queryId]: query,
      });
    }
  };

  const handleDeleteQueryItem = (id: string) => {
    if (queryItems) {
      const newQueryItems = { ...queryItems };
      delete newQueryItems[id];
      setQueryItems(newQueryItems);
    }
  };

  const handleExecute = () => {
    if (selectedLayerItem && queryItems) {
      const query = {
        $or: Object.keys(queryItems).map((item) => queryItems[item]),
      };
      console.log(query);
      const selectedFeatures = data.filter(sift(query));
      console.log(selectedFeatures)
      const selectedFeaturesString = selectedFeatures.map((i) =>
        JSON.stringify(i)
      );
      const filterItem: DivideFeaturesFilter = {
        id: crypto.randomUUID(),
        type: "divideFeatures",
        name: resultName ? resultName : selectedLayerItem.name + " expression",
        selectedProps: selectedFeaturesString,
        target: selectedLayerItem.id,
      };
      appendFilter(filterItem);
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
        {selectedLayerItem && columns && fieldTypes ? (
          <div className="flex flex-col items-center p-2 gap-6 border border-gray-200 dark:border-gray-600 rounded-lg">
            {queryItems &&
              Object.keys(queryItems).map((item, index) => (
                <div className="w-full flex gap-1" key={index}>
                  <FeatureExpressionItem
                    queryId={item}
                    columns={columns.map((c) => ({
                      header: c.header?.toString() || "",
                      type: fieldTypes[(c as any).accessorKey || ""],
                    }))}
                    onQueryChange={handleQueryChange}
                  />
                  <Button
                    className="justify-center"
                    onClick={() => {
                      handleDeleteQueryItem(item);
                    }}
                  >
                    <BiTrash />
                  </Button>
                </div>
              ))}
            <Button
              className="h-8 w-fit justify-center"
              onClick={() =>
                setQueryItems({
                  ...queryItems,
                  [crypto.randomUUID()]: {},
                })
              }
            >
              <BiPlus className="" />
            </Button>
          </div>
        ) : (
          <p className="text-center text-sm dark:text-white">
            {t(tref + ".target-error")}
          </p>
        )}
      </div>
      <div>
        <Label>Nombre del resultado</Label>
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
