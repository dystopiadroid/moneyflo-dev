import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ModalTabType = "income" | "expense" | "investment" | undefined;
interface ModalStatus {
  isOpen: boolean;
  currentModalTab: ModalTabType;
}

const initialState: ModalStatus = {
  isOpen: false,
  currentModalTab: undefined,
};

const modalSlice = createSlice({
  name: "modalSlice",
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setCurrentModalTab: (state, action: PayloadAction<ModalTabType>) => {
      state.currentModalTab = action.payload;
    },
  },
});

export const { setIsOpen, setCurrentModalTab } = modalSlice.actions;
export default modalSlice.reducer;
