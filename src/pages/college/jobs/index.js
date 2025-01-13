import { lazy } from "react";
import { Route } from "react-router-dom";
const Jobs = lazy(() => import("./Jobs"));
const Invite = lazy(() => import("../test/Invite"));
const Overview = lazy(() => import("../companies/CompanyJobOverview"));

export default function jobRoute(entity) {

    return (
    <Route path={`${entity}jobs`}>
      <Route path="" element={<Jobs />} />
      <Route path="test/invite" element={<Invite />} />
      <Route path="overview/:id" element={<Overview />} />
    </Route>
  );
}
