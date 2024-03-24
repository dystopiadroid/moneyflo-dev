import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { BASE_API_URL } from "@/utils/constants";
import axios, { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { setIsExpenseAdded } from "../features/expenseSlice";
import { setIsOpen } from "../features/modalSlice";
import { setCurrentPage } from "../features/pageSlice";
import { setIsIncomeAdded } from "../features/incomeSlice";
import { setIsInvestmentAdded } from "../features/investmentSlice";

export default function useFormHook() {
  const [title, setTitle] = useState<string>();
  const [amount, setAmount] = useState<number>();
  const [date, setDate] = useState<string>();
  const [category, setCategory] = useState<string>();
  const { toast } = useToast();
  const currentModalTab = useAppSelector(
    (state) => state.modal.currentModalTab
  );
  const userId = useAppSelector((state) => state.common.userId);
  const dispatch = useAppDispatch();
  let convertedDate = new Date();

  if (date != undefined) {
    convertedDate = new Date(date);
  }

  const handleOnExpenseSubmit = async () => {
    try {
      const response = await axios(`${BASE_API_URL}/expense`, {
        method: "POST",
        data: {
          description: title,
          category,
          amount,
          date: convertedDate,
          user_id: userId,
        },
      });
      if (response.status === 201) {
        dispatch(setIsOpen(false));
        dispatch(setIsExpenseAdded(true));
        dispatch(setCurrentPage("expense"));
        toast({ title: "Expense successfully added" });
      }
    } catch (err: any) {
      if (err instanceof AxiosError) {
        dispatch(setIsOpen(true));
        toast({ title: err.response?.data, variant: "destructive" });
      } else {
        dispatch(setIsOpen(true));
        toast({ title: err.message, variant: "destructive" });
      }
    }
  };

  const handleOnIncomeSubmit = async () => {
    try {
      const response = await axios(`${BASE_API_URL}/income`, {
        method: "POST",
        data: {
          title,
          amount,
          date: convertedDate,
          user_id: userId,
        },
      });
      if (response.status === 201) {
        dispatch(setIsOpen(false));
        dispatch(setIsIncomeAdded(true));
        dispatch(setCurrentPage("income"));
        toast({ title: "Income successfully added" });
      }
    } catch (err: any) {
      if (err instanceof AxiosError) {
        dispatch(setIsOpen(true));
        toast({ title: err.response?.data, variant: "destructive" });
      } else {
        dispatch(setIsOpen(true));
        toast({ title: err.message, variant: "destructive" });
      }
    }
  };

  const handleOnInvestmentSubmit = async () => {
    try {
      const response = await axios(`${BASE_API_URL}/investment`, {
        method: "POST",
        data: {
          title,
          category,
          amount,
          date: convertedDate,
          user_id: userId,
        },
      });
      if (response.status === 201) {
        dispatch(setIsOpen(false));
        dispatch(setIsInvestmentAdded(true));
        dispatch(setCurrentPage("investment"));
        toast({ title: "Investment successfully added" });
      }
    } catch (err: any) {
      if (err instanceof AxiosError) {
        dispatch(setIsOpen(true));
        toast({ title: err.response?.data, variant: "destructive" });
      } else {
        dispatch(setIsOpen(true));
        toast({ title: err.message, variant: "destructive" });
      }
    }
  };

  const handleOnFormSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    switch (currentModalTab) {
      case "expense":
        handleOnExpenseSubmit();
        break;
      case "income":
        handleOnIncomeSubmit();
        break;
      case "investment":
        handleOnInvestmentSubmit();
        break;
      default:
        return;
    }
  };

  return {
    handleOnFormSubmit,
    setTitle,
    setAmount,
    setDate,
    title,
    amount,
    date,
    setCategory,
  };
}
