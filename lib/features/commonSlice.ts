import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthStatus {
  userId: string | null;
  showSpinner: boolean;
}

const initialState: AuthStatus = {
  userId: null,
  showSpinner: false,
};

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    startSpinner: (state) => {
      state.showSpinner = true;
    },
    stopSpinner: (state) => {
      state.showSpinner = false;
    },
  },
});

export const { setUserId, startSpinner, stopSpinner } = commonSlice.actions;
export default commonSlice.reducer;
