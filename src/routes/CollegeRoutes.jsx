import React from "react";
import { Route, Routes } from "react-router-dom";
import CollegeLayout from "../layout/CollegeLayout";
import TestRoute from "../pages/college/test/TestHome";
import Dashboard from "../pages/college/dashboard/Dashboard";
import Profile from "../pages/college/profile/Profile";
import Jobs from "../pages/college/jobs/Jobs";
import StudentRoute from "../pages/college/students";
import QuesRoute from "../pages/college/quesBank";
import CompaniesRoute from "../pages/college/companies";
import ResultsRoute from "../pages/college/results";
import InboxRoute from "../pages/college/inbox";
import SettingsRoute from "../pages/college/settings";
import TeamsRoute from "../pages/college/teams";
import AccountRoute from "../pages/college/accounting/AccountRoutes";

const CollegeRoutes = () => {
  return (
    <Routes>
      <Route element={<CollegeLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="jobs" element={<Jobs />} />
        {TestRoute("")}
        {StudentRoute("")}
        {QuesRoute("")}
        {CompaniesRoute("")}
        {ResultsRoute("")}
        {InboxRoute("")}
        {SettingsRoute("")}
        {TeamsRoute("")}
        {AccountRoute("")}
      </Route>
    </Routes>
  );
};

export default CollegeRoutes;
