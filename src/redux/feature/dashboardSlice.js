import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const fetchRevenue = createAsyncThunk(
  "dashboard/fetchRevenue",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/transactions/revenue`);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const fetchDashboardStatus = createAsyncThunk(
  "dashboard/fetchDashboardStatus",
  async ({ month, year }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/transactions/dashboard/info-status` +
          (month ? `?month=${month}` : "") +
          (year ? `&year=${year}` : "")
      );
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const fetchDashboard = createAsyncThunk(
  "dashboard/fetchDashboard",
  async ({ month, year }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/transactions/dashboard` +
          (month ? `?month=${month}` : "") +
          (year ? `&year=${year}` : "")
      );
      return response.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.data);
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    isLoading: false,
    isError: false,
    message: "",
    revenueData: [],
    dashboardData: [],
    totalIncome: 0,
    totalIncomeMonth: 0,
    registerCount: 0,
    dashboardStatus: [],
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsError: (state, action) => {
      state.isError = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRevenue.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchRevenue.fulfilled, (state, action) => {
        state.isLoading = false;
        const revenueObject = action.payload?.data?.revenueOneYearBefore;
        if (revenueObject) {
          const revenueArray = Object.entries(revenueObject).map(
            ([month, revenue]) => ({
              name: month,
              revenue,
            })
          );
          state.revenueData = revenueArray.sort((a, b) => {
            const dateA = new Date(a.name);
            const dateB = new Date(b.name);
            return (
              dateA.getFullYear() - dateB.getFullYear() ||
              dateA.getMonth() - dateB.getMonth()
            );
          });
          state.message = action.payload.message;
        } else {
          state.isError = true;
          state.message = "Revenue data is undefined or missing.";
        }
      })
      .addCase(fetchRevenue.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchDashboardStatus.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchDashboardStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dashboardStatus = Object.entries(
          action.payload.data.countTransaction
        ).map(([name, value]) => ({
          name,
          value,
        }));
        state.message = action.payload.message;
      })
      .addCase(fetchDashboardStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchDashboard.pending, (state) => {
        console.log("Fetching dashboard...");
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        console.log("Dashboard fetched");
        console.log(action.payload);
        state.isLoading = false;
        state.totalIncome = action.payload.data.totalIncome;
        state.totalIncomeMonth = action.payload.data.totalIncomeMonth.income;
        state.registerCount = action.payload.data.registerCount.registerCount;
        state.message = action.payload.message;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { setIsLoading, setIsError, setMessage } = dashboardSlice.actions;
export default dashboardSlice.reducer;
