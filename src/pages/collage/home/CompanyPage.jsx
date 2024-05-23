import React from "react";
import Companies from "../../../components/collage/dashboard/companies/Companies";
import useTranslate from "../../../hooks/useTranslate";

const CompanyPage = () => {
  useTranslate();
  return <Companies />;
};

export default CompanyPage;
