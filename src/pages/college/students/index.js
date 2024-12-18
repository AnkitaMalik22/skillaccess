import React, { lazy } from "react";
import { Route } from "react-router-dom";
const Students = lazy(() => import("./Students"));
const StudentsProfile = lazy(() => import("./StudentsProfile"));

export default function StudentRoute(entity) {
  return (
    <Route path={`${entity}students`}>
      <Route path="" element={<Students />} />
      <Route path="profile/:id" element={<StudentsProfile />} />
    </Route>
  );
}
