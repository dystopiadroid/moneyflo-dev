import SummaryCard from "@/components/summary/SummaryCard";
import PaginatedTable from "@/components/table/PaginatedTable";
import PaginatedTableNew from "@/components/table/PaginatedTableNew";
import React from "react";

export default function Income() {
  return (
    <div className="h-document bg-background flex flex-col justify-center items-center">
      <SummaryCard page="income" />
      <PaginatedTableNew />
    </div>
  );
}
