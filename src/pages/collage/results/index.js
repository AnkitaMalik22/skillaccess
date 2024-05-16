import React, { lazy } from "react";
import { Route } from "react-router-dom";
import AssessmentReviewPage from "./AssessmentReviewPage";

const ResultsPage = lazy(() => import("./ResultsPage"));
const ResultsOverviewPage = lazy(() => import("./ResultsOverviewPage"));

export default function ResultsRoute() {
  return (
    <Route path="collage/results">
      <Route path="" element={<ResultsPage />} />
      <Route path="overview" element={<ResultsOverviewPage />} />
      <Route path="assessmentReview" element={<AssessmentReviewPage />} />
    </Route>
  );
}
