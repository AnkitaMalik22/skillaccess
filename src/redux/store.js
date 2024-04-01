import { configureStore } from "@reduxjs/toolkit";
import collageAuthReducer from "../redux/collage/auth/authSlice.js";

import companyReducer from "../redux/features/company/companySlice.js";

import testReducer from "../redux/collage/test/testSlice.js";
import dashboardReducer from "../redux/collage/dashboard/dashboardSlice.js";
import sideReducer from "../redux/collage/sidebar/sideSlice.js";
import studentSideReducer from "../redux/student/sidebar/sideSlice.js";
import teamCollegeReducer from "../redux/collage/teams/teamSlice.js";
import { thunk } from "redux-thunk";

const store = configureStore({
  reducer: {
    collageAuth: collageAuthReducer,
    test: testReducer,
    dashboard: dashboardReducer,
    side: sideReducer,
    studentSide :studentSideReducer,
    company : companyReducer,
    teamCollege : teamCollegeReducer,
  },
});

export default store;