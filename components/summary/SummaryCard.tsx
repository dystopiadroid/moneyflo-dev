import { Card, CardBody } from "@nextui-org/card";
import React, { useEffect, useState } from "react";

export default function SummaryCard({ page }: { page: string }) {
  const [title, setTitle] = useState<string>();
  const [amount, setAmount] = useState<number>();

  function setIncomeAmount() {
    setAmount(60000);
  }

  function setInvestmentAmount() {
    setAmount(10000);
  }

  function setExpenseAmount() {
    setAmount(20000);
  }

  useEffect(() => {
    switch (page) {
      case "income":
        setTitle("Monthly Income");
        setIncomeAmount();
        break;
      case "investment":
        setTitle("Monthly Investment");
        setInvestmentAmount();
        break;
      case "expense":
        setTitle("Monthly Expense");
        setExpenseAmount();
        break;
      default:
        return;
    }
  }, []);

  return (
    <Card className="w-summaryCard h-32 absolute top-28">
      <CardBody className="flex justify-center" id="summary-card-body">
        <div className="flex items-center justify-between px-10">
          <p className="text-3xl">{title}</p>
          <p className="text-3xl">{amount}</p>
        </div>
      </CardBody>
    </Card>
  );
}
