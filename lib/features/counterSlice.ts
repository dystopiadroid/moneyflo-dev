import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: number = 0;

const todoSlice = createSlice({
  name: "todoSlice",
  initialState,
  reducers: {
    incrementCounter: (state, action: PayloadAction<number>) => {
      return state + action.payload;
    },
    decrementCounter: (state, action: PayloadAction<number>) => {
      return state - action.payload;
    },
  },
});

export const { incrementCounter, decrementCounter } = todoSlice.actions;
export default todoSlice.reducer;
