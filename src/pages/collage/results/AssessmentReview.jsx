import React, { useState } from "react";
import List from "../../../components/collage/results/assessmentReview/List";
import { FaChevronLeft } from "react-icons/fa";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Code from "../../../components/collage/results/assessmentReview/Code";
import Video from "../../../components/collage/results/assessmentReview/Video";
import Essay from "../../../components/collage/results/assessmentReview/Essay";
import HeaderMarks from "../../../components/collage/results/assessmentReview/HeaderMarks";
import { getStudentResponse } from "../../../redux/collage/test/thunks/student";
import useTranslate from "../../../hooks/useTranslate";
import Loader from "../../../Loader";

const AssessmentReview = () => {
  //useTranslate();
  const searchParams = new URLSearchParams(window.location.search);
  const testId = searchParams.get("assessmentId");
  const studentId = searchParams.get("studentId");
  const responseId = searchParams.get("responseId");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { response, GET_STUDENT_RESPONSE_LOADING } = useSelector(
    (state) => state.test
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(getStudentResponse(responseId));
      setLoading(false);
    };

    fetchData();
  }, [testId, studentId]);

  console.log("testId", testId, studentId, response);

  const [questions, setQuestions] = useState(null);
  let section1 = [];
  let section2 = [];
  let section3 = [];
  let section4 = [];
  let section5 = [];

  // let topics = response?.topics;
  useEffect(() => {
    if (response?.topics && response?.topics.length > 0) {
      if (response?.topics[0]) {
        // console.log("response?.topics[0].", response?.topics[0]?.Type);
        // console.log("response?.topics[1]", response?.topics[1]?.Type);

        switch (response?.topics[0].Type) {
          case "essay":
            section1 = response?.topics[0].essay;
            break;
          case "video":
            section1 = response?.topics[0].video;
            break;
          case "compiler":
            section1 = response?.topics[0].compiler;
            break;
          case "findAnswer":
            section1 = response?.topics[0].findAnswers;
            break;
          default:
            section1 = response?.topics[0].questions;
            break;
        }
      }

      if (response?.topics[1]) {
        switch (response?.topics[1].Type) {
          case "essay":
            section2 = response?.topics[1].essay;
            break;
          case "video":
            section2 = response?.topics[1].video;
            break;
          case "compiler":
            section2 = response?.topics[1].compiler;
            break;
          case "findAnswer":
            section2 = response?.topics[1].findAnswers;
            break;
          default:
            section2 = response?.topics[1].questions;
            break;
        }
      }

      if (response?.topics[2])
        switch (response?.topics[2].Type) {
          case "essay":
            section3 = response?.topics[2].essay;
            break;
          case "video":
            section3 = response?.topics[2].video;
            break;
          case "compiler":
            section3 = response?.topics[2].compiler;
            break;
          case "findAnswer":
            section3 = response?.topics[2].findAnswers;
            break;
          default:
            section3 = response?.topics[2].questions;
            break;
        }

      if (response?.topics[3])
        switch (response?.topics[3].Type) {
          case "essay":
            section4 = response?.topics[3].essay;
            break;
          case "video":
            section4 = response?.topics[3].video;
            break;
          case "compiler":
            section4 = response?.topics[3].compiler;
            break;
          case "findAnswer":
            section4 = response?.topics[3].findAnswers;
            break;
          default:
            section4 = response?.topics[3].questions;
            break;
        }

      if (response?.topics[4])
        switch (response?.topics[4].Type) {
          case "essay":
            section5 = response?.topics[4].essay;
            break;
          case "video":
            section5 = response?.topics[4].video;
            break;
          case "compiler":
            section5 = response?.topics[4].compiler;
            break;
          case "findAnswer":
            section5 = response?.topics[4].findAnswers;
            break;
          default:
            section5 = response?.topics[4].questions;
            break;
        }

      console.log(section1, section2, section3, section4, section5);

      setQuestions([
        ...section1,
        ...section2,
        ...section3,
        ...section4,
        ...section5,
      ]);
    }
  }, [response, ""]);

  const max = questions?.length / 10;
  const [selected, setSelected] = useState(1);

  const handleCode = (lang, code) => {
    switch (lang) {
      case "C":
        return code?.C?.answerCode;
      case "Cpp":
        return code?.Cpp?.answerCode;
      case "Java":
        return code?.Java?.answerCode;
      case "Python":
        return code?.Python?.answerCode;
      default:
        return "No Code Found";
    }
  };

  let k = questions?.filter(
    (question) => question.StudentAnswerIndex !== undefined
  ).length;
  console.log(k);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {!GET_STUDENT_RESPONSE_LOADING ? (
        <>
          {" "}
          <div className="flex w-full mx-auto justify-between mb-5">
            <div className="flex gap-3">
              <button
                className="self-center object-center rounded-lg h-10 w-10 "
                onClick={() => navigate(-1)}
              >
                <FaChevronLeft className=" p-3 rounded-lg h-10 w-10 self-center bg-[#D9E1E7]" />
              </button>
            </div>
          </div>
          <HeaderMarks response={response} totalQuestions={questions?.length} />
          <div className="mt-10 mb-10">
            {questions &&
              questions
                ?.filter(
                  (question) => question.StudentAnswerIndex !== undefined
                )
                ?.slice((selected - 1) * 10, selected * 10)
                .map((question, i) => {
                  return (
                    <div className="my-2">
                      <List
                        question={question}
                        level={response?.testType}
                        number={(selected - 1) * 10 + 1 + i}
                        isLoading={
                          question.AnswerIndex === undefined ||
                          question.AnswerIndex === null ||
                          question.StudentAnswerIndex === undefined ||
                          question.StudentAnswerIndex === null
                        }
                      />
                    </div>
                  );
                })}

            {questions &&
              questions
                ?.filter((question) => question.AnswerIndex == undefined)
                ?.slice((selected - 1) * 10, selected * 10)
                .map((question, i) => {
                  return (
                    <div className="my-2">
                      {question.testcase && (
                        <Code
                          question={question}
                          Title={question.codeQuestion}
                          code={handleCode(
                            question.codeLanguage,
                            question.code
                          )}
                          number={(selected - 1) * 10 + 1 + i + k}
                        />
                      )}
                      {question.videoFile && (
                        <Video
                          Number={(selected - 1) * 10 + 1 + i + k}
                          video={question}
                        />
                      )}

                      {
                        question.questions ||
                        (question.Options &&
                          !question.testcase &&
                          !question.videoFile)
                          ? //  &&
                            //   (question.AnswerIndex !== undefined

                            !question.videoFile && (
                              <List
                                question={question}
                                number={(selected - 1) * 10 + 1 + i + k}
                              />
                            )
                          : !question.testcase &&
                            !question.videoFile &&
                            !question.questions &&
                            !question.Options && (
                              <Essay
                                question={question}
                                number={(selected - 1) * 10 + 1 + i + k}
                              />
                            )

                        // )
                      }
                    </div>
                  );
                })}
            {/* iterate this list */}
          </div>
          <div className="flex gap-2 w-full justify-center">
            <div className="rounded-lg bg-gray-100 h-10 w-10 flex justify-center">
              <IoMdArrowDropleft
                className={` text-lg self-center ${
                  selected === 1 && "disabled"
                }`}
                onClick={() => selected !== 1 && setSelected(selected - 1)}
              />
            </div>

            {Array.from({ length: Math.ceil(max) }).map((_, index) => {
              const pageNumber = index + 1;
              const hasQuestions = (pageNumber - 1) * 10 < questions.length;
              console.log(questions.length);
              console.log(Math.ceil(max));
              return (
                hasQuestions && (
                  <div
                    key={pageNumber}
                    className={`rounded-lg h-10 w-10 flex justify-center ${
                      selected === pageNumber
                        ? "bg-blue-700 text-white"
                        : "bg-gray-100"
                    }`}
                    onClick={() => setSelected(pageNumber)}
                  >
                    <p className="self-center">{pageNumber}</p>
                  </div>
                )
              );
            })}

            <div className="rounded-lg bg-gray-100 h-10 w-10 flex justify-center">
              <IoMdArrowDropright
                className={` text-lg self-center ${
                  selected === Math.ceil(max) && "disabled"
                }`}
                onClick={() =>
                  selected !== Math.ceil(max) && setSelected(selected + 1)
                }
              />
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default AssessmentReview;
