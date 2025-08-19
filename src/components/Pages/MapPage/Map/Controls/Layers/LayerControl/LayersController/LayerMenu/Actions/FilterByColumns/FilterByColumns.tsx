import { useState } from "react";

import type { FeatureCollection } from "geojson";
import type { LayerMenuItemActionProps } from "@/types/LayerMenu";
import type { DivideFeaturesFilter } from "@/types/Stores/LayersManager";

import sift from "sift";

import classNames from "classnames";

import { Label } from "flowbite-react";
import { BiSave, BiColumns } from "react-icons/bi";

import { useMapLayersStore } from "@/stores/useMapLayersStore";
import { useModalErrorStore } from "@/stores/useModalErrorStore";

import MenuItem from "@components/UI/Menu/MenuItem";
import SearchableSelect from "@components/UI/SearchableSelect/SearchableSelect";
import SearchableCheckbox from "@components/UI/SearchableCheckbox/SearchableCheckbox";
import Button from "@components/UI/Button";
import ToolDescription from "@components/Pages/MapPage/Map/Tools/ToolDescription";

import {
  layerMenuSelectFeaturesCheckId,
  layerMenuSelectFeaturesColumnId,
} from "@/config.id";

import { extractGeoJSONProperties } from "@/utils/geometryUtils";

const FilterByColumns = ({
  targetLayer,
  translation,
  auxModalState,
  setAuxModalState,
}: LayerMenuItemActionProps) => {
  const tref = "body.controls.layers.tabs.layers.layer-menu.filters.filter-by-columns";

  const { appendFilter } = useMapLayersStore((state) => state);
  const { open, setChildren } = useModalErrorStore((state) => state);

  const handleFilter = () => {
    if (!auxModalState || !setAuxModalState) return;

    if (
      !(targetLayer.format === "geojson") ||
      !targetLayer.layer ||
      !targetLayer.columns
    )
      return;

    const AuxModalContent = () => {
      const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
      const [col, setCol] = useState<string>("");
      const [load, setLoad] = useState(false);

      const targetGeoJSON = targetLayer.layer
        ? (targetLayer.layer.toGeoJSON() as FeatureCollection)
        : ({ type: "FeatureCollection", features: [] } as FeatureCollection);

      const data = extractGeoJSONProperties(targetGeoJSON) as object[];
      const allOptions = targetGeoJSON.features.map(
        (f) => f.properties && f.properties[col]
      );

      const uniqueOptions = [...new Set(allOptions)];
      uniqueOptions.sort()

      console.log(uniqueOptions)

      const handleExecute = async () => {
        setLoad(true);

        const query = {
          $or: selectedOptions.map((value) => ({
            [col]: value,
          })),
        };

        const selectedProps = data.filter(sift(query));
        const selectedPropsString = selectedProps.map((i) => JSON.stringify(i));

        const layerId = crypto.randomUUID();
        const filterDefinition: DivideFeaturesFilter = {
          id: layerId,
          name: targetLayer.name + " divide",
          selectedProps: selectedPropsString,
          target: targetLayer.id,
          type: "divideFeatures",
        };

        const mount = await appendFilter(filterDefinition);

        setAuxModalState({
          ...auxModalState,
          active: false,
        });

        if (!mount) {
          setTimeout(() => {
            setChildren(<span>{translation(tref + ".execute-error")}</span>);
            open();
          }, 200);
        }

        setLoad(false);
      };

      return (
        <div className={classNames(
          "flex flex-col gap-2 items-center",
          {
            "animate-pulse pointer-events-none select-none": load,
          }
        )}>
          <ToolDescription description={translation(tref + ".help")} />
          <div className="w-full flex items-center gap-2">
            <div className="w-52">
              <Label htmlFor={layerMenuSelectFeaturesColumnId}>
                {translation(tref + ".feature-column-label")}:
              </Label>
              <SearchableSelect
                id={layerMenuSelectFeaturesColumnId}
                placeholder={translation(tref + ".selected")}
                searchPlaceholder={translation(tref + ".search")}
                noResultPlaceholder={translation(tref + ".no-results")}
                sizing="sm"
                value={col}
                onChange={(e) => {
                  setSelectedOptions([]);
                  setCol(e.target.value);
                }}
                options={
                  targetLayer.columns &&
                  targetLayer.columns.map((col) => ({
                    title: col.header ? col.header.toString() : "",
                    value: (col as any).accessorKey,
                  }))
                }
              />
            </div>
            <div className="flex-grow">
              <Label htmlFor={layerMenuSelectFeaturesCheckId}>
                {translation(tref + ".feature-features-label")}:
              </Label>
              <SearchableCheckbox
                placeholder={translation(tref + ".selected")}
                searchPlaceholder={translation(tref + ".search")}
                noResultPlaceholder={translation(tref + ".no-results")}
                options={uniqueOptions.map((op) => ({
                  title: op,
                  value: op,
                }))}
                selected={selectedOptions}
                onChange={(value) => {
                  const search = selectedOptions.includes(value);
                  const newSelectedFeatures = [...selectedOptions];
                  if (search) {
                    const index = newSelectedFeatures.indexOf(value);
                    newSelectedFeatures.splice(index, 1);
                  } else {
                    newSelectedFeatures.push(value);
                  }
                  setSelectedOptions(newSelectedFeatures);
                }}
                disabled={!col}
              />
            </div>
          </div>
          <Button
            className="h-8 w-fit text-sm justify-center"
            onClick={handleExecute}
            disabled={!col || selectedOptions.length === 0}
          >
            <BiSave className="mr-2" />
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
      <BiColumns className="w-5 h-5 mr-2" />
      <span>{translation(tref + ".button-title")}</span>
    </MenuItem>
  );
};

export default FilterByColumns;
