import { configureStore } from "@reduxjs/toolkit";
import { PgApi } from "../components/features/api/allpg.js";

export const appStore = configureStore({
  reducer: {
    [PgApi.reducerPath]: PgApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(PgApi.middleware),
});
