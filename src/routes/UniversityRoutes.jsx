import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import UniversityLayout from "../layout/UniversityLayout";
import Dashboard from "../pages/college/dashboard/Dashboard";
import Profile from "../pages/college/profile/Profile";
import Settings from "../pages/college/settings/Settings";
import TestRoute from "../pages/college/test/TestHome";
import StudentRoute from "../pages/college/students";
import QuesRoute from "../pages/college/quesBank";
import ResultsRoute from "../pages/college/results";
import { COLLEGE_PATH, COMPANY_PATH } from "../constants/routes";

const UniversityRoutes = ({ user }) => {
  if (user?.role === "college") {
    location.href = COLLEGE_PATH;
  } else if (user?.role === "company") {
    location.href = COMPANY_PATH;
  }

  return (
    <Routes>
      <Route path="pr" element={<UniversityLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        {TestRoute("")}
        {StudentRoute("")}
        {QuesRoute("")}
        {ResultsRoute("")}
      </Route>
      <Route
        path="*"
        element={<Navigate to="/university/pr/dashboard" replace />}
      />
    </Routes>
  );
};

export default UniversityRoutes;
