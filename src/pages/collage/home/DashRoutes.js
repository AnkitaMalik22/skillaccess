import React, { lazy } from "react";
import { Route } from "react-router-dom";
const Home = lazy(() => import("./Home"));
const CompanyPage = lazy(() => import("./CompanyPage"));
const JobsPage = lazy(() => import("./JobsPage"));
const StudentsPage = lazy(() => import("./StudentsPage"));

const DashboardRoutes = () => {
  return (
    <Route path="collage/dashboard">
      <Route path="" element={<Home />} />
      <Route path="companies" element={<CompanyPage />} />
      <Route path="jobs" element={<JobsPage />} />
      <Route path="students" element={<StudentsPage />} />
    </Route>
  );
};

export default DashboardRoutes;
