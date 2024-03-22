import CreateNewModal from "@/components/modal/CreateNewModal";
import SummaryCard from "@/components/summary/SummaryCard";
import PaginatedTableNew from "@/components/table/PaginatedTableNew";
import { startSpinner, stopSpinner } from "@/lib/features/commonSlice";
import {
  setExpenses,
  setHasInitialFetchDoneExpense,
  setIsExpenseAdded,
} from "@/lib/features/expenseSlice";
import { setIsOpen } from "@/lib/features/modalSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { BASE_API_URL } from "@/utils/constants";
import { ExpenseRowData, TableData } from "@/utils/types/tableInfo";
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
  const isExpenseAdded = useAppSelector(
    (state) => state.expenses.isExpenseAdded
  );
  const initialExpenseFetchDone = useAppSelector(
    (state) => state.expenses.hasInitialFetchDone
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setIsOpen(false));
  }, []);

  useEffect(() => {
    async function fetchExpenses(id: string) {
      if (!initialExpenseFetchDone || isExpenseAdded) {
        dispatch(startSpinner());
        dispatch(setHasInitialFetchDoneExpense(true));
        const response = await axios.get(`${BASE_API_URL}/expense/${id}`);
        dispatch(setExpenses(response.data));
        dispatch(setIsExpenseAdded(false));
        dispatch(stopSpinner());
      }
    }
    if (userId) {
      fetchExpenses(userId);
    }
  }, [userId, dispatch, isExpenseAdded]);

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
      <CreateNewModal />
      {tableData && <PaginatedTableNew tableData={tableData} />}
    </div>
  );
}
