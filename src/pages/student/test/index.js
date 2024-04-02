import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import TestOverview from "./TestOverview";
import TestHome from "./TestHome";


const TestPage = lazy(() => import("./TestPage"));

// const NameAssessmentPage = lazy(() => import("./NameAssessmentPage"));

const StudentTestRoute = () => {
  return (
    <Route>
      <Route path="student/test" element={<TestPage />} />
      <Route path="student/test/section/:id" element={<TestHome />} />
      <Route path="student/test/:testId" element={<TestOverview />} />
      <Route path="student/test/:testId/start" element={<TestHome />} />

      {/* <Route path="assessment" element={<AssessmentPage />} /> */}
    </Route>
  );
}

export default StudentTestRoute;
