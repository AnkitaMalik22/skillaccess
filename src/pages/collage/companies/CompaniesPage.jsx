import React from "react";
import Companies from "../../../components/collage/companies/home/Companies";
import useTranslate from "../../../hooks/useTranslate";

const CompaniesPage = () => {
  useTranslate();
  return <Companies />;
};

export default CompaniesPage;
