import { combineReducers } from "@reduxjs/toolkit";
import toast from "@/lib/features/toastSlice";
import page from "@/lib/features/pageSlice";

const rootReducer = combineReducers({
  toast,
  page,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
