import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import CollegeLayout from "../layout/CollegeLayout";
import TestRoute from "../pages/college/test/TestHome";
import Dashboard from "../pages/college/dashboard/Dashboard";
import Profile from "../pages/college/profile/Profile";
import StudentRoute from "../pages/college/students";
import QuesRoute from "../pages/college/quesBank";
import CompaniesRoute from "../pages/college/companies";
import ResultsRoute from "../pages/college/results";
import InboxRoute from "../pages/college/inbox";
import SettingsRoute from "../pages/college/settings";
import TeamsRoute from "../pages/college/teams";
import AccountRoute from "../pages/college/accounting/AccountRoutes";
import AdditionalDetailsForm from "../pages/college/profile/AdditionalDetailsForm";
import CampusDriveRouter from "../pages/college/campusDrive/CollegeCampusDriveRoutes";
import jobRoute from "../pages/college/jobs";
import { COMPANY_PATH, UNIVERSITY_PATH } from "../constants/routes";

const CollegeRoutes = ({ user }) => {
  if (user?.role === "company") {
    window.location.href = COMPANY_PATH;
  } else if (user?.role === "university") {
    window.location.href = UNIVERSITY_PATH;
  }
  return (
    <Routes>
      <Route element={<CollegeLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile/details" element={<AdditionalDetailsForm />} />
        {/* <Route path="jobs" element={<Jobs />} /> */}
        {jobRoute("")}
        {TestRoute("")}
        {StudentRoute("")}
        {QuesRoute("")}
        {CompaniesRoute("")}
        {ResultsRoute("")}
        {InboxRoute("")}
        {SettingsRoute("")}
        {TeamsRoute("")}
        {AccountRoute("")}
        {CampusDriveRouter("")}
        <Route
          path="*"
          element={<Navigate to="/college/dashboard" replace />}
        />
      </Route>
    </Routes>
  );
};

export default CollegeRoutes;
