import { Popover, Checkbox, Label } from "flowbite-react";

import { type Table } from "@tanstack/react-table";

import { BiCabinet } from "react-icons/bi";

import Button from "@components/UI/Button";

import { useBottomDrawerStore } from "@/stores/useBottomDrawerStore";

interface SelectColumnsProps<T> {
  table: Table<T>
}

const SelectColumns = <T,>({ table }: SelectColumnsProps<T>) => {

  const { isFullscreen } = useBottomDrawerStore((state) => state);

  return (
    <Popover
      arrow={false}
      placement={isFullscreen ? "bottom" : "left"}
      content={
        <div className="max-h-48 min-w-40 p-4 overflow-y-auto flex flex-col gap-1">
          {table.getAllLeafColumns().map(
            (column) =>
              column.getCanHide() && (
                <div className="flex">
                  <Checkbox
                    id={"toggle-column-" + column.id}
                    className="mr-2"
                    checked={column.getIsVisible()}
                    onChange={() => column.toggleVisibility()}
                  />
                  <Label
                    className="grow"
                    htmlFor={"toggle-column-" + column.id}
                  >
                    { column.columnDef.header?.toString() }
                  </Label>
                </div>
              )
          )}
        </div>
      }
    >
      <Button
        className="h-8 w-8 flex justify-center"
      >
        <BiCabinet />
      </Button>
    </Popover>
  );
};

export default SelectColumns;