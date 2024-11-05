import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

const fetchMountain = createAsyncThunk(
  "mountain/fetchMountain",
  async (data) => {
    try {
      const response = await axiosInstance.get(
        `/mountains?page=${data.page}&limit=${data.limit}`
      );
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

const fetchMountainById = createAsyncThunk(
  "mountain/fetchMountainById",
  async (id) => {
    try {
      const response = await axiosInstance.get(`/mountains/${id}`);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);
const updateMountain = createAsyncThunk(
  "mountain/updateMountain",
  async ({ id, data }) => {
    try {
      await axiosInstance.put(`/mountains/${id}`, data);
      const res = await axiosInstance.get(`/mountains?page=1&limit=20`);
      return res.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

const createMountain = createAsyncThunk(
  "mountain/createMountain",
  async (data) => {
    try {
      await axiosInstance.post(`/mountains`, data);
      const response = await axiosInstance.get(`/mountains?page=1&limit=20`);
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
    selectedMountain: null,
    isMountainUpdating: false,
    paging: null,
    status: null,
    error: null,
  },
  reducers: {
    setIsMountainUpdating: (state, action) => {
      return (state = { ...state, isMountainUpdating: action.payload });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMountain.pending, (state) => {
        return (state = { ...state, status: "loading" });
      })
      .addCase(fetchMountain.fulfilled, (state, action) => {
        return (state = {
          ...state,
          mountains: action.payload.data,
          paging: action.payload.paging,
          status: "success",
        });
      })
      .addCase(fetchMountain.rejected, (state, action) => {
        console.log("fetch mountain is rejected", "current state", state);
        console.log("error", action.error);
        return (state = {
          ...state,
          status: "failed",
          error: action.error.message,
        });
      })
      .addCase(fetchMountainById.pending, (state) => {
        console.log("fetch mountain by id is pending", "current state", state);
        return (state = { ...state, status: "loading" });
      })
      .addCase(fetchMountainById.fulfilled, (state, action) => {
        console.log(
          "fetch mountain by id is fulfilled",
          "current state",
          state
        );
        return (state = {
          ...state,
          selectedMountain: action.payload.data,
          status: "success",
        });
      })
      .addCase(fetchMountainById.rejected, (state, action) => {
        console.log("fetch mountain by id is rejected", "current state", state);
        return {
          ...state,
          status: "failed",
          error: action.error.message,
        };
      })
      .addCase(updateMountain.pending, (state) => {
        console.log("update mountain is pending", "current state", state);
        return (state = { ...state, status: "loading" });
      })
      .addCase(updateMountain.fulfilled, (state, action) => {
        console.log("update mountain is fulfilled", "current state", state);
        console.log("payload", action.payload);
        return {
          ...state,
          mountains: action.payload.data,
          status: "success",
          paging: action.payload.paging,
        };
      })
      .addCase(updateMountain.rejected, (state, action) => {
        console.log("update mountain is rejected", "current state", state);
        console.log("error", action.error);
        return (state = {
          ...state,
          status: "failed",
          error: action.error.message,
        });
      })
      .addCase(createMountain.pending, (state) => {
        console.log("create mountain is pending", "current state", state);
        return (state = { ...state, status: "loading" });
      })
      .addCase(createMountain.fulfilled, (state, action) => {
        console.log("create mountain is fulfilled", "current state", state);
        console.log("payload", action.payload);
        return {
          ...state,
          mountains: action.payload.data,
          status: "success",
        };
      })
      .addCase(createMountain.rejected, (state, action) => {
        console.log("create mountain is rejected", "current state", state);
        console.log("error", action.error);
        return {
          ...state,
          status: "failed",
          error: action.error.message,
        };
      })
      .addCase(deleteMountain.pending, (state) => {
        console.log("delete mountain is pending", "current state", state);
        return (state = { ...state, status: "loading" });
      })
      .addCase(deleteMountain.fulfilled, (state, action) => {
        console.log("delete mountain is fulfilled", "current state", state);
        console.log("payload", action.payload);
        return (state = {
          ...state,
          mountains: action.payload.data,
          status: "success",
        });
      })
      .addCase(deleteMountain.rejected, (state, action) => {
        console.log("delete mountain is rejected", "current state", state);
        console.log("error", action.error);
        return (state = {
          ...state,
          status: "failed",
          error: action.error.message,
        });
      });
  },
});
export {
  fetchMountain,
  updateMountain,
  createMountain,
  deleteMountain,
  fetchMountainById,
};
export const { setIsUpdate } = mountainSlice.actions;
export default mountainSlice.reducer;
