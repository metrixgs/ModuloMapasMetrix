export const ColumnType = {
  String: "string",
  Number: "number",
  Boolean: "boolean",
  Null: "null",
  Undefined: "undefined",
} as const;

export type ColumnType = keyof typeof ColumnType;
export type ColumnTypeValue = (typeof ColumnType)[keyof typeof ColumnType];

export type StringOperation = "contains";

export type NumberOperation =
  | "equal"
  | "greaterThan"
  | "lessThan"
  | "greaterAndEqualThan"
  | "lessAndEqualThan";

export type BooleanOperation = "equal";

export type Operation = StringOperation | NumberOperation | BooleanOperation;

export const OperationsByColumnType = {
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
} as const;

export type OperationForColumn<T extends keyof typeof OperationsByColumnType> =
  (typeof OperationsByColumnType)[T][number];
