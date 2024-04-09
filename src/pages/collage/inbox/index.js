import { useEffect } from "react";

import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const MailPage = lazy(() => import("./MailPage"));
const InboxPage = lazy(() => import("./InboxPage"));

export default function () {
  return (
    <Route path="collage/inbox">
      <Route path="mail">
        <Route path="" element={<MailPage />} />
        {/* <Route path="" element={<MailPage />} /> */}
      </Route>
      <Route path="" element={<InboxPage />} />
    </Route>
  );
}
