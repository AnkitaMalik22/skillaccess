import React from "react";
import Header from "../../../components/college/results/overview/Header";
import Info from "../../../components/college/results/overview/Info";
import Description from "../../../components/college/results/overview/Description";
import Toggle from "../../../components/college/results/overview/Toggle";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getAllTests,
  getTest,
  getTestResultPage,
} from "../../../redux/college/test/thunks/test";
import { useDispatch } from "react-redux";
import useTranslate from "../../../hooks/useTranslate";

const ResultsOverview = () => {
  //useTranslate();
  const { user } = useSelector((state) => state.collegeAuth);
  const assessment = useSelector((state) => state.test.test);
  // const {studentResponses} = useSelector((state) => state.test);
  const searchParams = new URLSearchParams(window.location.search);
  const assessmentId = searchParams.get("assessment");

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getAllTests());
  }, []);

  useEffect(() => {
    dispatch(getTest(assessmentId));
    // dispatch(getTestResultPage(assessmentId));
  }, [dispatch, assessmentId]);

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
    <>
      <Header />
      <Info user={user} assessment={assessment} />


      

      <div className="bg-[#8F92A1] font-dmSans bg-opacity-5 p-5 my-1 shadow">
        <h2 className="font-bold text-base mb-2">About Assessment</h2>
        <p className="text-sm text-[7D7D7D] first-letter:capitalize">
          {assessment?.description}
        </p>
      </div>
      <Description topics={assessment?.topics} assessment={assessment} />

      <Toggle assessment={assessment} />
    </>
  );
};

export default ResultsOverview;
