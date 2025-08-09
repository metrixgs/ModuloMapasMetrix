import { useState } from "react";

import type { FeatureCollection } from "geojson";
import type { LayerMenuItemActionProps } from "@/types/LayerMenu";
import type { DivideFeaturesFilter } from "@/types/Stores/LayersManager";

import { Label, Select } from "flowbite-react";
import { BiSave, BiColumns } from "react-icons/bi";

import { useMapLayersStore } from "@/stores/useMapLayersStore";

import MenuItem from "@components/UI/Menu/MenuItem";
import SearchableCheckbox from "@components/UI/SearchableCheckbox/SearchableCheckbox";
import Button from "@components/UI/Button";
import ToolDescription from "@components/Pages/MapPage/Map/Tools/ToolDescription";

import {
  layerMenuSelectFeaturesCheckId,
  layerMenuSelectFeaturesColumnId,
} from "@/config.id";

const FilterByColumns = ({
  targetLayer,
  translation,
  auxModalState,
  setAuxModalState,
}: LayerMenuItemActionProps) => {
  const tref = "body.controls.layers.layer-menu.filters.cut-by-columns";

  const { appendFilter } = useMapLayersStore((state) => state);

  const handleFilter = () => {
    if (!auxModalState || !setAuxModalState) return;

    if (
      !(targetLayer.format === "geojson") ||
      !targetLayer.layer ||
      !targetLayer.columns
    )
      return;

    const AuxModalContent = () => {
      const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
      const [col, setCol] = useState<string>("");

      const targetGeoJSON = targetLayer.layer
        ? (targetLayer.layer.toGeoJSON() as FeatureCollection)
        : ({ type: "FeatureCollection", features: [] } as FeatureCollection);

      const handleExecute = async () => {
        const layerId = crypto.randomUUID();
        const filterDefinition: DivideFeaturesFilter = {
          id: layerId,
          name: targetLayer.name + " divide",
          selectedProps: selectedFeatures,
          target: targetLayer.id,
          type: "divideFeatures",
        };

        const mount = await appendFilter(filterDefinition);

        if (mount) {
          setAuxModalState({
            ...auxModalState,
            active: false,
          });
        } else {
          // TODO
        }
      };

      return (
        <div className="flex flex-col gap-2 items-center">
          <ToolDescription description={translation(tref + ".help")} />
          <div className="w-full flex items-center gap-2">
            <div className="w-52">
              <Label htmlFor={layerMenuSelectFeaturesColumnId}>
                {translation(tref + ".feature-column-label")}:
              </Label>
              <Select
                id={layerMenuSelectFeaturesColumnId}
                sizing="sm"
                value={col}
                onChange={(e) => {
                  setSelectedFeatures([]);
                  setCol(e.target.value);
                }}
              >
                <option value="">
                  {translation(tref + ".feature-column-placeholder")}
                </option>
                {targetLayer.columns
                  ? targetLayer.columns.map((col, index) => {
                      return (
                        <option key={index} value={(col as any).accessorKey}>
                          {col.header?.toString()}
                        </option>
                      );
                    })
                  : null}
              </Select>
            </div>
            <div className="flex-grow">
              <Label htmlFor={layerMenuSelectFeaturesCheckId}>
                {translation(tref + ".feature-features-label")}:
              </Label>
              <SearchableCheckbox
                placeholder={translation(tref + ".selected")}
                searchPlaceholder={translation(tref + ".search")}
                noResultPlaceholder={translation(tref + ".no-results")}
                options={targetGeoJSON.features.map((feature) => {
                  return {
                    title:
                      !col || !feature.properties || !feature.properties[col]
                        ? "null"
                        : String(feature.properties[col]),
                    value: JSON.stringify(feature.properties),
                  };
                })}
                selected={selectedFeatures}
                onChange={(e) => {
                  const value = e.target.value;
                  const search = selectedFeatures.includes(value);
                  const newSelectedFeatures = [...selectedFeatures];
                  if (search) {
                    const index = newSelectedFeatures.indexOf(value);
                    newSelectedFeatures.splice(index, 1);
                  } else {
                    newSelectedFeatures.push(value);
                  }
                  setSelectedFeatures(newSelectedFeatures);
                }}
                disabled={!col}
              />
            </div>
          </div>
          <Button
            className="h-8 w-fit text-sm justify-center"
            onClick={handleExecute}
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
