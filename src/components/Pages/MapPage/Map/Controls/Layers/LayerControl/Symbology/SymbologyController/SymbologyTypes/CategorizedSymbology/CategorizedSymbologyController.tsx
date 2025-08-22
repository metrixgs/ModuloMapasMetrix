import type { PathOptions } from "leaflet";

import type {
  SymbologyControllerProps,
  CategorizedSymbologyClass,
} from "@/types/Stores/LayersManager";

import { useEffect, useRef, useState } from "react";

import { useTranslation } from "react-i18next";

import { Label, Select } from "flowbite-react";
import { BiLeftArrowAlt } from "react-icons/bi";

import chroma from "chroma-js";
import classNames from "classnames";

import Button from "@components/UI/Button";
import CategorizedSymbologyClassOptions from "./CategorizedSymbologyClassOptions";
import { Symbol } from "../../../SymbologyLayer";

import { inferFieldTypes, getUniqueValues } from "@/utils/jsonUtils";

const CategorizedSymbologyController = ({
  initialSymbology,
  onSymbologyChange,
  data,
  layerGeometry,
}: SymbologyControllerProps) => {
  const { t } = useTranslation("global");
  const tref =
    "body.controls.layers.tabs.symbology.controller.type-categorized";

  const isMounted = useRef(false);

  const categorizedSymbology =
    initialSymbology?.type === "categorized" ? initialSymbology : undefined;

  const [fields, setFields] = useState<string[]>();

  const [field, setField] = useState(categorizedSymbology?.symbology.fieldName);
  const [classList, setClassList] = useState(
    categorizedSymbology?.symbology.classes
  );

  const [classIndex, setClassIndex] = useState<number>();

  const onClassOptionsChange = (idx: number, newPathOptions: PathOptions) => {
    const newClassList = classList ? [...classList] : [];
    newClassList[idx] = {
      ...newClassList[idx],
      options: newPathOptions
    }
    setClassList(newClassList);
    if (onSymbologyChange) {
      onSymbologyChange({
        type: "categorized",
        symbology: {
          fieldName: field,
          classes: newClassList
        }
      })
    }
  };

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      if (onSymbologyChange) {
        const inferedFields = data ? Object.keys(inferFieldTypes(data)) : [];
        setFields(inferedFields);

        if (!categorizedSymbology) {
          onSymbologyChange({
            type: "categorized",
            symbology: {
              classes: undefined,
              fieldName: undefined,
            },
          });
        }
      }
    } else {
      if (onSymbologyChange) {
        const unique = data && field ? getUniqueValues(data, field) : [];
        const palette = chroma
          .scale(["#78C841", "#B4E50D", "#FF9B2F", "#FB4141"])
          .colors(unique.length);

        const generatedClassList: CategorizedSymbologyClass[] = unique.map(
          (v, i) => {
            const quantity = data?.filter((f) => {
              if (field) {
                return f[field] === v
              } else {
                return false;
              }
            })?.length;

            return {
              fieldValue: v,
              quantity: quantity,
              options: {
                Point: {
                  stroke: true,
                  weight: 1,
                  opacity: 1.0,
                  color: palette[i],
                  fill: true,
                  fillColor: palette[i],
                  fillOpacity: 1,
                },
                LineString: {
                  stroke: true,
                  color: palette[i],
                  weight: 2,
                  opacity: 1.0,
                  fill: false,
                },
                Polygon: {
                  stroke: true,
                  weight: 0.5,
                  opacity: 1.0,
                  color: palette[i],
                  fill: true,
                  fillColor: palette[i],
                  fillOpacity: 0.2,
                },
              }[layerGeometry],
            };
          }
        );
        setClassList(generatedClassList);
        onSymbologyChange({
          type: "categorized",
          symbology: {
            fieldName: field,
            classes: generatedClassList,
          },
        });
      }
    }
  }, [field]);
  return (
    <div className="p-1 grow overflow-y-auto flex flex-col gap-2">
      <Label>{t(tref + ".column-select-label")}:</Label>
      <Select
        value={field}
        onChange={(e) => setField(e.target.value)}
        sizing="sm"
      >
        <option value="">{t(tref + ".option-undefined")}...</option>
        {fields?.map((field, i) => (
          <option key={i} value={field}>
            {field}
          </option>
        ))}
      </Select>
      <div className="grow flex flex-col gap-1 overflow-y-auto">
        {classIndex !== undefined ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <Button
                className="w-fit h-8 justify-center"
                onClick={() => setClassIndex(undefined)}
              >
                <BiLeftArrowAlt className="h-4 w-4" />
              </Button>
              <span className="grow text-center text-sm font-semibold dark:text-white">
                {categorizedSymbology?.symbology.classes?.[classIndex].fieldValue}
              </span>
            </div>
            <CategorizedSymbologyClassOptions
              key={classIndex}
              classIndex={classIndex}
              layerGeometry={layerGeometry}
              initialPathOptions={
                categorizedSymbology?.symbology.classes?.[classIndex].options
              }
              onClassOptionsChange={onClassOptionsChange}
            />
          </div>
        ) : (
          classList &&
          classList.map((c, i) => {
            return (
              <button
                key={i}
                className={classNames(
                  "p-2 flex items-center gap-2 rounded",
                  "hover:cursor-pointer",
                  "transition-colors duration-200",
                  "hover:bg-gray-200 dark:hover:bg-metrixblack-700"
                )}
                onClick={() => {
                  setClassIndex(i);
                }}
              >
                <Symbol geometry={layerGeometry} options={c.options} />
                <span className="dark:text-white">{c.fieldValue}</span>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CategorizedSymbologyController;
