import { lazy } from "react";
import { Route } from "react-router-dom";

const SettingsPage = lazy(() => import("./SettingsPage.jsx"));
const NotificationsPage = lazy(() => import("./NotificationsPage.jsx"));

const ActivityPage = lazy(() => import("./ActivityPage.jsx"));
const SecurityPage = lazy(() => import("./SecurityPage.jsx"));
const SecurityAppPage = lazy(() => import("./SecurityAppPage.jsx"));
const SecondFAPage = lazy(() => import("./SecondFAPage.jsx"));

function StudentSettingsRoute() {
  return (
    <Route path="student/settings">
      <Route path="" element={<SettingsPage />} />
      <Route path="security" element={<SecurityPage />} />
      <Route path="security/securityApp" element={<SecurityAppPage />} />
      <Route path="security/secondFA" element={<SecondFAPage />} />
      <Route path="activity" element={<ActivityPage />} />
      <Route path="notifications" element={<NotificationsPage />} />
    </Route>
  );
}

export default StudentSettingsRoute;
