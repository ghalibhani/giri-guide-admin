import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const fetchTransaction = createAsyncThunk(
  "transaction/fetchTransaction",
  async ({ page = 1, size = 20, status = "" }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/transactions?page=${page}&size=${size}` +
          (status ? `&status=${status}` : "")
      );
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const fetchTransactionById = createAsyncThunk(
  "transaction/fetchTransactionById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/transactions/${id}`);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transactions: [],
    transactionDetails: null,
    paging: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransaction.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.transactions = action.payload.data;
        state.paging = action.payload.paging;
      })
      .addCase(fetchTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTransactionById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactionById.fulfilled, (state, action) => {
        state.loading = false;
        state.transactionDetails = action.payload.data;
        state.paging = action.payload.paging;
      })
      .addCase(fetchTransactionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default transactionSlice.reducer;
