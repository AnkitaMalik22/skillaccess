import { configureStore } from "@reduxjs/toolkit";
import collageAuthReducer from "../redux/features/auth/authSlice.js";
import testReducer from "../redux/features/test/testSlice.js";
import dashboardReducer from "../redux/features/dashboard/dashboardSlice.js";
import { thunk } from "redux-thunk";

const store = configureStore({
  reducer: {
    collageAuth: collageAuthReducer,
    test: testReducer,
    dashboard: dashboardReducer,
  },
});

export default store;
