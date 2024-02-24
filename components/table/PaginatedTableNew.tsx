import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Tooltip } from "@nextui-org/tooltip";
import { incomes, columnsNew } from "./data";
import React, { useCallback, useMemo } from "react";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { SearchIcon } from "./SearchIcon";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { PlusIcon } from "./PlusIcon";
import { Pagination } from "@nextui-org/pagination";

export default function PaginatedTableNew() {
  type Income = (typeof incomes)[0];

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4 px-8">
        <div className="flex justify-between gap-3 items-center ">
          <Input
            isClearable
            classNames={{
              base: "w-96 sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Search by name..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            variant="bordered"
          />
          <Button
            className="bg-foreground text-background"
            endContent={<PlusIcon />}
            size="md"
          >
            Add New
          </Button>
        </div>
      </div>
    );
  }, []);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-center items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          page={1}
          total={5}
          variant="light"
        />
        {/* <span className="text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${items.length} selected`}
        </span> */}
      </div>
    );
  }, []);

  const renderCell = useCallback((income: Income, columnKey: React.Key) => {
    const cellValue = income[columnKey as keyof Income];

    switch (columnKey) {
      case "title":
        return (
          <p className="text-bold text-lg capitalize text-default-500 py-3">
            {cellValue}
          </p>
        );
      case "amount":
        return (
          <p className="text-bold text-lg capitalize text-default-500 py-3">
            {`₹ ${cellValue}`}
          </p>
        );
      case "date":
        return (
          <p className="text-bold text-lg capitalize text-default-500 py-3">
            {cellValue}
          </p>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2 py-3">
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["min-h-[550px]", "h-550px", "bg-card"],
      th: [
        "bg-transparent",
        "text-default-600",
        "border-b-2",
        "border-divider",
        "text-xl",
      ],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    []
  );

  return (
    <Table
      isCompact
      classNames={classNames}
      className="px-8 absolute top-paginatedTable"
      topContent={topContent}
      topContentPlacement="outside"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
    >
      <TableHeader columns={columnsNew}>
        {(column) => (
          <TableColumn key={column.uid} allowsSorting={column.sortable}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No Incomes Present:("} items={incomes}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
