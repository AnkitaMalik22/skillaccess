import { lazy } from "react";
import { Route } from "react-router-dom";

const JobsPage = lazy(() => import("./JobsPage.jsx"));
const ViewCompanyDetailsPage=lazy(()=>import('./ViewCompanyDetailsPage.jsx'))

function StudentJobsRoute() {
  return (
    <Route path="student/jobs">
      <Route path="" element={<JobsPage />} />
      <Route path="companyDetails" element={<ViewCompanyDetailsPage />} />
    </Route>
  );
}

export default StudentJobsRoute;
