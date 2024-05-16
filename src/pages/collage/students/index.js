import React, { lazy } from "react";
import { Route } from "react-router-dom";
const StudentsMainPage = lazy(() => import("./StudentsMainPage"));
const StudentsProfilePage = lazy(() => import("./StudentsProfilePage"));

export default function StudentRoute() {
  return (
    <Route path="/collage/students">
      <Route path="" element={<StudentsMainPage />}  />
      <Route path="profile/:id" element={<StudentsProfilePage />} />
    </Route>
  );
}
