import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

const fetchTourGuide = createAsyncThunk(
  "tourGuide/fetchTourGuide",
  async ({ page = 1, size = 20 }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/tour-guide?page=${page}&size=${size}`
      );
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const fetchTourGuideById = createAsyncThunk(
  "tourGuide/fetchTourGuideById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/tour-guide/data/${id}`);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);
const createTourGuide = createAsyncThunk(
  "tourGuide/createTourGuide",
  async (data) => {
    try {
      const response = await axiosInstance.post(`/tour-guide`, data);
      return response.data;
    } catch (e) {
      console.log(e);
      return e.response.data;
    }
  }
);

const updateTourGuide = createAsyncThunk(
  "tourGuide/updateTourGuide",
  async ({ id, data }) => {
    console.log(data);
    try {
      await axiosInstance.patch(`/tour-guide/data/${id}`, data);
      return { id, data };
    } catch (e) {
      return e.response.data;
    }
  }
);
const updateTourGuideImage = createAsyncThunk(
  "tourGuide/updateTourGuideImage",
  async ({ id, data }) => {
    try {
      const response = await axiosInstance.patch(
        `/tour-guide/data/${id}/update-image`,
        data
      );
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
      const response = await axiosInstance.delete(`/tour-guide/${id}`);
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
    selectedTourGuide: null,
    tourGuideId: null,
    isTourGuideUpdating: false,
    status: null,
    error: null,
  },
  reducers: {
    setSelectedTourGuide: (state, action) => {
      state.selectedTourGuide = action.payload;
    },
    addTourGuideId: (state, action) => {
      state.tourGuideId = action.payload;
    },
    setIsTourGuideUpdating: (state, action) => {
      state.isTourGuideUpdating = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTourGuide.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTourGuide.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tourGuides = action.payload.data;
      })
      .addCase(fetchTourGuide.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchTourGuideById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTourGuideById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedTourGuide = action.payload;
      })
      .addCase(fetchTourGuideById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createTourGuide.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTourGuide.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tourGuides.push(action.payload);
      })
      .addCase(createTourGuide.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateTourGuide.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTourGuide.fulfilled, (state, action) => {
        console.log(action);
        state.status = "succeeded";
        state.tourGuides = state.tourGuides.map((tourGuide) => {
          if (tourGuide.id === action.payload.id) {
            return { ...tourGuide, ...action.payload.data };
          }
          return tourGuide;
        });
      })
      .addCase(updateTourGuide.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteTourGuide.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTourGuide.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tourGuides = state.tourGuides.filter(
          (tourGuide) => tourGuide.id !== action.payload.id
        );
      })
      .addCase(deleteTourGuide.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export {
  fetchTourGuide,
  createTourGuide,
  updateTourGuide,
  deleteTourGuide,
  fetchTourGuideById,
  updateTourGuideImage,
};
export const { setSelectedTourGuide, addTourGuideId, setIsTourGuideUpdating } =
  tourGuideSlice.actions;
export default tourGuideSlice.reducer;
