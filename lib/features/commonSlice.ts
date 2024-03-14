import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthStatus {
  userId: string | null;
}

const initialState: AuthStatus = {
  userId: null,
};

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
  },
});

export const { setUserId } = commonSlice.actions;
export default commonSlice.reducer;
