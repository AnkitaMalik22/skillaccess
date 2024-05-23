import React from "react";
import CompanyProfile from "../../../components/collage/companies/companyProfile/CompanyProfile";
import useTranslate from "../../../hooks/useTranslate";

const CompanyProfilePage = () => {
  useTranslate();
  return <CompanyProfile />;
};

export default CompanyProfilePage;
