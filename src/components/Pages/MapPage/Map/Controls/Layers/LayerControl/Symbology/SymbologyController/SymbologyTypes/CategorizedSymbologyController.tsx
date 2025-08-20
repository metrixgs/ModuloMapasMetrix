import type {
  SymbologyControllerProps,
  CategorizedSymbologyClass,
} from "@/types/Stores/LayersManager";

import { useEffect, useRef, useState } from "react";

import { useTranslation } from "react-i18next";

import { HelperText, Label, Select } from "flowbite-react";

import chroma from "chroma-js";

import { inferFieldTypes, getUniqueValues } from "@/utils/jsonUtils";

import classNames from "classnames";

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
            return {
              fieldValue: v,
              options: {
                Point: {
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
    <div className="flex flex-col gap-2">
      <HelperText>{t(tref + ".help")}</HelperText>
      <Label>{t(tref + ".column-select-label")}:</Label>
      <Select
        value={field}
        onChange={(e) => setField(e.target.value)}
        sizing="sm"
      >
        <option value=""></option>
        {fields?.map((field, i) => (
          <option key={i} value={field}>
            {field}
          </option>
        ))}
      </Select>
      <div className="h-96 flex flex-col gap-2 overflow-y-auto">
        {classList &&
          classList.map((c, i) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className={classNames({
                  "h-5 w-5 rounded-full": layerGeometry === "Point",
                  "h-8 w-8 border-3 bg-opacity-0 rounded":
                    layerGeometry === "LineString",
                  "h-8 w-8 border-3 bg-opacity-100 rounded":
                    layerGeometry === "Polygon",
                })}
                style={{
                  borderColor: c.options.color,
                  backgroundColor: c.options.fillColor,
                }}
              ></span>
              <span className="dark:text-white">{c.fieldValue}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategorizedSymbologyController;
