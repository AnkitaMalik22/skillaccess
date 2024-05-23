import React from "react";
import JobOverview from "../../../components/collage/companies/job/JobOverview";
import useTranslate from "../../../hooks/useTranslate";

const CompanyJobOverviewPage = () => {
  useTranslate();
  return <JobOverview />;
};

export default CompanyJobOverviewPage;
