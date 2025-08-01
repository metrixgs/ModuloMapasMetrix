import {
  ColumnType,
  type ColumnTypeValue,
  type Operation,
} from "./types/Filters/ColumnFilter";

export const operationsByType: Record<ColumnTypeValue, Operation[]> = {
  [ColumnType.String]: ["contains"],
  [ColumnType.Number]: [
    "equal",
    "greaterThan",
    "lessThan",
    "greaterAndEqualThan",
    "lessAndEqualThan",
  ],
  [ColumnType.Boolean]: ["equal"],
  [ColumnType.Null]: [],
  [ColumnType.Undefined]: [],
};
