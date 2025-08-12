import {
  Popover,
  Label,
  ToggleSwitch,
  TextInput,
} from "flowbite-react";

import { type Table } from "@tanstack/react-table";

import { BiCabinet } from "react-icons/bi";

import Button from "@components/UI/Button";

import { useBottomDrawerStore } from "@/stores/useBottomDrawerStore";
import { useState } from "react";

interface SelectColumnsProps<T> {
  table: Table<T>;
}

const SelectColumns = <T,>({ table }: SelectColumnsProps<T>) => {
  const { isFullscreen } = useBottomDrawerStore((state) => state);

  const [search, setSearch] = useState<string>("");

  const allColumns = table.getAllLeafColumns();

  const filteredColumns = allColumns.filter((c) => {
    try {
      const bool = String(c.columnDef.header?.toString())
        .toLowerCase()
        .includes(search.toLowerCase());
      return bool;
    } catch (error) {
      console.error(c, error);
      return false;
    }
  });

  return (
    <Popover
      arrow={false}
      placement={isFullscreen ? "bottom" : "left"}
      content={
        <div className="max-h-60 min-w-40 max-w-52 py-2 flex flex-col gap-1">
          <TextInput
            sizing="sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mx-2"
          />
          <div className="w-full py-1 px-2 overflow-y-auto flex flex-col gap-2">
            {filteredColumns.map(
              (column, index) =>
                column.getCanHide() && (
                  <div key={index} className="flex items-center">
                    <ToggleSwitch
                      id={"toggle-column-" + column.id}
                      sizing="sm"
                      className="mr-2"
                      checked={column.getIsVisible()}
                      onChange={() => column.toggleVisibility()}
                    />
                    <Label
                      className="grow text-xs"
                      htmlFor={"toggle-column-" + column.id}
                    >
                      {column.columnDef.header?.toString()}
                    </Label>
                  </div>
                )
            )}
          </div>
        </div>
      }
    >
      <Button className="h-8 w-8 flex justify-center">
        <BiCabinet />
      </Button>
    </Popover>
  );
};

export default SelectColumns;
