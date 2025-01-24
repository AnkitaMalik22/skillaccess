import { lazy } from "react";
import { Route } from "react-router-dom";

const Recent = lazy(() => import("./Recent"));
const Topic = lazy(() => import("./Topic"));
const Upload = lazy(() => import("./Upload"));
const QuesBank = lazy(() => import("./QuesBank"));
const Bookmark = lazy(() => import("./Bookmark"));
const TopicDetails = lazy(() => import("./TopicDetails"));
const RecentAll = lazy(() => import("./RecentAll"));
const UploadTopic = lazy(() => import("./UploadTopic"));
const AddMcqToTopic = lazy(() => import("./AddMcqToTopic"));
const AddQuestions = lazy(() => import("./AddQuestions"));
const AddCode = lazy(() => import("./AddCodePage"));
const AddEssay = lazy(() => import("./AddEssay"));
const AddParagraph = lazy(() => import("./AddParagraph"));
const CreateTopic = lazy(() => import("./CreateTopic"));
const AddVideo = lazy(() => import("./AddVideo"));
const AddVideoMcq = lazy(() => import("./AddVideoMcq"));
const AddVideoLongShort = lazy(() => import("./AddVideoLongShort"));
const AddQuestionsSelect = lazy(() => import("./AddQuestionsSelect"));
const AddVideoQuestions = lazy(() => import("./AddVideoQuestions"));

function QuesRoute(entity) {
  return (
    <Route path={`${entity}quesBank`}>
      <Route path="" element={<QuesBank />} />
      <Route path="recent" element={<Recent />} />
      <Route path="recentAll" element={<RecentAll />} />
      <Route path="topic" element={<Topic />} />
      <Route path="topic/:id" element={<TopicDetails />} />
      <Route path="topic/upload/:id" element={<UploadTopic />} />
      <Route path="upload" element={<Upload />} />
      <Route path="bookmarks" element={<Bookmark />} />
      <Route path="questions" element={<AddQuestions />} />
      <Route path="typeOfQuestions/:id" element={<AddQuestionsSelect />} />
      <Route path="createTopic" element={<CreateTopic />} />
      <Route path="addMcqToTopic/:id" element={<AddMcqToTopic />} />
      <Route path="code/:id" element={<AddCode />} />
      <Route path="essay/:id" element={<AddEssay />} />
      <Route path="find-ans/:id" element={<AddParagraph />} />
      <Route path="video/:id" element={<AddVideo />} />
      <Route path="video/:id/addmcq" element={<AddVideoMcq />} />
      <Route path="video/shortlong/:id" element={<AddVideoLongShort />} />
      <Route path="video/:id/selectType" element={<AddVideoQuestions />} />
      <Route path="*" element={<div>404</div>} />
    </Route>
  );
}

export default QuesRoute;
