import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import langReducer from "./slice/langSlice";
import historyReducer from "./slice/historySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lang: langReducer,
    history: historyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
