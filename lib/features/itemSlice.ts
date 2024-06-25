import {
  ExpenseRowData,
  IncomeRowData,
  InvestmentRowData,
} from "@/utils/types/tableInfo";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  selectedItem: ExpenseRowData | IncomeRowData | InvestmentRowData | null;
}

const initialState: InitialState = {
  selectedItem: null,
};

const itemSlice = createSlice({
  name: "itemSlice",
  initialState,
  reducers: {
    setSelectedItem: (
      state,
      action: PayloadAction<
        ExpenseRowData | IncomeRowData | InvestmentRowData | null
      >
    ) => {
      state.selectedItem = action.payload;
    },
  },
});

export const { setSelectedItem } = itemSlice.actions;
export default itemSlice.reducer;
