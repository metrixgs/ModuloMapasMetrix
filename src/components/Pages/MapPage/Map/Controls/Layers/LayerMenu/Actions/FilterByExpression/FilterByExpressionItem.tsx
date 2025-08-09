import { Select, TextInput, ToggleSwitch } from "flowbite-react";

import { useEffect, useState, type ChangeEvent } from "react";

import {
  ColumnType,
  type ColumnTypeValue,
  type Operation,
  type QueryChangeEvent,
} from "@/types/Filters/ColumnFilter";

import type { TFunction } from "i18next";

import SearchableSelect from "@components/UI/SearchableSelect/SearchableSelect";

import { operationsByType } from "@/config.filters.column";

interface FeatureExpressionItemProps {
  queryId: string;
  columns: { header: string; type: ColumnTypeValue }[];
  onQueryChange: (e: QueryChangeEvent) => void;
  translation: TFunction;
}

const FeatureByExpressionItem = ({
  queryId,
  columns,
  onQueryChange,
  translation,
}: FeatureExpressionItemProps) => {
  const tref = "body.controls.layers.layer-menu.filters.feature-expression";;

  const [col, setCol] = useState<string>();
  const [colType, setColType] = useState<ColumnTypeValue>("undefined");
  const [operation, setOperation] = useState<Operation>();

  const [booleanValue, setBooleanValue] = useState<boolean>();
  const [numberValue, setNumberValue] = useState<number>();
  const [stringValue, setStringValue] = useState<string>();

  const handleColumnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const header = e.target.value;
    const value = columns.find((c) => c.header === header)?.type;

    let coltype: ColumnTypeValue;
    if (value === ColumnType.Null) {
      coltype = "null";
    } else if (value === ColumnType.Undefined) {
      coltype = "undefined";
    } else if (value === ColumnType.Boolean) {
      coltype = "boolean";
    } else if (value === ColumnType.String) {
      coltype = "string";
    } else if (value === ColumnType.Number) {
      coltype = "number";
    } else {
      coltype = "undefined";
    }

    setCol(header);
    setColType(coltype);
  };

  const filterFactory = () => {
    if (col && colType) {

      let query = {};
      let selectedValue;

      if (stringValue) {
        if (operation === "contains") {
          query = {
            [col]: new RegExp(stringValue, "i"),
          };
        }
        selectedValue = stringValue;
      } else if (numberValue) {
        if (operation === "equal") {
          query = {
            [col]: numberValue,
          };
        } else if (operation === "greaterThan") {
          query = {
            [col]: {
              $gt: numberValue,
            },
          };
        } else if (operation === "greaterAndEqualThan") {
          query = {
            [col]: {
              $gte: numberValue,
            },
          };
        } else if (operation === "lessThan") {
          query = {
            [col]: {
              $lt: numberValue,
            },
          };
        } else if (operation === "lessAndEqualThan") {
          query = {
            [col]: {
              $lte: numberValue,
            },
          };
        }
        selectedValue = numberValue;
      } else if (booleanValue) {
        if (operation === "equal") {
          query = {
            [col]: booleanValue,
          };
        }
        selectedValue = booleanValue;
      }

      onQueryChange({
        queryId,
        col,
        query,
        coltype: colType,
        value: selectedValue,
      });
    }
  };

  useEffect(() => {
    filterFactory();
  }, [col, operation, booleanValue, numberValue, stringValue]);

  return (
    <div className="w-full flex gap-1">
      <SearchableSelect
        placeholder={translation(tref + ".target-column-placeholder") + " ..."}
        noResultPlaceholder={translation(tref + ".noresult-placeholder")}
        searchPlaceholder={translation(tref + ".search-placeholder") + " ..."}
        className="min-w-32"
        sizing="sm"
        value={col}
        onChange={handleColumnChange}
        options={columns.map((col) => ({
          title: `${col.header} [${col.type}]`,
          value: col.header,
        }))}
      />
      <Select
        className="min-w-28 grow"
        sizing="sm"
        value={operation}
        onChange={(e) => {
          setOperation(
            operationsByType[colType].find((op) => op === e.target.value)
          );
        }}
        disabled={colType === "null" || colType === "undefined"}
      >
        <option value="">
          {translation(tref + ".target-operation-placeholder")} ...
        </option>
        {operationsByType[colType].map((operation, i) => {
          let name: string;
          if (operation === "contains") {
            name = "Contiene";
          } else if (operation === "equal") {
            name = "=";
          } else if (operation === "greaterAndEqualThan") {
            name = ">=";
          } else if (operation === "greaterThan") {
            name = ">";
          } else if (operation === "lessAndEqualThan") {
            name = "<=";
          } else if (operation === "lessThan") {
            name = "<";
          } else {
            name = "";
          }
          return (
            <option key={i} value={operation}>
              {name}
            </option>
          );
        })}
      </Select>
      {{
        number: (
          <TextInput
            className="grow"
            type="number"
            sizing="sm"
            disabled={colType === "null" || colType === "undefined"}
            value={numberValue}
            onChange={(e) => setNumberValue(Number(e.target.value))}
          />
        ),
        string: (
          <TextInput
            className="grow"
            sizing="sm"
            disabled={colType === "null" || colType === "undefined"}
            value={stringValue}
            onChange={(e) => setStringValue(String(e.target.value))}
          />
        ),
        boolean: (
          <ToggleSwitch
            checked={booleanValue ? booleanValue : false}
            onChange={() => setBooleanValue(!booleanValue)}
          />
        ),
        null: <TextInput className="grow" disabled sizing="sm" />,
        undefined: <TextInput className="grow" disabled sizing="sm" />,
      }[colType] ?? null}
    </div>
  );
};

export default FeatureByExpressionItem;
