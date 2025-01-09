import React from "react";
import { Route, Routes } from "react-router-dom";
import CompanyLayout from "../layout/CompanyLayout";
import LoginCompany from "../auth/Login";
import RegisterCompany from "../pages/company/auth/RegisterCompany";
import AwaitingApproval from "../pages/company/AwatingApproval";
import DashboardCompany from "../pages/company/dashboard/Dashboard";
import CompanyProfile from "../pages/company/profile/Profile";
import Job from "../pages/company/jobs/Job";
import CreateJob from "../pages/company/jobs/CreateJob";
import JobDetailsPage from "../pages/company/jobs/JobDetails";
import InvitedStudentsForJob from "../pages/company/jobs/InvitedStudentsForJob";
import AddTestToJob from "../pages/company/jobs/AddTestToJob";
import EditJob from "../pages/company/jobs/EditJob";
import Settings from "../pages/company/settings/Settings";
import CompanyTestHome from "../pages/company/test/TestHome";
import CompanyResultRoutes from "../pages/company/results";
import QuesRoute from "../pages/college/quesBank";
import CampusDriveRouter from "../pages/company/campusDrive/CampusDriveRouter";

const CompanyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginCompany />} />
      <Route path="register" element={<RegisterCompany />} />
      <Route path="approval" element={<AwaitingApproval />} />
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
        {CompanyTestHome("")}
        {CompanyResultRoutes("")}
        {QuesRoute("")}
        {CampusDriveRouter("")}
      </Route>
    </Routes>
  );
};

export default CompanyRoutes;
