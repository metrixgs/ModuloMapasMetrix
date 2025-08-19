import type { FeatureCollection } from "geojson";
import type { DivideFeaturesFilter } from "@/types/Stores/LayersManager";
import type { QueryChangeEvent } from "@/types/Filters/ColumnFilter";
import type { LayerMenuItemActionProps } from "@/types/LayerMenu";

import { useState } from "react";

import sift from "sift";

import classNames from "classnames";

import { HelperText, Label, Select, TextInput } from "flowbite-react";
import { BiMath, BiPlus, BiTrash } from "react-icons/bi";

import { useMapLayersStore } from "@/stores/useMapLayersStore";
import { useModalErrorStore } from "@/stores/useModalErrorStore";

import FeatureByExpressionItem from "./FilterByExpressionItem";
import MenuItem from "@components/UI/Menu/MenuItem";
import ToolDescription from "@components/Pages/MapPage/Map/Tools/ToolDescription";
import Button from "@components/UI/Button";

import {
  filtersExpressionResultNameId,
  filtersExpressionModeId,
} from "@/config.id";

import { extractGeoJSONProperties } from "@/utils/geometryUtils";
import { inferFieldTypes } from "@/utils/jsonUtils";

const FilterByExpression = ({
  targetLayer,
  translation,
  auxModalState,
  setAuxModalState,
}: LayerMenuItemActionProps) => {
  const tref = "body.controls.layers.tabs.layers.layer-menu.filters.filter-by-expression";

  const handleFilter = () => {
    if (!auxModalState || !setAuxModalState) return;

    if (
      !(targetLayer.format === "geojson") ||
      !targetLayer.layer ||
      !targetLayer.columns
    )
      return;

    const AuxModalContent = () => {
      const { id, columns, layer, name } = targetLayer;
      const { appendFilter } = useMapLayersStore((state) => state);
      const { open, setChildren } = useModalErrorStore((state) => state);

      const [queryItems, setQueryItems] = useState<{ [key: string]: object }>();

      const [resultName, setResultName] = useState<string>();

      const [unionMode, setUnionMode] = useState<string>("$and");

      const [load, setLoad] = useState(false);

      const data = layer
        ? (extractGeoJSONProperties(
            layer.toGeoJSON() as FeatureCollection
          ) as object[])
        : [];

      const fieldTypes = layer && inferFieldTypes(data);

      const expressionsAreValid = () => {
        for (const key in queryItems) {
          const query = queryItems[key];

          if (Object.keys(query).length === 0) {
            return false;
          }
        }
        return true;
      }

      const handleQueryChange = (e: QueryChangeEvent) => {
        const { queryId, query } = e;
        if (queryItems && query) {
          setQueryItems({ ...queryItems, [queryId]: query });
        }
      };

      const handleDeleteQueryItem = (id: string) => {
        if (queryItems) {
          const newQueryItems = { ...queryItems };
          delete newQueryItems[id];
          setQueryItems(newQueryItems);
        }
      };

      const handleExecute = async () => {
        setLoad(true);

        if (queryItems) {
          const query = {
            [unionMode]: Object.keys(queryItems).map(
              (item) => queryItems[item]
            ),
          };
          const selectedFeatures = data.filter(sift(query));
          const selectedFeaturesString = selectedFeatures.map((i) =>
            JSON.stringify(i)
          );

          const filterItem: DivideFeaturesFilter = {
            id: crypto.randomUUID(),
            type: "divideFeatures",
            name: resultName ? resultName : name + " expression",
            selectedProps: selectedFeaturesString,
            target: id,
          };
          const mount = await appendFilter(filterItem);
          setAuxModalState({ ...auxModalState, active: false });
          if (!mount) {
            setTimeout(() => {
              setChildren(<span>{translation(tref + ".execute-error")}</span>);
              open();
            }, 200);
          }
        }

        setLoad(false);
      };

      return (
        <div
          className={classNames("flex flex-col gap-4 p-1", {
            "animate-pulse pointer-events-none select-none": load,
          })}
        >
          <ToolDescription description={translation(tref + ".description")} />
          <div>
            <Label htmlFor={filtersExpressionModeId}>
              {translation(tref + ".mode-label")}:
            </Label>
            <Select
              id={filtersExpressionModeId}
              value={unionMode}
              onChange={(e) => setUnionMode(e.target.value)}
            >
              <option value="$and">
                {translation(tref + ".mode-y-title")}
              </option>
              <option value="$or">
                {translation(tref + ".mode-or-title")}
              </option>
            </Select>
            <HelperText>
              {unionMode === "$and"
                ? translation(tref + ".mode-y-help")
                : translation(tref + ".mode-or-help")}
            </HelperText>
          </div>
          <div>
            {columns && fieldTypes ? (
              <div className="flex flex-col items-center p-2 gap-6 border border-gray-200 dark:border-gray-600 rounded-lg">
                {queryItems &&
                  Object.keys(queryItems).map((item, index) => (
                    <div className="w-full flex gap-1" key={index}>
                      <FeatureByExpressionItem
                        queryId={item}
                        columns={columns.map((c) => ({
                          header: (c as any).accessorKey || "",
                          type: fieldTypes[(c as any).accessorKey || ""],
                        }))}
                        onQueryChange={handleQueryChange}
                        translation={translation}
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
                    setQueryItems({ ...queryItems, [crypto.randomUUID()]: {} })
                  }
                >
                  <BiPlus />
                </Button>
              </div>
            ) : (
              <p className="text-center text-sm dark:text-white">
                {translation(tref + ".target-error")}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor={filtersExpressionResultNameId}>
              {translation(tref + ".resultname-label")}:
            </Label>
            <TextInput
              id={filtersExpressionResultNameId}
              value={resultName}
              onChange={(e) => setResultName(e.target.value)}
              sizing="sm"
              disabled={!queryItems || Object.keys(queryItems).length === 0}
            />
          </div>
          <Button
            className="h-8 mt-2 text-sm font-bold justify-center"
            onClick={handleExecute}
            disabled={
              !queryItems ||
              Object.keys(queryItems).length === 0 ||
              !(expressionsAreValid())
            }
          >
            <BiMath className="mr-2" />
            {translation(tref + ".execute")}
          </Button>
        </div>
      );
    };

    setAuxModalState({
      active: true,
      content: <AuxModalContent />,
    });
  };

  return (
    <MenuItem onClick={handleFilter}>
      <BiMath className="w-5 h-5 mr-2" />
      <span>{translation(tref + ".title")}</span>
    </MenuItem>
  );
};

export default FilterByExpression;
