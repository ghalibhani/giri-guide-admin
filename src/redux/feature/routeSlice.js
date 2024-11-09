import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const fetchRoute = createAsyncThunk(
  "route/fetchRoute",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/routes/${id}`);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const createRoute = createAsyncThunk(
  "route/createRoute",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/routes`, data);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const routeSlice = createSlice({
  name: "route",
  initialState: {
    route: [],
    fragmentRoute: [],
    isRouteUpdating: false,
    status: "",
    error: null,
  },
  reducers: {
    setIsRouteUpdating: (state, action) => {
      state.isRouteUpdating = action.payload;
    },
    addFragmentRoute: (state, action) => {
      state.fragmentRoute.push(action.payload);
    },
    removeFragmentRoute: (state, action) => {
      if (
        action.payload.index >= 0 &&
        action.payload.index < state.fragmentRoute.length
      ) {
        state.fragmentRoute.splice(action.payload.data, action.payload.index);
      }
    },
    updateFragmentRoute: (state, action) => {
      const { index, data } = action.payload;
      if (index >= 0 && index < state.fragmentRoute.length) {
        state.fragmentRoute[index] = { ...state.fragmentRoute[index], ...data };
        if (data.to && index + 1 < state.fragmentRoute.length) {
          state.fragmentRoute[index + 1].from = data.to;
        }
      }
    },

    clearFragmentRoute: (state) => {
      state.fragmentRoute = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoute.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRoute.fulfilled, (state, action) => {
        state.status = "success";
        state.route = action.payload;
      })
      .addCase(fetchRoute.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createRoute.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createRoute.fulfilled, (state, action) => {
        state.status = "success";
        state.route = action.payload;
      })
      .addCase(createRoute.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const {
  setIsRouteUpdating,
  addFragmentRoute,
  removeFragmentRoute,
  clearFragmentRoute,
  updateFragmentRoute,
} = routeSlice.actions;
export default routeSlice.reducer;
