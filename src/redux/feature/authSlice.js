import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "userCredential/login",
  async (userCredential, { rejectedWithValue }) => {
    try {
      const response = await axiosInstance.post(`/auth/login`, userCredential);
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
      const response = await axiosInstance.post(`/auth/register`, userData);
      if (data.statusCode === 201) {
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
    error: null,
    status: null,
  },
  reducers: {
    logout: (state) => {
      return { ...state, token: null, isLoggedIn: false };
    },
    keepLogin: (state, action) => {
      return { ...state, isLoggedIn: true, token: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        return (state = { ...state, status: "loading" });
      })
      .addCase(login.fulfilled, (state, action) => {
        return (state = {
          ...state,
          token: action.payload.data.token,
          isLoggedIn: true,
        });
      })
      .addCase(login.rejected, (state, action) => {
        return (state = {
          ...state,
          status: "failed",
          error: action.payload || "Email or Password is incorrect",
        });
      })
      .addCase(register.pending, (state) => {
        return (state = { ...state, status: "loading" });
      })
      .addCase(register.fulfilled, (state, action) => {
        return (state = { ...state, status: "Registered user" });
      })
      .addCase(register.rejected, (state, action) => {
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
