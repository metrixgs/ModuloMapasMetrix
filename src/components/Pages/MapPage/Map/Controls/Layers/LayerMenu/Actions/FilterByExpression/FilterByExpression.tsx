import type { FeatureCollection } from "geojson";
import type { DivideFeaturesFilter } from "@/types/Stores/LayersManager";
import type { QueryChangeEvent } from "@/types/Filters/ColumnFilter";
import type { LayerMenuItemActionProps } from "@/types/LayerMenu";

import { useState } from "react";
import sift from "sift";

import { Label, TextInput } from "flowbite-react";
import { BiMath, BiPlus, BiTrash } from "react-icons/bi";

import { useMapLayersStore } from "@/stores/useMapLayersStore";

import FeatureByExpressionItem from "./FilterByExpressionItem";
import MenuItem from "@components/UI/Menu/MenuItem";
import ToolDescription from "@components/Pages/MapPage/Map/Tools/ToolDescription";
import Button from "@components/UI/Button";

import { filtersExpressionResultNameId } from "@/config.id";

import { extractGeoJSONProperties } from "@/utils/geometryUtils";
import { inferFieldTypes } from "@/utils/jsonUtils";

const FilterByExpression = ({
  targetLayer,
  translation,
  auxModalState,
  setAuxModalState,
}: LayerMenuItemActionProps) => {
  const tref = "body.controls.layers.layer-menu.feature-expression";

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

      const [queryItems, setQueryItems] = useState<{ [key: string]: object }>();

      const [resultName, setResultName] = useState<string>();

      const data = layer
        ? extractGeoJSONProperties(layer.toGeoJSON() as FeatureCollection) as object[]
        : [];
      
      console.log(data);
      const fieldTypes = layer && inferFieldTypes(data);

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

      const handleExecute = () => {
        console.log(queryItems);
        if (queryItems) {
          const query = {
            $or: Object.keys(queryItems).map((item) => queryItems[item]),
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
          appendFilter(filterItem);

          console.log(query);
          console.log(selectedFeatures);
          setAuxModalState({ ...auxModalState, active: false });
        }
      };

      return (
        <div className="flex flex-col gap-4 p-1">
          <ToolDescription description={translation(tref + ".description")} />
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
            disabled={!queryItems || Object.keys(queryItems).length === 0}
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
