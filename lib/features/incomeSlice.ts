import { Income } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IncomeState {
  incomes: Income[];
  isIncomeAdded: boolean;
  hasInitialFetchDone: boolean;
}

const initialState: IncomeState = {
  incomes: [],
  isIncomeAdded: false,
  hasInitialFetchDone: false,
};

const incomeSlice = createSlice({
  name: "incomeSlice",
  initialState,
  reducers: {
    setIncomes: (state, action: PayloadAction<Income[]>) => {
      state.incomes = action.payload;
    },
    setIsIncomeAdded: (state, action: PayloadAction<boolean>) => {
      state.isIncomeAdded = action.payload;
    },
    setHasInitialFetchDoneIncome: (state, action: PayloadAction<boolean>) => {
      state.hasInitialFetchDone = action.payload;
    },
  },
});

export const { setIncomes, setIsIncomeAdded, setHasInitialFetchDoneIncome } =
  incomeSlice.actions;
export default incomeSlice.reducer;
