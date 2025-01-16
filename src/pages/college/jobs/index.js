import { lazy } from "react";
import { Route } from "react-router-dom";
const Jobs = lazy(() => import("./Jobs"));
const Invite = lazy(() => import("../test/Invite"));
const Overview = lazy(() => import("../companies/CompanyJobOverview"));
const ViewInvitedStudents = lazy(() => import("../companies/ViewInvitedStudents"));

export default function jobRoute(entity) {

    return (
    <Route path={`${entity}jobs`}>
      <Route path="" element={<Jobs />} />
      <Route path="test/invite" element={<Invite />} />
      <Route path="overview/:id" element={<Overview />} />
       <Route
              path="overview/:id/invitedStudents"
              element={<ViewInvitedStudents />}
            />
    </Route>
  );
}
