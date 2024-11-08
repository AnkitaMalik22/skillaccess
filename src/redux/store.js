import { configureStore } from "@reduxjs/toolkit";
import collageAuthReducer from "../redux/collage/auth/authSlice.js";
import companyReducer from "../redux/features/company/companySlice.js";
import testReducer from "../redux/collage/test/testSlice.js";
import dashboardReducer from "../redux/collage/dashboard/dashboardSlice.js";
import sideReducer from "../redux/collage/sidebar/sideSlice.js";
import studentSideReducer from "../redux/student/sidebar/sideSlice.js";
import teamCollegeReducer from "../redux/collage/teams/teamSlice.js";
import studentAuthReducer from "./student/auth/studentAuthSlice.js";
import collegeStudentsReducer from "./collage/student/studentSlice.js";
import paymentReducer from "./collage/account/paymentSlice.js";
import inboxSlice from "./collage/Inbox/inboxSlice.js";
import dummySlice from "./collage/dummySlice.js";
import resultSlice from "./collage/result/result.js";
import companyAuthReducer from  "./company/auth/companyAuthSlice.js";

const store = configureStore({
  reducer: {
    collageAuth: collageAuthReducer,
    test: testReducer,
    dashboard: dashboardReducer,
    side: sideReducer,
    company: companyReducer,
    teamCollege: teamCollegeReducer,
    inbox: inboxSlice,
    dummy: dummySlice,
    result: resultSlice,
    // ----------------- STUDENT -----------------
    studentSide: studentSideReducer,
    studentAuth: studentAuthReducer,
    collegeStudents: collegeStudentsReducer,
    payment: paymentReducer,


    // company

    companyAuth:  companyAuthReducer,
  },
});

export default store;
