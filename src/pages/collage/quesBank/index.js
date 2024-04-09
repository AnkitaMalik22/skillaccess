import { lazy } from "react";
import { Route } from "react-router-dom";

const RecentPage = lazy(() => import("./RecentPage"));
const TopicPage = lazy(() => import("./TopicPage"));
const UploadPage = lazy(() => import("./UploadPage"));
const QuesBankPage = lazy(() => import("./QuesBankPage"));
const BookmarkPage = lazy(() => import("./BookmarkPage"));
const TopicDetailsPage = lazy(() => import("./TopicDetailsPage"));
const UploadTopic = lazy(() => import("./UploadTopic"));

function QuesRoute() {

  
  return (
    <Route path="collage/quesBank">
      <Route path="" element={<QuesBankPage />} />
      <Route path="recent" element={<RecentPage />} />
      <Route path="topic" element={<TopicPage />} />
      <Route path="topic/:id" element={<TopicDetailsPage />} />
      <Route path="topic/upload/:id" element={<UploadTopic />} />
      <Route path="upload" element={<UploadPage />} />
      <Route path="bookmarks" element={<BookmarkPage/>} />
      <Route path="*" element={<div>404</div>} />
    </Route>
  );
}

export default QuesRoute;
