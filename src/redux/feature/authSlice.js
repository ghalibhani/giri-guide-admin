import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
export const login = createAsyncThunk(
  "userCredential/login",
  async (userCredential, { rejectedWithValue }) => {
    try {
      console.log("login user", userCredential);
      const response = await axiosInstance.post(`/auth/login`, userCredential);
      console.log("login response", response);
      return response.data;
    } catch (e) {
      return rejectedWithValue(e.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "userCredential/register",
  async (userData, { rejectedWithValue }) => {
    try {
      console.log(userData);
      const response = await axiosInstance.post(`/auth/register`, userData);
      if (response.statusCode === 201) {
        return response.data;
      }
      return "Gagal Register New User";
    } catch (e) {
      return rejectedWithValue(e.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "userCredential",
  initialState: {
    token: null,
    isLoggedIn: false,
    email: null,
    userId: null,
    role: null,
    error: null,
    status: null,
  },
  reducers: {
    logout: (state) => {
      return {
        ...state,
        token: null,
        isLoggedIn: false,
        email: null,
        role: null,
        userId: null,
        status: null,
      };
    },
    keepLogin: (state, action) => {
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload,
        status: "success",
        role: action.payload.role,
        email: action.payload.email,
        userId: action.payload.userId,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        console.log("loading is pending", "current state", state);
        return (state = { ...state, status: "loading" });
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("login is fulfilled", action.payload);
        console.log("payload", action.payload.data.token);
        console.log(action.payload.data.role);
        return (state = {
          ...state,
          token: action.payload.data.token,
          role: action.payload.data.role,
          email: action.payload.data.email,
          userId: action.payload.data.userId,
          status: "success",
          isLoggedIn: true,
        });
      })
      .addCase(login.rejected, (state, action) => {
        console.log("login is rejected", action.payload);
        console.log("current state", state);
        console.log("payload", action.payload);
        console.log("error", action.error);
        return {
          ...state,
          status: "failed",
          error: action.payload,
        };
      })
      .addCase(register.pending, (state) => {
        console.log("register is pending", "current state", state);
        return (state = { ...state, status: "loading" });
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log("register is fulfilled", action.payload);
        console.log("current state", state);
        return (state = { ...state, status: "success" });
      })
      .addCase(register.rejected, (state, action) => {
        console.log("register is rejected", action.payload);
        console.log("current state", state);
        return (state = { ...state, status: "failed", error: action.payload });
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state = { ...state, error: action.payload, status: "failed" };
        }
      );
  },
});
export const { logout, keepLogin } = authSlice.actions;
export default authSlice.reducer;
