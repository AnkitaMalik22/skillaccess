import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Accounting = lazy(() => import("./Accounting"));
const Transactions = lazy(() => import("./Transactions"));

function AccountRoute(entity) {
  return (
    <Route path={`${entity}accounting`}>
      <Route path="" element={<Accounting />} />
      <Route path="transactions" element={<Transactions />} />
    </Route>
  );
}

export default AccountRoute;
