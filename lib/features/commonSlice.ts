import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthStatus {
  authStatus: string;
}

const initialState: AuthStatus = {
  authStatus: "unauthenticated",
};

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {
    setAuthStatus: (state, action: PayloadAction<string>) => {
      state.authStatus = action.payload;
    },
  },
});

export const { setAuthStatus } = commonSlice.actions;
export default commonSlice.reducer;
