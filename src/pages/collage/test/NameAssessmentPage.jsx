import React from "react";
import { useSearchParams } from "react-router-dom";
import Name from "../../../components/collage/test/nameAssessment/Name";
import NameAdaptive from "../../../components/collage/test/nameAssessment/NameAdaptive";
import useTranslate from "../../../hooks/useTranslate";

const NameAssessmentPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const type = searchParams.get("level");

  //useTranslate();
  return type !== "adaptive" ? <Name /> : <NameAdaptive />;
};

export default NameAssessmentPage;
