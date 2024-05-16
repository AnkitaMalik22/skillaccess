import { lazy } from "react";
import { Route } from "react-router-dom";

const RecentPage = lazy(() => import("./RecentPage"));
const TopicPage = lazy(() => import("./TopicPage"));
const UploadPage = lazy(() => import("./UploadPage"));
const QuesBankPage = lazy(() => import("./QuesBankPage"));
const BookmarkPage = lazy(() => import("./BookmarkPage"));
const TopicDetailsPage = lazy(() => import("./TopicDetailsPage"));
const  RecentAllPage= lazy(() => import("./RecentAllPage"));
const UploadTopic = lazy(() => import("./UploadTopic"));
const AddMcqToTopicPage = lazy(() => import("./AddMcqToTopicPage"));
const AddQuestionsPage = lazy(() => import("./AddQuestionsPage"));
const AddCodePage = lazy(() => import("./AddCodePage"));
const AddEssayPage = lazy(() => import("./AddEssayPage"));
const AddParagraphPage = lazy(() => import("./AddParagraphPage"));
const CreateTopicPage = lazy(() => import("./CreateTopicPage"));
const AddVideoPage = lazy(() => import("./AddVideoPage"));
const AddVideoMcqPage = lazy(() => import("./AddVideoMcqPage"));
const AddVideoLongShortPage = lazy(() => import("./AddVideoLongShortPage"));
const AddQuestionsSelectPage = lazy(() => import("./AddQuestionsSelectPage"));
const AddVideoQuestionsPage = lazy(() => import("./AddVideoQuestionsPage"));
function QuesRoute() {

  
  return (
    <Route path="collage/quesBank">
      <Route path="" element={<QuesBankPage />} />
      <Route path="recent" element={<RecentPage />} />
      <Route path="recentAll" element={<RecentAllPage />} />
      <Route path="topic" element={<TopicPage />} />
      <Route path="topic/:id" element={<TopicDetailsPage />} />
      <Route path="topic/upload/:id" element={<UploadTopic />} />
      <Route path="upload" element={<UploadPage />} />
      <Route path="bookmarks" element={<BookmarkPage/>} />
      <Route path="questions" element={<AddQuestionsPage />} />
      <Route path="typeOfQuestions/:id" element={<AddQuestionsSelectPage />} />
      <Route path="createTopic" element={<CreateTopicPage />} />
      <Route path="addMcqToTopic/:id" element={<AddMcqToTopicPage />} />
      <Route path="code/:id" element={<AddCodePage />} />
      <Route path="essay/:id" element={<AddEssayPage />} />
      <Route path="find-ans/:id" element={<AddParagraphPage />} />
      <Route path="video/:id" element={<AddVideoPage />} />

      <Route path="video/:id/addmcq" element={<AddVideoMcqPage />} />

      <Route path="video/shortlong/:id" element={<AddVideoLongShortPage />} />

      <Route path="video/:id/selectType" element={<AddVideoQuestionsPage />} />
      <Route path="*" element={<div>404</div>} />
    </Route>
  );
}

export default QuesRoute;
