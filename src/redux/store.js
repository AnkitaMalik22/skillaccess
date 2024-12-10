import { configureStore } from "@reduxjs/toolkit";
import collegeAuthReducer from "./college/auth/authSlice.js";
import companyReducer from "../redux/features/company/companySlice.js";
import testReducer from "./college/test/testSlice.js";
import dashboardReducer from "./college/dashboard/dashboardSlice.js";
import sideReducer from "./college/sidebar/sideSlice.js";
import studentSideReducer from "../redux/student/sidebar/sideSlice.js";
import teamCollegeReducer from "./college/teams/teamSlice.js";
import studentAuthReducer from "./student/auth/studentAuthSlice.js";
import collegeStudentsReducer from "./college/student/studentSlice.js";
import paymentReducer from "./college/account/paymentSlice.js";
import inboxSlice from "./college/Inbox/inboxSlice.js";
import dummySlice from "./college/dummySlice.js";
import resultSlice from "./college/result/result.js";
import companyAuthReducer from  "./company/auth/companyAuthSlice.js";
import jobReducer from "./company/jobs/jobSlice.js";
import companyTestReducer from "../redux/company/test/testSlice.js"
import collegeJobsReducer from "./college/jobs/collegeJobSlice.js";
import companyResultReducer from "./company/result/result.js"
import universityAuthReducer from "./university/auth/universityAuthSlice.js";


const store = configureStore({
  reducer: {
    collegeAuth: collegeAuthReducer,
    test: testReducer,
    dashboard: dashboardReducer,
    side: sideReducer,
    company: companyReducer,
    collegeJobs : collegeJobsReducer,
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
    job : jobReducer,
    companyTest:companyTestReducer,
    companyResult : companyResultReducer,

    // university
    universityAuth: universityAuthReducer,
  },
});

export default store;
