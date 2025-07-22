import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";

import { BiDownload, BiX, BiTable, BiExpand } from "react-icons/bi";

import { useBottomDrawerStore } from "@/stores/useBottomDrawerStore";

import Button from "@components/UI/Button";

type AttributesTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
};

const AttributesTable = <T,>({ data, columns }: AttributesTableProps<T>) => {
  const { title, close } = useBottomDrawerStore((state) => state);

  const table = useReactTable<T>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col gap-4">
      <nav className="flex justify-end gap-2">
        <span className="flex-grow flex items-center font-bold text-gray-700 dark:text-gray-100">
          <BiTable className="mr-2" />
          {title}
        </span>
        <Button
          className="flex justify-center"
          onClick={() => console.log(data)}
        >
          <BiDownload className="h-8" />
        </Button>
        <Button className="flex justify-center">
          <BiExpand className="h-8" />
        </Button>
        <Button className="flex justify-center" onClick={close}>
          <BiX className="h-8" />
        </Button>
      </nav>
      <div className="max-h-72 overflow-auto">
        <table className="table-auto w-full border border-gray-300">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-100">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-1 border border-gray-300">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-1 border border-gray-300">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttributesTable;
