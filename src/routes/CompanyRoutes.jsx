import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import CompanyLayout from "../layout/CompanyLayout";
import DashboardCompany from "../pages/company/dashboard/Dashboard";
import CompanyProfile from "../pages/company/profile/Profile";
import Job from "../pages/company/jobs/Job";
import CreateJob from "../pages/company/jobs/CreateJob";
import JobDetailsPage from "../pages/company/jobs/JobDetails";
import InvitedStudentsForJob from "../pages/company/jobs/InvitedStudentsForJob";
import AddTestToJob from "../pages/company/jobs/AddTestToJob";
import EditJob from "../pages/company/jobs/EditJob";
import Settings from "../pages/company/settings/Settings";

import CompanyResultRoutes from "../pages/company/results";
import QuesRoute from "../pages/college/quesBank";
import CampusDriveRouter from "../pages/company/campusDrive/CampusDriveRouter";
import TestRoute from "../pages/college/test/TestHome";
import ResultsRoute from "../pages/college/results";
import StudentRoute from "../pages/college/students";
import { COLLEGE_PATH, UNIVERSITY_PATH } from "../constants/routes";

const CompanyRoutes = ({ user }) => {
  if (user?.role === "college") {
    location.href = COLLEGE_PATH;
  } else if (user?.role === "university") {
    location.href = UNIVERSITY_PATH;
  }

  return (
    <Routes>
      <Route path="pr" element={<CompanyLayout />}>
        <Route path="dashboard" element={<DashboardCompany />} />
        <Route path="profile" element={<CompanyProfile />} />
        <Route path="jobs" element={<Job />} />
        <Route path="jobs/create" element={<CreateJob />} />
        <Route path="jobs/:id" element={<JobDetailsPage />} />
        <Route path="job/students" element={<InvitedStudentsForJob />} />
        <Route path="job/add-test/:jobId" element={<AddTestToJob />} />
        <Route path="job/edit/:jobId" element={<EditJob />} />
        <Route path="settings" element={<Settings />} />
        {/* {CompanyTestHome("")} */}
        {StudentRoute("")}
        {ResultsRoute("")}
        {QuesRoute("")}
        {CampusDriveRouter("")}
        {TestRoute("")}
      </Route>
      <Route
        path="*"
        element={<Navigate to="/company/pr/dashboard" replace />}
      />
    </Routes>
  );
};

export default CompanyRoutes;
