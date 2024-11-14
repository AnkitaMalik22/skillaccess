import { lazy } from "react";
import { Route } from "react-router-dom";
const TeamsPage = lazy(() => import("./TeamsPage"));
const Profile = lazy(() => import("./ProfileTeacherPage"));
const ApprovedTeams = lazy(() => import("./ApprovedTeamsPage"));

function TeamsRoute() {
  return (
    <Route path="college/teams">
      <Route path="" element={<ApprovedTeams />} />
      <Route path="pending" element={<TeamsPage />} />
      <Route path="profile" element={<Profile />} />
    </Route>
  );
}

export default TeamsRoute;
