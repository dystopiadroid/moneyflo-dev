import SummaryCard from "@/components/summary/SummaryCard";
import PaginatedTableNew from "@/components/table/PaginatedTableNew";
import React from "react";

export default function Expense() {
  return (
    <div className="h-document bg-background flex flex-col justify-center items-center">
      <SummaryCard page="expense" />
      <PaginatedTableNew />
    </div>
  );
}
