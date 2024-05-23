import React, { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "../../../components/ErrorBoundry";
import useTranslate from "../../../hooks/useTranslate";
const Assessment = lazy(() =>
  import("../../../components/collage/test/assessment/Assessment")
);

const AssessmentPage = () => {
  useTranslate();
  return (
    <ErrorBoundary FallbackComponent={Fallback} onReset={() => {}}>
      <Suspense fallback={<>loading</>}>
        <Assessment />
      </Suspense>
    </ErrorBoundary>
  );
};

export default AssessmentPage;
