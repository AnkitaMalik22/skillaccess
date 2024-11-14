import React, { lazy } from "react";
import { Route } from "react-router-dom";
const Jobs = lazy(() => import("./Jobs"));
const Companies = lazy(() => import("./Companies"));
const CompanyProfile = lazy(() => import("./CompanyProfile"));
const CompanyJobOverview = lazy(() => import("./CompanyJobOverview"));

export default function CompaniesRoute() {
  return (
    <Route path="college/companies">
      <Route path="" element={<Companies />} />
      <Route path="jobs" element={<Jobs />} />
      <Route path="profile/:id" element={<CompanyProfile />} />
      <Route path="jobOverview/:id" element={<CompanyJobOverview />} />
    </Route>
  );
}
