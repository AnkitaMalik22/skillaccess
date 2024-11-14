import { lazy } from "react";
import { Route } from "react-router-dom";
const Mail = lazy(() => import("./Mail"));
const Inbox = lazy(() => import("./Inbox"));

export default function () {
  return (
    <Route path="college/inbox">
      <Route path="" element={<Inbox />} />
      <Route path="mail" element={<Mail />} />
    </Route>
  );
}
