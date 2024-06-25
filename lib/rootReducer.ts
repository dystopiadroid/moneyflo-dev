import { combineReducers } from "@reduxjs/toolkit";
import common from "@/lib/features/commonSlice";
import page from "@/lib/features/pageSlice";
import incomes from "@/lib/features/incomeSlice";
import expenses from "@/lib/features/expenseSlice";
import investments from "@/lib/features/investmentSlice";
import modal from "@/lib/features/modalSlice";
import item from "@/lib/features/itemSlice";

const rootReducer = combineReducers({
  common,
  page,
  incomes,
  expenses,
  investments,
  modal,
  item,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
