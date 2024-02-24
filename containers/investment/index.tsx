import SummaryCard from "@/components/summary/SummaryCard";
import PaginatedTableNew from "@/components/table/PaginatedTableNew";
import { InvestmentRowData, TableData } from "@/utils/types/tableInfo";
import { Investment } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_URL_ENV === "development"
    ? "http://localhost:3000/api"
    : "https://moneyflo-dev.vercel.app/api";

const investmentColumns = [
  { name: "TITLE", uid: "title" },
  { name: "CATEGORY", uid: "category" },
  { name: "AMOUNT", uid: "amount", sortable: true },
  { name: "DATE", uid: "date", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export default function Investment() {
  const [investments, setInvestments] = useState<Investment[]>();
  const [tableData, setTableData] = useState<TableData<InvestmentRowData>>();

  useEffect(() => {
    async function fetchInvestments() {
      const response = await axios.get(
        `${API_URL}/investment/a2b38d9f-d85d-428f-992e-e4e2cf06cb61`
      );
      setInvestments(response.data);
    }

    fetchInvestments();
  }, []);

  useEffect(() => {
    const newRowData: any = [];
    investments?.map((investment: Investment) => {
      newRowData.push({
        id: investment.id,
        title: investment.title,
        category: investment.category,
        amount: investment.amount,
        date: new Date(investment.date).toISOString().slice(0, 10),
      });
    });
    setTableData({
      type: "expense",
      rowData: newRowData,
      columnData: investmentColumns,
    });
  }, [investments]);

  return (
    <div className="h-document bg-background flex flex-col justify-center items-center">
      <SummaryCard page="investment" />
      {tableData && <PaginatedTableNew tableData={tableData} />}
    </div>
  );
}
