import React from "react";
import Transactions from "../../../components/collage/accounting/home/Transactions";
import useTranslate from "../../../hooks/useTranslate";

const TransactionPage = () => {
  useTranslate();
  return <Transactions />;
};

export default TransactionPage;
