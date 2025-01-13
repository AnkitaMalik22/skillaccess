import React, { lazy } from "react";
import { Route } from "react-router-dom";
const Jobs = lazy(() => import("./Jobs"));
const Companies = lazy(() => import("./Companies"));
const CompanyProfile = lazy(() => import("./CompanyProfile"));
const CompanyJobOverview = lazy(() => import("./CompanyJobOverview"));
const ViewInvitedStudents = lazy(() => import("./ViewInvitedStudents"));

export default function CompaniesRoute(entity) {
  return (
    <Route path={`${entity}companies`} >
      <Route path="" element={<Companies />} />
      <Route path="jobs" element={<Jobs />} />
      <Route path="profile/:id" element={<CompanyProfile />} />
      <Route path="overview/:id" element={<CompanyJobOverview />} />
      <Route
        path="jobOverview/:id/invitedStudents"
        element={<ViewInvitedStudents />}
      />
    </Route>
  );
}
