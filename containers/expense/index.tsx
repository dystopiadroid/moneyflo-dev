import SummaryCard from "@/components/summary/SummaryCard";
import PaginatedTableNew from "@/components/table/PaginatedTableNew";
import { ExpenseRowData, TableData } from "@/utils/types/tableInfo";
import { Spinner } from "@nextui-org/spinner";
import { Expense } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/api";

const expenseColumns = [
  { name: "DESCRIPTION", uid: "description" },
  { name: "CATEGORY", uid: "category" },
  { name: "AMOUNT", uid: "amount", sortable: true },
  { name: "DATE", uid: "date", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export default function Expense() {
  const [expenses, setExpenses] = useState<Expense[]>();
  const [tableData, setTableData] = useState<TableData<ExpenseRowData>>();

  useEffect(() => {
    async function fetchExpenses() {
      const response = await axios.get(
        `${API_URL}/expense/a2b38d9f-d85d-428f-992e-e4e2cf06cb61`
      );
      setExpenses(response.data);
    }

    fetchExpenses();
  }, []);

  useEffect(() => {
    const newRowData: any = [];
    expenses?.map((expense: Expense) => {
      newRowData.push({
        id: expense.id,
        description: expense.description,
        category: expense.category,
        amount: expense.amount,
        date: new Date(expense.date).toISOString().slice(0, 10),
      });
    });
    setTableData({
      type: "expense",
      rowData: newRowData,
      columnData: expenseColumns,
    });
  }, [expenses]);

  console.log("Expense Table Data : ", tableData);

  return (
    <div className="h-document bg-background flex flex-col justify-center items-center">
      <SummaryCard page="expense" />
      {tableData ? <PaginatedTableNew tableData={tableData} /> : <Spinner />}
    </div>
  );
}
