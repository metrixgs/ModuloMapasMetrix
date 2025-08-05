import { Select, TextInput, ToggleSwitch } from "flowbite-react";

import { useEffect, useState, type ChangeEvent } from "react";

import {
  ColumnType,
  type ColumnTypeValue,
  type Operation,
  type QueryChangeEvent,
} from "@/types/Filters/ColumnFilter";

import { operationsByType } from "@/config.filters.column";

import { useTranslation } from "react-i18next";

interface FeatureExpressionItemProps {
  queryId: string,
  columns: { header: string; type: ColumnTypeValue }[];
  onQueryChange: (e: QueryChangeEvent) => void;
}

interface FilterValueState {
  [ColumnType.Number]?: number;
  [ColumnType.String]?: string;
  [ColumnType.Boolean]?: boolean;
}

const FeatureExpressionItem = ({
  queryId,
  columns,
  onQueryChange,
}: FeatureExpressionItemProps) => {
  const { t } = useTranslation("global");
  const tref = "body.tools.feature-expression";

  const [col, setCol] = useState<string>();
  const [colType, setColType] = useState<ColumnTypeValue>("undefined");
  const [operation, setOperation] = useState<Operation | undefined>();
  const [value, setValue] = useState<FilterValueState>({
    boolean: undefined,
    number: undefined,
    string: undefined,
  });

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
      const stringValue = value[ColumnType.String];
      const numberValue = value[ColumnType.Number];
      const booleanValue = value[ColumnType.Boolean];

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

      onQueryChange({ queryId, col, query, coltype: colType, value: selectedValue });
    }
  };

  useEffect(() => {
    filterFactory();
  }, [col, operation, value]);

  return (
    <div className="w-full flex flex-col gap-2">
      <Select value={col} className="min-w-32" sizing="sm" onChange={handleColumnChange}>
        <option value="">{t(tref + ".target-column-placeholder")} ...</option>
        {columns.map((col, index) => (
          <option key={index} value={col.header}>
            {col.header} [{col.type}]
          </option>
        ))}
      </Select>
      <Select
        className="min-w-32"
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
          {t(tref + ".target-operation-placeholder")} ...
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
            type="number"
            className="min-w-32"
            sizing="sm"
            disabled={colType === "null" || colType === "undefined"}
            value={value["number"]}
            onChange={(e) =>
              setValue({ ...value, number: Number(e.target.value) })
            }
          />
        ),
        string: (
          <TextInput
            className="min-w-32"
            sizing="sm"
            disabled={colType === "null" || colType === "undefined"}
            value={value[ColumnType.String]}
            onChange={(e) =>
              setValue({
                ...value,
                [ColumnType.String]: String(e.target.value),
              })
            }
          />
        ),
        boolean: (
          <ToggleSwitch
            value={String(value["boolean"])}
            checked={value["boolean"] ? value["boolean"] : false}
            onChange={() =>
              setValue({ ...value, boolean: Boolean(!value["boolean"]) })
            }
          />
        ),
        null: <></>,
        undefined: <></>,
      }[colType] ?? null}
    </div>
  );
};

export default FeatureExpressionItem;
