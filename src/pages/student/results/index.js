import { lazy } from "react";
import { Route } from "react-router-dom";

const Results = lazy(() => import("./ResultsPage"));
const ResultsOverview = lazy(() => import("./OverviewPage"));
function StudentResultsRoute() {
  return (
    <Route path="student/results">
      <Route path="" element={<Results />} />
      <Route path="overview" element={<ResultsOverview />} />
    </Route>
  );
}

export default StudentResultsRoute;
