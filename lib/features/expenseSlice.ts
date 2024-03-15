import { Expense } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ExpenseState {
  expenses: Expense[];
  isExpenseAdded: boolean;
  hasInitialFetchDone: boolean;
}

const initialState: ExpenseState = {
  expenses: [],
  isExpenseAdded: false,
  hasInitialFetchDone: false,
};

const expenseSlice = createSlice({
  name: "expenseSlice",
  initialState,
  reducers: {
    setExpenses: (state, action: PayloadAction<Expense[]>) => {
      state.expenses = action.payload;
    },
    setIsExpenseAdded: (state, action: PayloadAction<boolean>) => {
      state.isExpenseAdded = action.payload;
    },
    setHasInitialFetchDoneExpense: (state, action: PayloadAction<boolean>) => {
      state.hasInitialFetchDone = action.payload;
    },
  },
});

export const { setExpenses, setIsExpenseAdded, setHasInitialFetchDoneExpense } =
  expenseSlice.actions;
export default expenseSlice.reducer;
