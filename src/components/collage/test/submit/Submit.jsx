import React, { useState } from "react";
import Header from "./Header";
import { Progress } from "./Progress";
import List from "./List";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Code from "./Code";
import Video from "./Video";
import toast from "react-hot-toast";
import { createTest } from "../../../../redux/collage/test/thunks/test";

const Submit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    level,
    name,
    description,
    topics,
    totalAttempts,
    totalQuestions,
    totalDuration,
    duration_from,
    duration_to,
  } = useSelector((state) => state.test);

  const [questions, setQuestions] = useState();
  let section1 = [];
  let section2 = [];
  let section3 = [];
  let section4 = [];
  let section5 = [];
  useEffect(() => {
    if (topics[0])
      switch (topics[0].Type) {
        case "essay":
          section1 = topics[0].essay;
          break;
        case "video":
          section1 = topics[0].video;
          break;
        case "compiler":
          section1 = topics[0].compiler;
          break;
        case "findAnswer":
          section1 = topics[0].findAnswers;
          break;
        default:
          section1 = topics[0].questions;
          break;
      }

    if (topics[1])
      switch (topics[1].Type) {
        case "essay":
          section2 = topics[1].essay;
          break;
        case "video":
          section2 = topics[1].video;
          break;
        case "compiler":
          section2 = topics[1].compiler;
          break;
        case "findAnswer":
          section2 = topics[1].findAnswers;
          break;
        default:
          section2 = topics[1].questions;
          break;
      }

    if (topics[2])
      switch (topics[2].Type) {
        case "essay":
          section3 = topics[2].essay;
          break;
        case "video":
          section3 = topics[2].video;
          break;
        case "compiler":
          section3 = topics[2].compiler;
          break;
        case "findAnswer":
          section3 = topics[2].findAnswers;
          break;
        default:
          section3 = topics[2].questions;
          break;
      }

    if (topics[3])
      switch (topics[3].Type) {
        case "essay":
          section4 = topics[3].essay;
          break;
        case "video":
          section4 = topics[3].video;
          break;
        case "compiler":
          section4 = topics[3].compiler;
          break;
        case "findAnswer":
          section4 = topics[3].findAnswers;
          break;
        default:
          section4 = topics[3].questions;
          break;
      }

    if (topics[4])
      switch (topics[4].Type) {
        case "essay":
          section5 = topics[4].essay;
          break;
        case "video":
          section5 = topics[4].video;
          break;
        case "compiler":
          section5 = topics[4].compiler;
          break;
        case "findAnswer":
          section5 = topics[4].findAnswers;
          break;
        default:
          section5 = topics[4].questions;
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
  }, [topics, ""]);

  const handleCalculateTime = () => {
    let totalMcq = 0,
      totalEssay = 0,
      totalVideo = 0,
      totalCompiler = 0,
      totalFindAnswer = 0;
    const totalTimeCal = topics.forEach((topic) => {
      if (topic.Type === "essay") {
        totalEssay += topic.essay?.reduce((acc, curr) => {
          console.log(parseInt(curr.Duration));
          return acc + parseInt(curr.Duration);
        }, 0);
      }
      if (topic.Type === "video") {
        totalVideo += topic.video?.reduce((acc, curr) => {
          return acc + parseInt(curr.Duration);
        }, 0);
      }
      if (topic.Type === "compiler") {
        totalCompiler += topic.compiler?.reduce((acc, curr) => {
          return acc + parseInt(curr.Duration);
        }, 0);
      }
      if (topic.Type === "findAnswer") {
        totalFindAnswer += topic.findAnswers?.reduce((acc, curr) => {
          return acc + parseInt(curr.Duration);
        }, 0);
      }

      if (topic.Type === "mcq") {
        totalMcq += topic.questions?.reduce((acc, curr) => {
          return acc + parseInt(curr.Duration);
        }, 0);
      }
    });

    const total =
      totalMcq + totalEssay + totalVideo + totalCompiler + totalFindAnswer;

    console.log(
      total,
      "total",
      totalMcq,
      totalEssay,
      totalVideo,
      totalCompiler,
      totalFindAnswer
    );
    return total;
  };

  const handleSubmit = () => {
    // dispatch(setTest({
    //   totalTime,
    //   totalQuestions,
    //   totalAttempts
    // }
    if (
      !name ||
      !description ||
      !totalAttempts ||
      !totalQuestions ||
      !duration_from ||
      !duration_to
    ) {
      const confirmed = window.confirm("Please fill all the details");

      if (confirmed) {
        // Navigate to the specified page
        navigate(`/collage/test/name?level=${level}`);
      }

      return;
    }
    if (totalAttempts < 0 || totalQuestions < 0) {
      const confirmed = window.confirm(
        "Total attempts, and total questions must be positive numbers."
      );
      if (confirmed) {
        // Navigate to the specified page
        navigate(`/collage/test/name?level=${level}`);
      }
      return;
    }
    if (!topics[0]) {
      toast.error("Please select atleast one topic");
      return;
    }

    if (totalQuestions > questions.length) {
      console.log(totalQuestions, questions.length);
      toast.error(
        `Add ${
          totalQuestions - questions.length
        } more questions to complete the test`
      );
      return;
    }
    if (totalQuestions < questions.length) {
      console.log(totalQuestions, questions.length);
      window.alert(
        `Remove ${
          questions.length - totalQuestions
        } questions to complete the test`
      );

      return;
    }

    let totalTimeCal = handleCalculateTime();

    // totalTimeCal = totalTimeCal.reduce((acc, curr) => {
    //   return acc + curr;
    // }, 0);

    console.log(totalTimeCal, totalDuration);

    // console.log(totalTimeCal, totalDuration);

    // if (totalTimeCal[0] > totalDuration) {
    //   window.alert(
    //     "Total duration of questions is greater than the total duration of test"
    //   );

    //   return;
    // }

    // if(totalTimeCal < totalDuration){
    //   window.alert("Total duration of questions is less than the total duration of test");
    //   return;

    // console.log(totalTimeCal, totalDuration);
    localStorage.setItem("totalTime", JSON.stringify(totalTimeCal));
    localStorage.setItem("testName", JSON.stringify(name));
    dispatch(
      createTest({
        level,
        name,
        description,
        totalAttempts,
        totalQuestions,
        totalDuration: totalTimeCal,
        // totalDuration,
        topics,
      })
    ).then(() => {
      // dispatch(
      //   setTestBasicDetails({ name: "", description: "", totalAttempts: null ,totalQuestions:0})
      // );

      navigate("/collage/test/final");
    });
  };

  const max = questions?.length / 10;
  const [selected, setSelected] = useState(1);

  return (
    <div className="w-11/12 mx-auto relative    min-h-[90vh] pb-20">
      <Header page={"final"} handleSubmit={handleSubmit} />
      <div className="w-4/5 mx-auto">
        <Progress />
      </div>

      <div className="mt-16">
        {console.log(questions)}
        {questions
          ?.slice((selected - 1) * 10, selected * 10)
          .map((question, i) => {
            return (
              <div className="my-2">
                {question.codeQuestion && (
                  <Code
                    question={question}
                    Title={question.codeQuestion}
                    code={question.code}
                    number={(selected - 1) * 10 + 1 + i}
                  />
                )}
                {question.Title && (
                  <List
                    question={question}
                    number={(selected - 1) * 10 + 1 + i}
                  />
                )}
                {question.videoFile && (
                  <Video
                    Number={(selected - 1) * 10 + 1 + i}
                    video={question}
                  />
                )}{" "}
              </div>
            );
          })}

        {/* iterate this list */}
      </div>

      <div className="absolute bottom-2 mt-20 flex gap-2 w-full justify-center">
        <div className="rounded-lg bg-gray-100 h-10 w-10 flex justify-center">
          <FaChevronLeft
            className={`rotate-45 text-lg self-center ${
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
          <FaChevronRight
            className={`rotate-45 text-lg self-center ${
              selected === Math.ceil(max) && "disabled"
            }`}
            onClick={() =>
              selected !== Math.ceil(max) && setSelected(selected + 1)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Submit;
