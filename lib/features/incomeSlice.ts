import { Income } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IncomeState {
  incomes: Income[];
  isIncomeAdded: boolean;
}

const initialState: IncomeState = {
  incomes: [],
  isIncomeAdded: false,
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
  },
});

export const { setIncomes, setIsIncomeAdded } = incomeSlice.actions;
export default incomeSlice.reducer;
