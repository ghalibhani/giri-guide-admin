import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./feature/authSlice";
import mountainReducer from "./feature/mountainSlice";
import TourGuideReducer from "./feature/tourGuideSlice";
import HikingPointReducer from "./feature/hikingPointSlice";
import transactionReducer from "./feature/transactionSlice";
import widrawReducer from "./feature/widrawSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    mountain: mountainReducer,
    tourGuide: TourGuideReducer,
    hikingPoint: HikingPointReducer,
    transaction: transactionReducer,
    widraw: widrawReducer,
  },
});

export default store;