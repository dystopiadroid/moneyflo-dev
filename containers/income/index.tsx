import SummaryCard from "@/components/summary/SummaryCard";
import PaginatedTableNew from "@/components/table/PaginatedTableNew";
import { setIncomes, setIsIncomeAdded } from "@/lib/features/incomeSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { BASE_API_URL } from "@/utils/constants";
import { IncomeRowData, TableData } from "@/utils/types/tableInfo";
import { Income } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const incomeColumns = [
  { name: "TITLE", uid: "title" },
  { name: "AMOUNT", uid: "amount", sortable: true },
  { name: "DATE", uid: "date", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export default function Income() {
  const [tableData, setTableData] = useState<TableData<IncomeRowData>>();
  const userId = useAppSelector((state) => state.common.userId);
  const incomes = useAppSelector((state) => state.incomes.incomes);
  const isIncomeAdded = useAppSelector((state) => state.incomes.isIncomeAdded);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchIncomes(id: string) {
      if (incomes.length === 0 || isIncomeAdded) {
        const response = await axios.get(`${BASE_API_URL}/income/${id}`);
        dispatch(setIncomes(response.data));
        dispatch(setIsIncomeAdded(false));
      }
    }

    if (userId) {
      fetchIncomes(userId);
    }
  }, [userId, dispatch, isIncomeAdded]);

  useEffect(() => {
    const newRowData: any = [];
    incomes?.map((income: Income) => {
      newRowData.push({
        id: income.id,
        title: income.title,
        amount: income.amount,
        date: new Date(income.date).toISOString().slice(0, 10),
      });
    });
    setTableData({
      type: "expense",
      rowData: newRowData,
      columnData: incomeColumns,
    });
  }, [incomes]);

  return (
    <div className="h-document bg-background flex flex-col justify-center items-center">
      <SummaryCard page="income" />
      {tableData && <PaginatedTableNew tableData={tableData} />}
    </div>
  );
}
