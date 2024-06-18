import React, { lazy } from "react";
import { Route } from "react-router-dom";
const StudentsPage = lazy(() => import("./StudentsPage"));
const StudentsProfilePage = lazy(() =>
  import("../students/StudentsProfilePage")
);
const DashboardRoutes = () => {
  return (
    <Route path="collage/dashboard">
      <Route path="students" element={<StudentsPage />} />
      <Route path="students/profile" element={<StudentsProfilePage />} />
    </Route>
  );
};

export default DashboardRoutes;
