import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: string = "init";

const pageSlice = createSlice({
  name: "pageSlice",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<string>) => {
      return (state = action.payload);
    },
  },
});

export const { setCurrentPage } = pageSlice.actions;
export default pageSlice.reducer;
