import SummaryCard from "@/components/summary/SummaryCard";
import PaginatedTableNew from "@/components/table/PaginatedTableNew";
import { IncomeRowData, TableData } from "@/utils/types/tableInfo";
import { Income } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/api";

const incomeColumns = [
  { name: "TITLE", uid: "title" },
  { name: "AMOUNT", uid: "amount", sortable: true },
  { name: "DATE", uid: "date", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export default function Income() {
  const [incomes, setIncomes] = useState<Income[]>();
  const [tableData, setTableData] = useState<TableData<IncomeRowData>>();

  useEffect(() => {
    async function fetchInvestments() {
      const response = await axios.get(
        `${API_URL}/income/a2b38d9f-d85d-428f-992e-e4e2cf06cb61`
      );
      setIncomes(response.data);
    }

    fetchInvestments();
  }, []);

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
