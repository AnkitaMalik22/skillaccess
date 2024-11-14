import { lazy } from "react";
import { Route } from "react-router-dom";
const NameAssessment = lazy(() => import("./NameAssessmentPage"));
const SelectTests = lazy(() => import("./SelectTests"));
const SelectTestsAdaptive = lazy(() => import("./SelectTestsAdaptive"));
const AddQuestions = lazy(() => import("./AddQuestions"));
const Review = lazy(() => import("./Review"));
const AddMcq = lazy(() => import("./AddMcq"));
const AddCode = lazy(() => import("./AddCodePage"));
const AddEssay = lazy(() => import("./AddEssay"));
const AddParagraph = lazy(() => import("./AddParagraph"));
const Finalize = lazy(() => import("./Finalize"));
const Invite = lazy(() => import("./Invite"));
const AddQuestionsSelect = lazy(() => import("./AddQuestionsSelect"));
const Submit = lazy(() => import("./Submit"));
const Test = lazy(() => import("./Test"));
const Assessment = lazy(() => import("./Assessment"));
const CreateTopic = lazy(() => import("./CreateTopic"));
const CreateTopicAdaptive = lazy(() => import("./CreateTopicAdaptive"));
const AddMcqToTopic = lazy(() => import("./AddMcqToTopic"));
const AddVideo = lazy(() => import("./AddVideo"));
const AddVideoMcq = lazy(() => import("./AddVideoMcq"));
const AddVideoLongShort = lazy(() => import("./AddVideoLongShort"));
const AddVideoQuestions = lazy(() => import("./AddVideoQuestions"));

function TestHome() {
  return (
    <Route path="college/test">
      <Route path="" element={<Test />} />
      <Route path="assessment" element={<Assessment />} />
      <Route path="name" element={<NameAssessment />} />
      <Route path="select" element={<SelectTests />} />
      <Route path="selectAdaptive" element={<SelectTestsAdaptive />} />
      <Route path="submit" element={<Submit />} />
      {/* <Route path="preview" element={<AddQuestionsSelect  />} /> */}
      <Route path="questions" element={<AddQuestions />} />
      <Route path="typeOfQuestions/:id" element={<AddQuestionsSelect />} />
      {/* <Route path="mcq/:id" element={<AddMcq  />} /> */}
      {/* <Route path="preview" element={<AddQuestions  />} /> */}
      <Route path="createTopic" element={<CreateTopic />} />
      <Route path="createTopicAdaptive" element={<CreateTopicAdaptive />} />
      <Route path="details/:id" element={<Review />} />
      <Route path="addMcqToTopic/:id" element={<AddMcqToTopic />} />
      <Route path="addMcq/:id" element={<AddMcq />} />
      <Route path="code/:id" element={<AddCode />} />
      <Route path="essay/:id" element={<AddEssay />} />
      <Route path="find-ans/:id" element={<AddParagraph />} />
      <Route path="video/:id" element={<AddVideo />} />
      <Route path="video/:id/addmcq" element={<AddVideoMcq />} />
      <Route path="video/shortlong/:id" element={<AddVideoLongShort />} />
      <Route path="video/:id/selectType" element={<AddVideoQuestions />} />
      <Route path="final" element={<Finalize />} />
      <Route path="invite" element={<Invite />} />
    </Route>
  );
}

export default TestHome;
