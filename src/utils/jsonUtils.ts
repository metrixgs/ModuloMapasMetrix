import { ColumnType, type ColumnTypeValue } from "@/types/Filters/ColumnFilter";

export const inferFieldTypes = (
  data: Record<string, any>[]
): Record<string, ColumnTypeValue> => {
  const fieldTypes: Record<string, ColumnTypeValue> = {};

  for (const row of data) {
    for (const field in row) {
      const value = row[field];

      let fieldType: ColumnTypeValue;
      const typeofValue = typeof value;

      if (value === null) {
        fieldType = ColumnType.Null;
      } else if (typeofValue === "number" || typeofValue === "bigint") {
        fieldType = ColumnType.Number;
      } else if (typeofValue === "boolean") {
        fieldType = ColumnType.Boolean;
      } else if (typeofValue === "string") {
        fieldType = ColumnType.String;
      } else {
        fieldType = ColumnType.Undefined;
      }

      if (!fieldTypes[field]) {
        fieldTypes[field] = fieldType;
      } else if (fieldTypes[field] !== fieldType) {
        if (fieldTypes[field] !== ColumnType.Undefined) {
          fieldTypes[field] = ColumnType.Undefined;
        }
      }
    }
  }

  return fieldTypes;
};
