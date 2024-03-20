import { lazy } from "react";
import { Route } from "react-router-dom";

const RecentPage = lazy(() => import("./RecentPage"));
const TopicPage = lazy(() => import("./TopicPage"));
const UploadPage = lazy(() => import("./UploadPage"));
const QuesBankPage = lazy(() => import("./QuesBankPage"));

function QuesRoute() {
  return (
    <Route path="collage/quesBank">
      <Route path="" element={<QuesBankPage />} />
      <Route path="recent" element={<RecentPage />} />
      <Route path="topic" element={<TopicPage />} />
      <Route path="upload" element={<UploadPage />} />
    </Route>
  );
}

export default QuesRoute;
