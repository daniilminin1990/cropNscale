import { configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./appSlice.ts";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    app: appSlice,
  },
});
export type RootReducerType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootReducerType> =
  useSelector;
