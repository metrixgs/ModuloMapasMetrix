import { useState } from "react";

import { useTranslation } from "react-i18next";

import classNames from "classnames";

import { Label, Select, HelperText, TextInput, Checkbox } from "flowbite-react";

import { PiIntersectFill } from "react-icons/pi";

import { geoJSON, GeoJSON } from "leaflet";

import type { FeatureCollection } from "geojson";

import type { IntersectionFilter } from "@/types/Stores/LayersManager";

import { useMapLayersStore } from "@/stores/useMapLayersStore";

import Button from "@components/UI/Button";
import ToolDescription from "@components/Pages/MapPage/Map/Tools/ToolDescription";

import {
  filtersIntersectionTargetId,
  filtersIntersectionMaskId,
  filtersIntersectionResultNameId,
  filtersIntersectionFeatureCheckId,
  filtersIntersectionFeatureColumnId,
  filtersIntersectionFeatureFeaturesId,
} from "@/config.id";
import SearchableCheckbox from "@components/UI/SearchableCheckbox/SearchableCheckbox";

const Intersection = () => {
  const { t } = useTranslation("global");
  const {
    layers: layersManager,
    appendFilter,
    assignLayerToGroup,
  } = useMapLayersStore((state) => state);

  const [targetId, setTargetId] = useState<string | undefined>(undefined);
  const [maskId, setMaskId] = useState<string | undefined>(undefined);
  const [resultName, setResultName] = useState<string>("");

  const [filterMask, setFilterMask] = useState<boolean>(false);
  const [filterMaskCol, setFilterMaskCol] = useState<string | undefined>();
  const [filteredMaskFeatures, setFilteredMaskFeatures] = useState<string[]>(
    []
  );

  const targetLayerItems = Object.keys(layersManager)
    .map((id) => layersManager[id])
    .filter((l) => l.format === "geojson")
    .filter((l) => l.geometry === "Point");

  const maskLayerItems = Object.keys(layersManager)
    .map((id) => layersManager[id])
    .filter((l) => l.format === "geojson")
    .filter((l) => l.geometry === "Polygon");

  const maskLayerItem = maskId
    ? maskLayerItems.find((l) => l.id === maskId)
    : undefined;

  const maskGeoJSON =
    maskLayerItem && maskLayerItem.layer
      ? (maskLayerItem.layer.toGeoJSON() as FeatureCollection)
      : ({ type: "FeatureCollection", features: [] } as FeatureCollection);

  const originGeoJSON =
    !filterMask || filteredMaskFeatures.length === 0
      ? maskGeoJSON
      : ({
          type: "FeatureCollection",
          features: maskGeoJSON.features.filter((f) =>
            filteredMaskFeatures.includes(JSON.stringify(f.properties))
          ),
        } as FeatureCollection);

  const handleExecute = async () => {
    if (!targetId || !maskId) {
      console.warn(`Failed to execute. "targetId" or "maskId" is not defined.`);
      return;
    }

    const { name: targetName } = layersManager[targetId];
    const { name: maskName, layer: maskLayer } = layersManager[maskId];

    if (!maskLayer || !(maskLayer instanceof GeoJSON)) {
      console.warn("Could not execute. The mask layer is not defined.");
      return;
    }

    const filter: IntersectionFilter = {
      id: crypto.randomUUID(), // `${targetName.toLowerCase().replaceAll(" ", "-")}-${maskName.toLowerCase().replaceAll(" ", "-")}-intersection`,
      type: "intersection",
      name: resultName
        ? resultName
        : `${targetName} - ${maskName} - intersection`,
      origin: geoJSON(originGeoJSON),
      target: targetId,
    };

    const result = await appendFilter(filter);
    if (result) {
      assignLayerToGroup(filter.id, "metrix-filters");
    } else {
      // TODO
    }
  };

  return (
    <div className="flex flex-col gap-4 p-1">
      <ToolDescription description={t("body.tools.intersection.description")} />
      <div>
        <Label htmlFor={filtersIntersectionTargetId}>
          {t("body.tools.intersection.target-label")}* :
        </Label>
        <Select
          id={filtersIntersectionTargetId}
          sizing="sm"
          value={targetId}
          onChange={(e) => setTargetId(e.target.value)}
        >
          <option value="">
            {t("body.tools.intersection.target-placeholder")} {"..."}
          </option>
          {targetLayerItems.map((layer, index) => {
            const { id, name, geometry } = layer;
            return (
              <option key={index} value={id}>
                {name} ({geometry})
              </option>
            );
          })}
        </Select>
      </div>
      <div>
        <Label htmlFor={filtersIntersectionMaskId}>
          {t("body.tools.intersection.mask-label")}* :
        </Label>
        <Select
          id={filtersIntersectionMaskId}
          sizing="sm"
          value={maskId}
          onChange={(e) => {
            setFilterMaskCol("");
            setFilteredMaskFeatures([]);
            setMaskId(e.target.value);
          }}
          disabled={!targetId}
        >
          <option value="">
            {t("body.tools.intersection.mask-placeholder")} {"..."}
          </option>
          {maskLayerItems.map((layer, index) => {
            const { id, name, geometry } = layer;
            return (
              <option key={index} value={id}>
                {name} ({geometry})
              </option>
            );
          })}
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <div
            className={classNames("flex items-center justify-between", {
              "opacity-50": !maskId,
            })}
          >
            <Label htmlFor={filtersIntersectionFeatureCheckId}>
              {t("body.tools.intersection.feature-check-label")}
            </Label>
            <Checkbox
              id={filtersIntersectionFeatureCheckId}
              disabled={!maskId}
              checked={filterMask}
              onChange={() => setFilterMask(!filterMask)}
            />
          </div>
          <HelperText className="text-xs">
            {t("body.tools.intersection.feature-help")}
          </HelperText>
        </div>
        <div
          className={classNames("flex items-center gap-2", {
            hidden: !filterMask,
          })}
        >
          <div className="w-32">
            <Label htmlFor={filtersIntersectionFeatureColumnId}>
              {t("body.tools.intersection.feature-column-label")}:
            </Label>
            <Select
              id={filtersIntersectionFeatureColumnId}
              sizing="sm"
              value={filterMaskCol}
              onChange={(e) => {
                setFilteredMaskFeatures([]);
                setFilterMaskCol(e.target.value);
              }}
              disabled={!filterMask}
            >
              <option value="">
                {t("body.tools.intersection.feature-column-placeholder")}{" "}
                {"..."}
              </option>
              {maskLayerItem && maskLayerItem.columns
                ? maskLayerItem.columns.map((col, index) => {
                    return (
                      <option key={index} value={col.header?.toString()}>
                        {col.header?.toString()}
                      </option>
                    );
                  })
                : null}
            </Select>
          </div>
          <div className="flex-grow">
            <Label htmlFor={filtersIntersectionFeatureFeaturesId}>
              {t("body.tools.intersection.feature-features-label")}:
            </Label>
            <SearchableCheckbox
              placeholder={t(
                "body.tools.intersection.feature-features-placeholder"
              )}
              searchPlaceholder={
                t("body.tools.intersection.feature-features-search") + "..."
              }
              noResultPlaceholder={t(
                "body.tools.intersection.feature-features-noresult"
              )}
              options={maskGeoJSON.features.map((feature) => ({
                title:
                  !feature.properties ||
                  !filterMaskCol ||
                  !feature.properties[filterMaskCol]
                    ? "null"
                    : String(feature.properties[filterMaskCol]),
                value: JSON.stringify(feature.properties),
              }))}
              selected={filteredMaskFeatures}
              onChange={(e) => {
                const value = e.target.value;
                const search = filteredMaskFeatures.includes(value);
                const newFilteredMaskFeatures = [...filteredMaskFeatures];
                if (search) {
                  const index = newFilteredMaskFeatures.indexOf(value);
                  newFilteredMaskFeatures.splice(index, 1);
                } else {
                  newFilteredMaskFeatures.push(value);
                }
                setFilteredMaskFeatures(newFilteredMaskFeatures);
              }}
              disabled={!filterMaskCol}
            />
            {/* <Popover
              open={openPopoverFilterMask}
              onOpenChange={setOpenPopoverFilterMask}
              content={
                <div className="max-h-48 min-w-40 p-4 overflow-y-auto flex flex-col gap-1">
                  {maskGeoJSON?.features.map((feature, index) => {
                    const featurePropsString = JSON.stringify(
                      feature.properties
                    );
                    const search =
                      filteredMaskFeatures.includes(featurePropsString);

                    return (
                      <div className="flex" key={index}>
                        <Checkbox
                          id={"filter-feature-checkbox-" + index}
                          className="mr-2"
                          checked={search}
                          onChange={() => {
                            if (search) {
                              const newFilteredFeatures = [
                                ...filteredMaskFeatures,
                              ];
                              const index =
                                newFilteredFeatures.indexOf(featurePropsString);
                              newFilteredFeatures.splice(index, 1);
                              setFilteredMaskFeatures(newFilteredFeatures);
                            } else {
                              const newFilteredFeatures = [
                                ...filteredMaskFeatures,
                              ];
                              newFilteredFeatures.push(featurePropsString);
                              setFilteredMaskFeatures(newFilteredFeatures);
                            }
                          }}
                        />
                        <Label
                          className="grow"
                          htmlFor={"filter-feature-checkbox-" + index}
                        >
                          {feature.properties &&
                            filterMaskCol &&
                            feature.properties[filterMaskCol]}
                        </Label>
                      </div>
                    );
                  })}
                </div>
              }
            >
              <Button
                disabled={!filterMaskCol}
                className="h-8 w-full text-sm justify-center items-center"
              >
                <span>
                  {filteredMaskFeatures?.length}{" "}
                  {t(
                    "body.tools.intersection.feature-features-placeholder"
                  )}
                </span>
                <BiCaretDown className="ms-2" />
              </Button>
            </Popover> */}
          </div>
        </div>
      </div>
      <div>
        <Label htmlFor={filtersIntersectionResultNameId}>
          {t("body.tools.intersection.resultname-label")}:
        </Label>
        <TextInput
          id={filtersIntersectionResultNameId}
          sizing="sm"
          placeholder={t("body.tools.intersection.resultname-placeholder")}
          value={resultName}
          onChange={(e) => setResultName(e.target.value)}
          disabled={!targetId || !maskId}
        />
      </div>
      <Button
        className="h-8 mt-2 text-sm font-bold justify-center"
        onClick={handleExecute}
        disabled={!targetId || !maskId}
      >
        <PiIntersectFill className="mr-2" />
        {t("body.tools.intersection.execute")}
      </Button>
    </div>
  );
};

export default Intersection;
