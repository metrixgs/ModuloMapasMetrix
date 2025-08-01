import classNames from "classnames";
import { Select, TextInput, ToggleSwitch } from "flowbite-react";
import {
  useEffect,
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";

import {
  ColumnType,
  type ColumnTypeValue,
  type Operation,
} from "@/types/Filters/ColumnFilter";
import { operationsByType } from "@/config.filters.column";

interface FilterItemProps {
  columns: { header: string; type: ColumnTypeValue }[];
  filter?: object;
  setFilter: Dispatch<SetStateAction<object>>;
}

interface FilterValueState {
  [ColumnType.Number]?: number;
  [ColumnType.String]?: string;
  [ColumnType.Boolean]?: boolean;
}

const FilterItem_ = ({ columns, setFilter }: FilterItemProps) => {
  const [colType, setColType] = useState<ColumnTypeValue>("undefined");
  const [operation, setOperation] = useState<Operation | undefined>();
  const [value, setValue] = useState<FilterValueState>({
    boolean: undefined,
    number: undefined,
    string: undefined,
  });

  const handleColumnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
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
    setColType(coltype);
  };

  const filterFactory = () => {
    
  }

  useEffect(() => {

  });

  return (
    <div
      className={classNames(
        "w-full p-1",
        "flex gap-1",
        "border border-gray-200 dark:border-gray-600",
        "rounded-lg"
      )}
    >
      <Select className="min-w-32" sizing="sm" onChange={handleColumnChange}>
        {columns.map((col, index) => (
          <option key={index} value={col.type}>
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
        <option value="">Operación...</option>
        {operationsByType[colType].map((operation) => {
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
          return <option value={operation}>{name}</option>;
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
            value={value["string"]}
            onChange={(e) =>
              setValue({ ...value, string: String(e.target.value) })
            }
          />
        ),
        boolean: (
          <ToggleSwitch
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

export default FilterItem;
