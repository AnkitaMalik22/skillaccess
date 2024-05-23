import React from "react";
import Acounting from "../../../components/collage/accounting/home/Acounting";
import useTranslate from "../../../hooks/useTranslate";

const AccountingPage = () => {
  useTranslate();
  return <Acounting />;
};

export default AccountingPage;
