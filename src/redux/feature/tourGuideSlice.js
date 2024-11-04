import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

const fetchTourGuide = createAsyncThunk(
  "tourGuide/fetchTourGuide",
  async () => {
    try {
      const response = await axiosInstance.get("/tour-guides");
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);
const createTourGuide = createAsyncThunk(
  "tourGuide/createTourGuide",
  async (data) => {
    try {
      const response = await axiosInstance.post(`/tour-guides`, data);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);
const updateTourGuide = createAsyncThunk(
  "tourGuide/updateTourGuide",
  async (data) => {
    try {
      const response = await axiosInstance.put(`/tour-guides`, data);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);
const deleteTourGuide = createAsyncThunk(
  "tourGuide/deleteTourGuide",
  async (id) => {
    try {
      const response = await axiosInstance.delete(`/tour-guides/${id}`);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);
const tourGuideSlice = createSlice({
  name: "tourGuide",
  initialState: {
    tourGuides: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTourGuide.pending, (state) => {
        console.log("fetch tour guide is pending", "current state", state);
        state.status = "loading";
      })
      .addCase(fetchTourGuide.fulfilled, (state, action) => {
        console.log("fetch tour guide is fulfilled", "current state", state);
        console.log("action payload", action.payload);
        state.status = "succeeded";
        state.tourGuides = action.payload;
      })
      .addCase(fetchTourGuide.rejected, (state, action) => {
        console.log("fetch tour guide is rejected", "current state", state);
        console.log("action error", action.error);
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createTourGuide.pending, (state) => {
        console.log("create tour guide is pending", "current state", state);
        state.status = "loading";
      })
      .addCase(createTourGuide.fulfilled, (state, action) => {
        console.log("create tour guide is fulfilled", "current state", state);
        console.log("action payload", action.payload);
        state.status = "succeeded";
        state.tourGuides.push(action.payload);
      })
      .addCase(createTourGuide.rejected, (state, action) => {
        console.log("create tour guide is rejected", "current state", state);
        console.log("action error", action.error);
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateTourGuide.pending, (state) => {
        console.log("update tour guide is pending", "current state", state);
        state.status = "loading";
      })
      .addCase(updateTourGuide.fulfilled, (state, action) => {
        console.log("update tour guide is fulfilled", "current state", state);
        console.log("action payload", action.payload);
        state.status = "succeeded";
        state.tourGuides = state.tourGuides.map((tourGuide) => {
          if (tourGuide._id === action.payload._id) {
            return action.payload;
          }
          return tourGuide;
        });
      })
      .addCase(updateTourGuide.rejected, (state, action) => {
        console.log("update tour guide is rejected", "current state", state);
        console.log("action error", action.error);
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteTourGuide.pending, (state) => {
        console.log("delete tour guide is pending", "current state", state);
        state.status = "loading";
      })
      .addCase(deleteTourGuide.fulfilled, (state, action) => {
        console.log("delete tour guide is fulfilled", "current state", state);
        console.log("action payload", action.payload);
        state.status = "succeeded";
        state.tourGuides = state.tourGuides.filter(
          (tourGuide) => tourGuide._id !== action.payload._id
        );
      })
      .addCase(deleteTourGuide.rejected, (state, action) => {
        console.log("delete tour guide is rejected", "current state", state);
        console.log("action error", action.error);
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export { fetchTourGuide, createTourGuide, updateTourGuide, deleteTourGuide };
export default tourGuideSlice.reducer;
