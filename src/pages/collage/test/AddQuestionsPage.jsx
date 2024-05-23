import React from "react";
import AddQuestions from "../../../components/collage/test/addquestions/AddQuestions";
import useTranslate from "../../../hooks/useTranslate";

const AddQuestionsPage = () => {
  useTranslate();
  return <AddQuestions />;
};

export default AddQuestionsPage;
