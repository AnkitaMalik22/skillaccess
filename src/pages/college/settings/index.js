import { lazy } from "react";
import { Route } from "react-router-dom";

const Settings = lazy(() => import("./Settings.jsx"));
const Notifications = lazy(() => import("./Notifications.jsx"));
const Visibility = lazy(() => import("./Visibility.jsx"));
const Activity = lazy(() => import("./Activity.jsx"));
const Security = lazy(() => import("./Security.jsx"));
// const SecurityAppPage = lazy(() => import("./SecurityAppPage.jsx"));
const SecondFAPage = lazy(() => import("./SecondFAPage.jsx"));

function SettingsRoute() {
  return (
    <Route path="college/settings">
      <Route path="" element={<Settings />} />
      <Route path="security" element={<Security />} />
      <Route path="security/secondFA" element={<SecondFAPage />} />
      <Route path="activity" element={<Activity />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="visibility" element={<Visibility />} />
    </Route>
  );
}

export default SettingsRoute;
