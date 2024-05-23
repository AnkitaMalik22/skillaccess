import React from "react";
import ResultsOverview from "../../../components/collage/results/overview/ResultsOverview";
import useTranslate from "../../../hooks/useTranslate";

const ResultsOverviewPage = () => {
  useTranslate();
  return <ResultsOverview />;
};

export default ResultsOverviewPage;
