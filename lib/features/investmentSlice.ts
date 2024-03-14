import { Investment } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InvestmentState {
  investments: Investment[];
  isInvestmentAdded: boolean;
}

const initialState: InvestmentState = {
  investments: [],
  isInvestmentAdded: false,
};

const investmentSlice = createSlice({
  name: "investmentSlice",
  initialState,
  reducers: {
    setInvestments: (state, action: PayloadAction<Investment[]>) => {
      state.investments = action.payload;
    },
    setIsInvestmentAdded: (state, action: PayloadAction<boolean>) => {
      state.isInvestmentAdded = action.payload;
    },
  },
});

export const { setInvestments, setIsInvestmentAdded } = investmentSlice.actions;
export default investmentSlice.reducer;
