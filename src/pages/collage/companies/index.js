import React, { lazy } from "react";
import { Route } from "react-router-dom";
const JobsPage = lazy(() => import("./JobsPage"));

const CompaniesPage = lazy(() => import("./CompaniesPage"));
const CompanyProfilePage = lazy(() => import("./CompanyProfilePage"));
const CompanyJobOverviewPage = lazy(() => import("./CompanyJobOverviewPage"));

export default function CompaniesRoute() {
  return (
    <Route path="collage/companies">
      <Route path="" element={<CompaniesPage />} />
      <Route path="jobs" element={<JobsPage />} />
      <Route path="profile/:id" element={<CompanyProfilePage />} />
      <Route path="jobOverview/:id" element={<CompanyJobOverviewPage />} />
    </Route>
  );
}
