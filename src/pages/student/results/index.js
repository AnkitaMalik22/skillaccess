import { lazy } from "react";
import { Route } from "react-router-dom";

const Results = lazy(() => import("./ResultsPage"));
function StudentResultsRoute() {
  return (
    <Route path="student/results">
      <Route path="" element={<Results />} />
    </Route>
  );
}

export default StudentResultsRoute;
