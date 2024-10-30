import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axiosInstance";

const fetchMountain = createAsyncThunk("mountain/fetchMountain", async () => {
  try {
    const response = await axiosInstance.get("/mountains");
    return response.data;
  } catch (e) {
    return e.response.data;
  }
});
const updateMountain = createAsyncThunk(
  "mountain/updateMountain",
  async (data) => {
    try {
      const response = await axiosInstance.put(`/mountains`, data);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);
const createMountain = createAsyncThunk(
  "mountain/createMountain",
  async (data) => {
    try {
      const response = await axiosInstance.post(`/mountains`, data);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);
const deleteMountain = createAsyncThunk(
  "mountain/deleteMountain",
  async (id) => {
    try {
      const response = await axiosInstance.delete(`/mountains/${id}`);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);
const mountainSlice = createSlice({
  name: "mountain",
  initialState: {
    mountains: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMountain.pending, (state) => {
        return (state = { ...state, status: "loading" });
      })
      .addCase(fetchMountain.fulfilled, (state, action) => {
        return (state = {
          ...state,
          mountains: action.payload.data,
          status: "success",
        });
      })
      .addCase(fetchMountain.rejected, (state, action) => {
        return (state = {
          ...state,
          status: "failed",
          error: action.error.message,
        });
      })
      .addCase(updateMountain.pending, (state) => {
        return (state = { ...state, status: "loading" });
      })
      .addCase(updateMountain.fulfilled, (state, action) => {
        return (state = {
          ...state,
          mountains: action.payload.data,
          status: "success",
        });
      })
      .addCase(updateMountain.rejected, (state, action) => {
        return (state = {
          ...state,
          status: "failed",
          error: action.error.message,
        });
      })
      .addCase(createMountain.pending, (state) => {
        return (state = { ...state, status: "loading" });
      })
      .addCase(createMountain.fulfilled, (state, action) => {
        return (state = {
          ...state,
          mountains: action.payload.data,
          status: "success",
        });
      })
      .addCase(createMountain.rejected, (state, action) => {
        return (state = {
          ...state,
          status: "failed",
          error: action.error.message,
        });
      })
      .addCase(deleteMountain.pending, (state) => {
        return (state = { ...state, status: "loading" });
      })
      .addCase(deleteMountain.fulfilled, (state, action) => {
        return (state = {
          ...state,
          mountains: action.payload.data,
          status: "success",
        });
      })
      .addCase(deleteMountain.rejected, (state, action) => {
        return (state = {
          ...state,
          status: "failed",
          error: action.error.message,
        });
      });
  },
});
export { fetchMountain, updateMountain, createMountain, deleteMountain };
export default mountainSlice.reducer;
