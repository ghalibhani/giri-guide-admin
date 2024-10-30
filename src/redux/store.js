import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./feature/authSlice";
import mountainReducer from "./feature/mountainSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    mountain: mountainReducer,
  },
});

export default store;
