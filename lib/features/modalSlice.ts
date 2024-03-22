import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ModalStatus {
  isOpen: boolean;
}

const initialState: ModalStatus = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modalSlice",
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setIsOpen } = modalSlice.actions;
export default modalSlice.reducer;
