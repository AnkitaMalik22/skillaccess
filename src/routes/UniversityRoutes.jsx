import React from "react";
import { Route, Routes } from "react-router-dom";
import UniversityLayout from "../layout/UniversityLayout";
import UniversityLoginPage from "../auth/Login";
import RegisterUniversity from "../pages/university/auth/RegisterUniversity";
import AwaitingApproval from "../pages/company/AwatingApproval";
import Dashboard from "../pages/college/dashboard/Dashboard";
import Profile from "../pages/college/profile/Profile";
import Settings from "../pages/college/settings/Settings";
import TestRoute from "../pages/college/test/TestHome";
import StudentRoute from "../pages/college/students";
import QuesRoute from "../pages/college/quesBank";
import ResultsRoute from "../pages/college/results";

const UniversityRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UniversityLoginPage />} />
      <Route path="register" element={<RegisterUniversity />} />
      <Route path="approval" element={<AwaitingApproval />} />
      <Route path="pr" element={<UniversityLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        {TestRoute("")}
        {StudentRoute("")}
        {QuesRoute("")}
        {ResultsRoute("")}
      </Route>
    </Routes>
  );
};

export default UniversityRoutes;
