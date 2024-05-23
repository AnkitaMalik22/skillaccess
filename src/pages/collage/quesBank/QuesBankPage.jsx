import React from "react";
import QuesBank from "../../../components/collage/quesBank/home/QuesBank";
import useTranslate from "../../../hooks/useTranslate";

const QuesBankPage = () => {
  useTranslate();
  return <QuesBank />;
};

export default QuesBankPage;
