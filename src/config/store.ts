import { configureStore } from "@reduxjs/toolkit";
import documentsSlice from "@/modules/board/store/documentsSlice";

export const store = configureStore({
  reducer: {
    documents: documentsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
