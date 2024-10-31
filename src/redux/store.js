import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./feature/authSlice";
import mountainReducer from "./feature/mountainSlice";
import TourGuideReducer from "./feature/tourGuideSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    mountain: mountainReducer,
    TourGuide: TourGuideReducer,
  },
});

export default store;
