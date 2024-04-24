import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";


const AccountingPage = lazy(() => import("./AccountingPage"));
const TransactionPage = lazy(() => import("./TransactionPage"));

function AccountRoute() {
  return (
    <Route path="collage/accounting">
      <Route path="" element={<AccountingPage />} />
        <Route path="transactions" element={<TransactionPage />} />
    </Route>
  );
}

export default AccountRoute;
