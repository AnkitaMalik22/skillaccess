import "./App.css";
import React from "react";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import Home from "./pages/collage/home/Home";

import CompanyPage from "./pages/collage/home/CompanyPage";
import JobsPage from "./pages/collage/home/JobsPage";
import Register from "./pages/collage/auth/Register";
import StudentsPage from "./pages/collage/home/StudentsPage";
import TestPage from "./pages/collage/test/TestPage";
import AssessmentPage from "./pages/collage/test/AssessmentPage";
import NameAssessmentPage from "./pages/collage/test/NameAssessmentPage";
import SelectTestsPage from "./pages/collage/test/SelectTestsPage";
import AddQuestionsPage from "./pages/collage/test/AddQuestionsPage";
import ReviewPage from "./pages/collage/test/ReviewPage";
import AddMcqPage from "./pages/collage/test/AddMcqPage";
import AccountingPage from "./pages/collage/accounting/AccountingPage";
import InboxPage from "./pages/collage/inbox/InboxPage";
import ProfilePage from "./pages/collage/profile/ProfilePage";
import QuesBankPage from "./pages/collage/quesBank/QuesBankPage";
import ResultsPage from "./pages/collage/results/ResultsPage";
import SettingsPage from "./pages/collage/settings/SettingsPage";
import TeamsPage from "./pages/collage/teams/TeamsPage";
import CompaniesPage from "./pages/collage/companies/CompaniesPage";
import StudentsMainPage from "./pages/collage/students/StudentsMainPage";
import CompanyProfilePage from "./pages/collage/companies/CompanyProfilePage";
import CompanyJobOverviewPage from "./pages/collage/companies/CompanyJobOverviewPage";
import StudentsProfilePage from "./pages/collage/students/StudentsProfilePage";
import AddQuestionsSelectPage from "./pages/collage/test/AddQuestionsSelectPage";
import ResultsOverviewPage from "./pages/collage/results/ResultsOverviewPage";
import RecentPage from "./pages/collage/quesBank/RecentPage";
import TopicPage from "./pages/collage/quesBank/TopicPage";
import UploadPage from "./pages/collage/quesBank/UploadPage";
import AddCodePage from "./pages/collage/test/AddCodePage";
import AddEssayPage from "./pages/collage/test/AddEssayPage";
import AddParagraphPage from "./pages/collage/test/AddParagraphPage";
import FinalizePage from "./pages/collage/test/FinalizePage";
import InvitePage from "./pages/collage/test/InvitePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="collage/dashboard">
          <Route path="" element={<Home />} />
          <Route path="companies" element={<CompanyPage />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="students" element={<StudentsPage />} />
        </Route>

        <Route path="collage/test">
          <Route path="" element={<TestPage />} />
          <Route path="assessment" element={<AssessmentPage />} />
          <Route path="name" element={<NameAssessmentPage />} />
          <Route path="select" element={<SelectTestsPage />} />
          {/* <Route path="questions" element={<AddQuestionsPage />} /> */}

          <Route path="questions" element={<AddQuestionsSelectPage />} />
          <Route path="review" element={<ReviewPage />} />
          <Route path="addMcq" element={<AddMcqPage />} />
          <Route path="addcode" element={<AddCodePage />} />
          <Route path="addEssay" element={<AddEssayPage />} />
          <Route path="addPara" element={<AddParagraphPage />} />
          <Route path="final" element={<FinalizePage />} />

          <Route path="invite" element={<InvitePage />} />
        </Route>

        <Route path="collage/accounting">
          <Route path="" element={<AccountingPage />} />
        </Route>

        <Route path="collage/companies">
          <Route path="" element={<CompaniesPage />} />
          <Route path="profile" element={<CompanyProfilePage />} />
          <Route path="jobOverview" element={<CompanyJobOverviewPage />} />
        </Route>

        <Route path="collage/inbox">
          <Route path="" element={<InboxPage />} />
        </Route>

        <Route path="collage/profile">
          <Route path="" element={<ProfilePage />} />
        </Route>

        <Route path="collage/quesBank">
          <Route path="" element={<QuesBankPage />} />
          <Route path="recent" element={<RecentPage />} />
          <Route path="topic" element={<TopicPage />} />
          <Route path="upload" element={<UploadPage />} />
        </Route>

        <Route path="collage/results">
          <Route path="" element={<ResultsPage />} />
          <Route path="overview" element={<ResultsOverviewPage />} />
        </Route>

        <Route path="collage/settings">
          <Route path="" element={<SettingsPage />} />
        </Route>

        <Route path="collage/students">
          <Route path="" element={<StudentsMainPage />} />
          <Route path="profile" element={<StudentsProfilePage />} />
        </Route>

        <Route path="collage/teams">
          <Route path="" element={<TeamsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
