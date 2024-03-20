import React, { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "../../../components/ErrorBoundry";
const Assessment = lazy(() =>
  import("../../../components/collage/test/assessment/Assessment")
);
const CollageLayout = lazy(() => import("../../../layout/Collage"));

const AssessmentPage = () => {
  return (
    <ErrorBoundary FallbackComponent={Fallback} onReset={() => {}}>
      <Suspense fallback={<>loading</>}>
        <CollageLayout>
          <Assessment />
        </CollageLayout>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AssessmentPage;
