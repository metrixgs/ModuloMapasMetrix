import { useState } from "react";

import { useTranslation } from "react-i18next";

import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type ColumnDef,
} from "@tanstack/react-table";

import classNames from "classnames";

import {
  BiDownload,
  BiX,
  BiTable,
  BiExpand,
  BiChevronUp,
  BiChevronDown,
  BiSearchAlt,
  BiChevronLeft,
  BiChevronRight
} from "react-icons/bi";

import { TextInput } from "flowbite-react";

import { useBottomDrawerStore } from "@/stores/useBottomDrawerStore";

import Button from "@components/UI/Button";

type AttributesTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
};

const AttributesTable = <T,>({ data, columns }: AttributesTableProps<T>) => {
  const { t } = useTranslation("global");

  const { title, close } = useBottomDrawerStore((state) => state);

  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedRow, setSelectedRow] = useState<number | undefined>(undefined);

  const table = useReactTable<T>({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 15
      }
    },
    state: {
      sorting,
      globalFilter
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter
  });

  return (
    <div className="flex flex-col gap-2">
      <nav className="px-2 pt-2 flex justify-end items-center gap-2">
        <span className="flex-grow flex items-center font-bold text-gray-700 dark:text-gray-100">
          <BiTable className="mr-2" />
          <span className="mr-2">
            { title }
          </span>
          <span className="text-xs">
            ({ table.getPrePaginationRowModel().rows.length }/{ data.length } { t("body.attributes-table.title-total-text") })
          </span>
        </span>
        <TextInput
          icon={BiSearchAlt}
          placeholder={t("body.attributes-table.search-placeholder")}
          value={globalFilter}
          onChange={(e) => {
            setSelectedRow(undefined);
            setGlobalFilter(e.target.value);
          }}
          sizing="sm"
        />
        <div className="flex items-center">
          <Button
            className="flex justify-center"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            <BiChevronLeft className="h-8" />
          </Button>
          <span className="w-18 text-xs text-center text-gray-800 dark:text-gray-100">
            { table.getState().pagination.pageIndex + 1 }/{ table.getPageCount() }
          </span>
           <Button
            className="flex justify-center"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            <BiChevronRight className="h-8" />
          </Button>
        </div>
        <Button
          className="flex justify-center"
          onClick={() => alert("En desarrollo.")}
        >
          <BiDownload className="h-8" />
        </Button>
        <Button
          className="flex justify-center"
          onClick={() => alert("En desarrollo.")}
        >
          <BiExpand className="h-8" />
        </Button>
        <Button className="flex justify-center" onClick={close}>
          <BiX className="h-8" />
        </Button>
      </nav>
      <div className="h-72 overflow-auto text-sm text-gray-800 dark:text-gray-100">
        <table className="table-fixed w-full">
          <thead
            className={classNames(
              "bg-gray-100 dark:bg-metrixblack-700/50",
            )}
          >
            {
              table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="">
                  <th className={classNames(
                    "py-2 px-4 w-16",
                    "border border-s-0 border-gray-300 dark:border-gray-600",
                  )}
                  ></th>
                  {
                    headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className={classNames(
                          "py-2 px-4 w-48",
                          "truncate whitespace-nowrap overflow-hidden",
                          "text-start font-medium",
                          "border border-gray-300 dark:border-gray-600",
                          "hover:bg-gray-200 dark:hover:bg-metrixblack-700/70",
                          "hover:cursor-pointer"
                        )}
                        title={String(header.column.columnDef.header)}
                        onClick={(e) => {
                          setSelectedRow(undefined);
                          const handler = header.column.getToggleSortingHandler();
                          if (handler) {
                            handler(e);
                          }
                        }}
                      >
                        <span className="flex justify-between items-center">
                          {
                            <span>
                              {
                                header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )
                              }
                            </span>
                          }
                          <span>
                            {
                              {
                                "asc": <BiChevronDown />,
                                "desc": <BiChevronUp />
                              }[header.column.getIsSorted() ?? null]
                            }
                          </span>
                        </span>
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          <tbody>
            {
              table.getRowModel().rows.map((row, index) => (
                <tr key={row.id}
                  className={classNames({
                    "bg-primary-400/50 dark:bg-primary-500": selectedRow === index
                  })}
                >
                  <td
                    onClick={() => {
                      console.log(row);
                      if (selectedRow === index) {
                        setSelectedRow(undefined);
                      } else {
                        setSelectedRow(index);
                      }
                    }}
                    className={classNames(
                      "py-2 px-4 w-16",
                      "text-start font-medium",
                      "border border-s-0 border-gray-300 dark:border-gray-600",
                      "bg-gray-100 dark:bg-metrixblack-700/50",
                      "hover:bg-gray-200 dark:hover:bg-metrixblack-700/70",
                      "hover:cursor-pointer"
                    )}
                  >{ index + 1 }</td>
                  {
                    row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={classNames(
                          "py-2 px-4 w-48",
                          "truncate whitespace-nowrap overflow-hidden",
                          "text-start font-normal",
                          "border border-gray-300 dark:border-gray-600",
                        )}
                        title={String(cell.getValue())}
                      >
                        { flexRender(cell.column.columnDef.cell, cell.getContext()) }
                      </td>
                    ))
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttributesTable;
