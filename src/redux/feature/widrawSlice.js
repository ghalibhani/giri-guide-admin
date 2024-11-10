import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const fetchWidraw = createAsyncThunk(
  "widraw/fetchWidraw",
  async (
    { page = 1, size = 20, status, searchByName },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(
        `/tour-guide/deposits?page=${page}&size=${size}` +
          (status ? `&status=${status}` : "") +
          (searchByName ? `&name=${searchByName}` : "")
      );
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const aproveOrRejectWidraw = createAsyncThunk(
  "widraw/aproveOrRejectWidraw",
  async ({ id, approved, message }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/tour-guide/deposits/${id}?approved=${approved}` +
          (message ? `&message=${message} ` : "")
      );
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const widrawSlice = createSlice({
  name: "widraw",
  initialState: {
    widraws: [],
    paging: null,
    widraw: {},
    status: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWidraw.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWidraw.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.widraws = action.payload.data;
        state.paging = action.payload.paging;
      })
      .addCase(fetchWidraw.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(aproveOrRejectWidraw.pending, (state) => {
        state.status = "loading";
      })
      .addCase(aproveOrRejectWidraw.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.widraws = state.widraws.filter(
          (widraw) => widraw.id !== action.payload
        );
      })
      .addCase(aproveOrRejectWidraw.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default widrawSlice.reducer;
