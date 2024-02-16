import { combineReducers } from "@reduxjs/toolkit";
import toast from "@/lib/features/toastSlice";

const rootReducer = combineReducers({
  toast,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
