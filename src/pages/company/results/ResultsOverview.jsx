import React from "react";
import Header from "../../../components/collage/results/overview/Header";
import About from "../../../components/collage/results/overview/About";
import Info from "../../../components/collage/results/overview/Info";
import Description from "../../../components/collage/results/overview/Description";
import Toggle from "../../../components/collage/results/overview/Toggle";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getAllTests,
  getTest,
  getTestResultPage,
} from "../../../redux/collage/test/thunks/test";
import { useDispatch } from "react-redux";
import useTranslate from "../../../hooks/useTranslate";
import { getTestCompany, getTestResultPageCompany } from "../../../redux/company/test/thunks/test";
import isCompany from "../../../util/isCompany";

const ResultsOverview = () => {
  //useTranslate();;
  const user = useSelector((state) =>{
    if(isCompany()){
      return  state.collageAuth.user
    }else{
        return state.companyAuth.data
    }
  });
  const assessment = useSelector((state) => state.companyTest.test);
  // const {studentResponses} = useSelector((state) => state.test);
  const searchParams = new URLSearchParams(window.location.search);
  const assessmentId = searchParams.get("assessment");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTests());
  }, []);

  useEffect(() => {

    dispatch(getTestCompany(assessmentId));
    // dispatch(getTestResultPage(assessmentId));
    dispatch(getTestResultPageCompany(assessmentId));

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
      <Header  user={user}/>
      <Info user={user} assessment={assessment} />

      <About Description={assessment?.description} />
      <Description topics={assessment?.topics} />

      <Toggle assessment={assessment} />
    </>
  );
};

export default ResultsOverview;
