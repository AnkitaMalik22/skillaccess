import React from "react";
import Header from "./Header";
import About from "./About";
import Info from "./Info";
import Description from "./Description";

import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";

const ResultsOverview = () => {
  const { user } = useSelector((state) => state.collegeAuth);
  const assessment = useSelector((state) => state.test.test);
  // const {studentResponses} = useSelector((state) => state.test);
  const searchParams = new URLSearchParams(window.location.search);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getStudentResponse(assessmentId));
  // }
  // , [assessmentId]);
  // const responses = studentResponses.map((responseId) => {
  //   dispatch(getStudentResponse(responseId))
  //   return responseId;
  // }
  // );

  return (
    <div className="w-[95%] mx-auto ">
      <Header />
      <Info user={user} assessment={assessment} />

      <About Description={assessment.description} />
      <Description topics={[{ Description: "saddas", Type: "mcq" }]} />
    </div>
  );
};

export default ResultsOverview;
