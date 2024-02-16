import { combineReducers } from "@reduxjs/toolkit";
import common from "@/lib/features/commonSlice";
import page from "@/lib/features/pageSlice";

const rootReducer = combineReducers({
  common,
  page,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
