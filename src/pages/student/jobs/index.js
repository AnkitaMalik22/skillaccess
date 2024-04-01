import { lazy } from "react";
import { Route } from "react-router-dom";

const JobsPage = lazy(() => import("./JobsPage.jsx"));
// const NotificationsPage = lazy(() => import("./NotificationsPage.jsx"));

// const ActivityPage = lazy(() => import("./ActivityPage.jsx"));
// const SecurityPage = lazy(() => import("./SecurityPage.jsx"));
// const SecurityAppPage = lazy(() => import("./SecurityAppPage.jsx"));
// const SecondFAPage = lazy(() => import("./SecondFAPage.jsx"));

function StudentJobsRoute() {
  return (
    <Route path="student/jobs">
      <Route path="" element={<JobsPage />} />
    </Route>
  );
}

export default StudentJobsRoute;
