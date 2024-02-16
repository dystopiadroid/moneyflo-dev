import { createSlice } from "@reduxjs/toolkit";

interface Toast {
  loginSucessful: boolean;
}

const initialState: Toast = {
  loginSucessful: false,
};

const toastSlice = createSlice({
  name: "toastSlice",
  initialState,
  reducers: {
    setLoginSuccessful: (state) => {
      state.loginSucessful = true;
    },
    resetLoginSuccessful: (state) => {
      state.loginSucessful = false;
    },
  },
});

export const { setLoginSuccessful, resetLoginSuccessful } = toastSlice.actions;
export default toastSlice.reducer;
