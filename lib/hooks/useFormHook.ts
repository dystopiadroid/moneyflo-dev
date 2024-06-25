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

  const isEdit = useAppSelector((state) => state.modal.isEdit);
  const selectedItem = useAppSelector((state) => state.item.selectedItem);
  const [title, setTitle] = selectedItem != null && isEdit ? useState<>(selectedItem.title) : useState<>();
  const [amount, setAmount] =
    isEdit && selectedItem != null
      ? useState<number>(selectedItem.amount)
      : useState<number>();
  const [date, setDate] =
    isEdit && selectedItem != null
      ? useState<string>(selectedItem.date)
      : useState<string>();
  const [category, setCategory] =
    isEdit && selectedItem != null
        ? useState<>(() => {
          if('category' in selectedItem){
            return selectedItem.category;
          }
          return ''
        })
        : useState<>("")

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
          title,
          category,
          amount,
          date: convertedDate,
          user_id: userId,
        },
        headers: {
          "Content-Type": "application/json",
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
        headers: {
          "Content-Type": "application/json",
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
        headers: {
          "Content-Type": "application/json",
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
    category,
  };
}
