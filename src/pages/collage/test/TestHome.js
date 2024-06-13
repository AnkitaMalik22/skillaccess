import { lazy } from "react";
import { Route } from "react-router-dom";
const NameAssessmentPage = lazy(() => import("./NameAssessmentPage"));
const SelectTestsPage = lazy(() => import("./SelectTestsPage"));
const SelectTestsAdaptivePage = lazy(() => import("./SelectTestsAdaptivePage"));
const AddQuestionsPage = lazy(() => import("./AddQuestionsPage"));
const ReviewPage = lazy(() => import("./ReviewPage"));
const AddMcqPage = lazy(() => import("./AddMcqPage"));
const AddCodePage = lazy(() => import("./AddCodePage"));
const AddEssayPage = lazy(() => import("./AddEssayPage"));
const AddParagraphPage = lazy(() => import("./AddParagraphPage"));
const FinalizePage = lazy(() => import("./FinalizePage"));
const InvitePage = lazy(() => import("./InvitePage"));
const AddQuestionsSelectPage = lazy(() => import("./AddQuestionsSelectPage"));
const SubmitPage = lazy(() => import("./SubmitPage"));
const TestPage = lazy(() => import("./TestPage"));
const AssessmentPage = lazy(() => import("./AssessmentPage"));
const CreateTopicPage = lazy(() => import("./CreateTopicPage"));
const CreateTopicAdaptivePage = lazy(() => import("./CreateTopicAdaptivePage"));
const AddMcqToTopicPage = lazy(() => import("./AddMcqToTopicPage"));
const AddVideoPage = lazy(() => import("./AddVideoPage"));
const AddVideoMcqPage = lazy(() => import("./AddVideoMcqPage"));
const AddVideoLongShortPage = lazy(() => import("./AddVideoLongShortPage"));
const AddVideoQuestionsPage = lazy(() => import("./AddVideoQuestionsPage"));

function TestHome() {
  return (
    <Route path="collage/test">
      <Route path="" element={<TestPage />} />
      <Route path="assessment" element={<AssessmentPage />} />
      <Route path="name" element={<NameAssessmentPage />} />
      <Route path="select" element={<SelectTestsPage />} />
      <Route path="selectAdaptive" element={<SelectTestsAdaptivePage />} />
      <Route path="submit" element={<SubmitPage />} />
      {/* <Route path="preview" element={<AddQuestionsSelectPage />} /> */}
      <Route path="questions" element={<AddQuestionsPage />} />
      <Route path="typeOfQuestions/:id" element={<AddQuestionsSelectPage />} />
      {/* <Route path="mcq/:id" element={<AddMcqPage />} /> */}
      {/* <Route path="preview" element={<AddQuestionsPage />} /> */}
      <Route path="createTopic" element={<CreateTopicPage />} />
      <Route path="createTopicAdaptive" element={<CreateTopicAdaptivePage />} />
      <Route path="details/:id" element={<ReviewPage />} />
      <Route path="addMcqToTopic/:id" element={<AddMcqToTopicPage />} />
      <Route path="addMcq/:id" element={<AddMcqPage />} />
      <Route path="code/:id" element={<AddCodePage />} />
      <Route path="essay/:id" element={<AddEssayPage />} />
      <Route path="find-ans/:id" element={<AddParagraphPage />} />
      <Route path="video/:id" element={<AddVideoPage />} />
      <Route path="video/:id/addmcq" element={<AddVideoMcqPage />} />
      <Route path="video/shortlong/:id" element={<AddVideoLongShortPage />} />
      <Route path="video/:id/selectType" element={<AddVideoQuestionsPage />} />
      <Route path="final" element={<FinalizePage />} />
      <Route path="invite" element={<InvitePage />} />
    </Route>
  );
}

export default TestHome;
