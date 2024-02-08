import React, { lazy } from "react";
import { Route } from "react-router-dom";

const CompaniesPage = lazy(() => import("./CompaniesPage"));
const CompanyProfilePage = lazy(() => import("./CompanyProfilePage"));
const CompanyJobOverviewPage = lazy(() => import("./CompanyJobOverviewPage"));

export default function CompaniesRoute() {
  return (
    <Route path="collage/companies">
      <Route path="" element={<CompaniesPage />} />
      <Route path="profile" element={<CompanyProfilePage />} />
      <Route path="jobOverview" element={<CompanyJobOverviewPage />} />
    </Route>
  );
}
