import { lazy } from "react";
import { Route } from "react-router-dom";

const Dashboard = lazy(() => import("./DashboardPage"));
const Jobs = lazy(() => import("./JobsPage"));
const Test = lazy(() => import("./Assessments"));

function StudentDashRoute() {
  return (
    <Route path="student/dashboard">
      <Route path="" element={<Dashboard />} />
      <Route path="jobs" element={<Jobs />} />
      <Route path="assessment" element={<Test />} />
    </Route>
  );
}

export default StudentDashRoute;
