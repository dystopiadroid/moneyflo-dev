import SummaryCard from "@/components/summary/SummaryCard";
import PaginatedTableNew from "@/components/table/PaginatedTableNew";
import { setExpenses, setIsExpenseAdded } from "@/lib/features/expenseSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { BASE_API_URL } from "@/utils/constants";
import { ExpenseRowData, TableData } from "@/utils/types/tableInfo";
import { Spinner } from "@nextui-org/spinner";
import { Expense } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const expenseColumns = [
  { name: "DESCRIPTION", uid: "description" },
  { name: "CATEGORY", uid: "category" },
  { name: "AMOUNT", uid: "amount", sortable: true },
  { name: "DATE", uid: "date", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export default function Expense() {
  const [tableData, setTableData] = useState<TableData<ExpenseRowData>>();
  const userId = useAppSelector((state) => state.common.userId);
  const expenses = useAppSelector((state) => state.expenses.expenses);
  const isExpenseAddded = useAppSelector(
    (state) => state.expenses.isExpenseAdded
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchExpenses(id: string) {
      console.log("inside useEffect of expense with userid : ", userId);
      if (expenses.length === 0 || isExpenseAddded) {
        const response = await axios.get(`${BASE_API_URL}/expense/${id}`);
        dispatch(setExpenses(response.data));
        dispatch(setIsExpenseAdded(false));
      }
    }
    if (userId) {
      fetchExpenses(userId);
    }
  }, [userId, dispatch, isExpenseAddded]);

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

  return (
    <div className="h-document bg-background flex flex-col justify-center items-center">
      <SummaryCard page="expense" />
      {tableData ? <PaginatedTableNew tableData={tableData} /> : <Spinner />}
    </div>
  );
}
