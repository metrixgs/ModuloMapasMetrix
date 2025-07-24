import { useState, type ChangeEvent } from "react";

import { useTranslation } from "react-i18next";

import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type ColumnDef,
  type Row,
  type SortingState,
} from "@tanstack/react-table";

import classNames from "classnames";

import {
  BiDownload,
  BiX,
  BiTable,
  BiExpand,
  BiCollapse,
  BiChevronUp,
  BiChevronDown,
  BiSearchAlt,
  BiChevronLeft,
  BiChevronRight
} from "react-icons/bi";

import { TextInput } from "flowbite-react";

import { useBottomDrawerStore } from "@/stores/useBottomDrawerStore";

import Button from "@components/UI/Button";

import { downloadCSV } from "@/utils/downloadUtils";

type AttributesTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  onSelectedRow: (row: Row<T>) => Promise<any>;
};

const AttributesTable = <T,>({ data, columns, onSelectedRow }: AttributesTableProps<T>) => {
  const { t } = useTranslation("global");

  const { title, close, isFullscreen, toggleFullscreen } = useBottomDrawerStore((state) => state);

  const [sorting, setSorting] = useState<SortingState>([]);
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
        pageSize: 50
      }
    },
    state: {
      sorting,
      globalFilter
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedRow(undefined);
    setGlobalFilter(e.target.value);
  }

  const handlePreviusPage = () => {
    setSelectedRow(undefined);
    table.previousPage();
  }

  const handleNextPage = () => {
    setSelectedRow(undefined);
    table.nextPage();
  }

  const handleDownloadCSV = () => {
    const columns = table.getAllColumns().filter(col => col.getIsVisible());
    const rows = table.getRowModel().rows;

    const filteredData = rows.map((row) => {
      const result: Record<string, any> = {};
      columns.forEach((col) => {
        const header = String(col.columnDef.header);
        const value = row.getValue(col.id);
        result[header] = value;
      });
      return result;
    });

    downloadCSV(filteredData as object[], `${title}.csv`);
  }

  const handleFullscreen = () => {
    toggleFullscreen();
  }

  const handleClose = () => {
    setSelectedRow(undefined);
    close();
  }

  return (
    <div id="container-hola" className="flex flex-col gap-2 h-full">
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
          onChange={handleSearch}
          sizing="sm"
        />
        <div className="flex items-center">
          <Button
            className="flex justify-center"
            disabled={!table.getCanPreviousPage()}
            onClick={handlePreviusPage}
          >
            <BiChevronLeft className="h-8" />
          </Button>
          <span className="w-18 text-xs text-center text-gray-800 dark:text-gray-100">
            { table.getState().pagination.pageIndex + 1 }/{ table.getPageCount() }
          </span>
           <Button
            className="flex justify-center"
            disabled={!table.getCanNextPage()}
            onClick={handleNextPage}
          >
            <BiChevronRight className="h-8" />
          </Button>
        </div>
        <Button
          className="flex justify-center"
          onClick={handleDownloadCSV}
        >
          <BiDownload className="h-8" />
        </Button>
        <Button
          className="flex justify-center"
          onClick={handleFullscreen}
        >
          {
            isFullscreen ? <BiCollapse className="h-8" /> : <BiExpand className="h-8" />
          }
        </Button>
        <Button className="flex justify-center" onClick={handleClose}>
          <BiX className="h-8" />
        </Button>
      </nav>
      <div
        className={classNames(
          "overflow-auto text-sm text-gray-800 dark:text-gray-100",
          {
            "h-full": isFullscreen,
            "h-72": !isFullscreen
          }
        )}
      >
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
                              }[header.column.getIsSorted() as "asc" | "desc"] ?? null
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
                  className={classNames(
                    {
                      "bg-primary-400/50 dark:bg-primary-700": selectedRow === index
                    }
                  )}
                >
                  <td
                    onClick={() => {
                      if (selectedRow === index) {
                        setSelectedRow(undefined);
                      } else {
                        setSelectedRow(index);
                        onSelectedRow(row);
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
