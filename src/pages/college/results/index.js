import { lazy } from "react";
import { Route } from "react-router-dom";
import AssessmentReview from "./AssessmentReview";
const Results = lazy(() => import("./Results"));
const ResultsOverview = lazy(() => import("./ResultsOverview"));

export default function ResultsRoute() {
  return (
    <Route path="college/results">
      <Route path="" element={<Results />} />
      <Route path="overview" element={<ResultsOverview />} />
      <Route path="assessmentReview" element={<AssessmentReview />} />
    </Route>
  );
}
