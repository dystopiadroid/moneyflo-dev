import SummaryCard from "@/components/summary/SummaryCard";
import PaginatedTableNew from "@/components/table/PaginatedTableNew";
import { startSpinner, stopSpinner } from "@/lib/features/commonSlice";
import {
  setHasInitialFetchDoneInvestment,
  setInvestments,
  setIsInvestmentAdded,
} from "@/lib/features/investmentSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { BASE_API_URL } from "@/utils/constants";
import { InvestmentRowData, TableData } from "@/utils/types/tableInfo";
import { Investment } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const investmentColumns = [
  { name: "TITLE", uid: "title" },
  { name: "CATEGORY", uid: "category" },
  { name: "AMOUNT", uid: "amount", sortable: true },
  { name: "DATE", uid: "date", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export default function Investment() {
  const [tableData, setTableData] = useState<TableData<InvestmentRowData>>();
  const userId = useAppSelector((state) => state.common.userId);
  const investments = useAppSelector((state) => state.investments.investments);
  const isInvestmentAdded = useAppSelector(
    (state) => state.investments.isInvestmentAdded
  );
  const initialInvestmentFetchDone = useAppSelector(
    (state) => state.investments.hasInitialFetchDone
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchInvestments(id: string) {
      if (!initialInvestmentFetchDone || isInvestmentAdded) {
        dispatch(startSpinner());
        dispatch(setHasInitialFetchDoneInvestment(true));
        const response = await axios.get(`${BASE_API_URL}/investment/${id}`);
        dispatch(setInvestments(response.data));
        dispatch(setIsInvestmentAdded(false));
        dispatch(stopSpinner());
      }
    }
    if (userId) {
      fetchInvestments(userId);
    }
  }, [userId, dispatch, isInvestmentAdded]);

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
