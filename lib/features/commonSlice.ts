import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthStatus {
  userId: string | null;
  showSpinner: boolean;
  initialSessionFetchDone: boolean;
}

const initialState: AuthStatus = {
  userId: null,
  showSpinner: false,
  initialSessionFetchDone: false,
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
    setInitialSessionFetchDone: (state, action: PayloadAction<boolean>) => {
      state.initialSessionFetchDone = action.payload;
    },
  },
});

export const {
  setUserId,
  startSpinner,
  stopSpinner,
  setInitialSessionFetchDone,
} = commonSlice.actions;
export default commonSlice.reducer;
