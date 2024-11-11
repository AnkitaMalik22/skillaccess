import React from "react";
import { useSearchParams } from "react-router-dom";


import Name from "./Name";

const NameAssessmentPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const type = searchParams.get("level");

  //useTranslate();
  // return type !== "adaptive" ? <Name /> : <NameAdaptive />;
  return <Name/>;
};

export default NameAssessmentPage;
