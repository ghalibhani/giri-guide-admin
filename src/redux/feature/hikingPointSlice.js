import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

const fetchHikingPoint = createAsyncThunk(
  "hikingPoint/fetchHikingPoint",
  async (mountainId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/mountains/${mountainId}/hiking-points`
      );
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response ? e.response.data : e.message);
    }
  }
);
const fetchHikingPointById = createAsyncThunk(
  "hikingPoint/fetchHikingPointById",
  async (idHikingPoint, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/hiking-points/${idHikingPoint}`
      );
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response ? e.response.data : e.message);
    }
  }
);

const createHikingPoint = createAsyncThunk(
  "hikingPoint/createHikingPoint",
  async ({ data, id }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/mountains/${id}/hiking-points`,
        data
      );
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response ? e.response.data : e.message);
    }
  }
);

const updateHikingPoint = createAsyncThunk(
  "hikingPoint/updateHikingPoint",
  async ({ idHikingPoint, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `mountains/hiking-points/${idHikingPoint}`,
        data
      );
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response ? e.response.data : e.message);
    }
  }
);

const deleteHikingPoint = createAsyncThunk(
  "hikingPoint/deleteHikingPoint",
  async (idHikingPoint, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`mountains/hiking-points/${idHikingPoint}`);
      return idHikingPoint;
    } catch (e) {
      return rejectWithValue(e.response ? e.response.data : e.message);
    }
  }
);

const hikingPointSlice = createSlice({
  name: "hikingPoint",
  initialState: {
    hikingPoints: [],
    selectedHikingPoint: null,
    isUpdate: false,
    mountainId: null,
    paging: null,
    status: null,
    error: null,
  },
  reducers: {
    addMountainId: (state, action) => {
      state.mountainId = action.payload;
    },
    addSelectedHikingPoint: (state, action) => {
      state.selectedHikingPoint = action.payload;
    },
    setIsUpdate: (state, action) => {
      state.isUpdate = action.payload;
    },
    clearSeletedHikingPoint: (state) => {
      state.selectedHikingPoint = null;
    },
    clearMountainId: (state) => {
      state.mountainId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHikingPoint.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHikingPoint.fulfilled, (state, action) => {
        const { data, paging } = action.payload || {};
        state.hikingPoints = Array.isArray(data) ? data : [];
        state.paging = paging || null;
        state.status = "success";
      })
      .addCase(fetchHikingPoint.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchHikingPointById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHikingPointById.fulfilled, (state, action) => {
        state.selectedHikingPoint = action.payload;
        state.status = "success";
      })
      .addCase(fetchHikingPointById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(createHikingPoint.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createHikingPoint.fulfilled, (state, action) => {
        const newPoint = action.payload.data;
        state.hikingPoints = Array.isArray(state.hikingPoints)
          ? [...state.hikingPoints, newPoint]
          : [newPoint];
        state.status = "success";
      })
      .addCase(createHikingPoint.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(updateHikingPoint.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateHikingPoint.fulfilled, (state, action) => {
        const updatedPoint = action.payload.data;
        state.hikingPoints = state.hikingPoints.map((hikingPoint) =>
          hikingPoint.id === updatedPoint.id ? updatedPoint : hikingPoint
        );
        state.status = "success";
      })
      .addCase(updateHikingPoint.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(deleteHikingPoint.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteHikingPoint.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.hikingPoints = state.hikingPoints.filter(
          (hikingPoint) => hikingPoint.id !== deletedId
        );
        state.status = "success";
      })
      .addCase(deleteHikingPoint.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default hikingPointSlice.reducer;
export const {
  addMountainId,
  addSelectedHikingPoint,
  clearSeletedHikingPoint,
  clearMountainId,
  setIsUpdate,
} = hikingPointSlice.actions;
export {
  fetchHikingPoint,
  createHikingPoint,
  updateHikingPoint,
  deleteHikingPoint,
  fetchHikingPointById,
};
