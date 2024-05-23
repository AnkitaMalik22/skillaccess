import React from "react";
import Students from "../../../components/collage/students/home/Students";
import useTranslate from "../../../hooks/useTranslate";

const StudentsMainPage = () => {
  useTranslate();
  return (
    <>
      <Students />
    </>
  );
};

export default StudentsMainPage;
