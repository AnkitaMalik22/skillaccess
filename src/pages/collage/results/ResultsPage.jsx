import React from "react";
import Results from "../../../components/collage/results/home/Results";
import useTranslate from "../../../hooks/useTranslate";

const ResultsPage = () => {
  useTranslate();
  return <Results />;
};

export default ResultsPage;
