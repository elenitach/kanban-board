import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Document } from "../api/interfaces";
import { FetchStatuses } from "./interfaces";
import { getDocuments } from "../api/methods";
import { v4 as uuid } from "uuid";

export interface DocumentsState {
  documents: Document[];
  fetchStatus: FetchStatuses | null;
}

const initialState: DocumentsState = {
  documents: [],
  fetchStatus: null,
};

export const fetchDocuments = createAsyncThunk(
  "documents/fetchDocuments",
  async () => {
    const response = await getDocuments();
    return response;
  }
);

export const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    changeStatus: (
      state,
      { payload }: PayloadAction<Pick<Document, "id" | "status">>
    ) => {
      const document = state.documents.find((item) => item.id === payload.id);
      if (document) {
        document.status = payload.status;
      }
    },
    addDocument: (
      state,
      {
        payload: { status, title },
      }: PayloadAction<Pick<Document, "status" | "title">>
    ) => {
      state.documents.push({ id: uuid(), status, title });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDocuments.fulfilled, (state, action) => {
      state.documents = action.payload;
      state.fetchStatus = FetchStatuses.Success;
    });
    builder.addCase(fetchDocuments.pending, (state) => {
      state.fetchStatus = FetchStatuses.Pending;
    });
    builder.addCase(fetchDocuments.rejected, (state) => {
      state.fetchStatus = FetchStatuses.Error;
    });
  },
});

export const { changeStatus, addDocument } = documentsSlice.actions;

export default documentsSlice.reducer;
