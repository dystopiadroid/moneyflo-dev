import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ModalTabType = "income" | "expense" | "investment" | undefined;
interface ModalStatus {
  isOpen: boolean;
  currentModalTab: ModalTabType;
  isEdit: boolean;
}

const initialState: ModalStatus = {
  isOpen: false,
  currentModalTab: undefined,
  isEdit: false,
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
    setIsEdit: (state, action: PayloadAction<boolean>) => {
      state.isEdit = action.payload;
    },
  },
});

export const { setIsOpen, setCurrentModalTab, setIsEdit } = modalSlice.actions;
export default modalSlice.reducer;
