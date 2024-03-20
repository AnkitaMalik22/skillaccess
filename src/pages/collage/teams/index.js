import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const TeamsPage = lazy(() => import("./TeamsPage"));
const Profile = lazy(() => import("./ProfileTeacherPage"));

function TeamsRoute() {
  return (
    <Route path="collage/teams">
      <Route path="" element={<TeamsPage />} />
      <Route path="profile" element={<Profile />} />
    </Route>
  );
}

export default TeamsRoute;
