import React, { useState } from "react";
import Header from "../../../components/college/test/submit/Header";
import { Progress } from "../../../components/college/test/submit/Progress";
import List from "../../../components/college/test/submit/List";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import Code from "../../../components/college/test/submit/Code";
import Video from "../../../components/college/test/submit/Video";
import toast from "react-hot-toast";
import { createTest } from "../../../redux/college/test/thunks/test";
import { getCollege } from "../../../redux/college/auth/authSlice";
import useTranslate from "../../../hooks/useTranslate";
import { isUni } from "../../../util/isCompany";

const Submit = () => {
  //useTranslate();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
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
    isNegativeMarking,
  } = useSelector((state) => state.test);
  const [searchParams, setSearchParams] = useSearchParams();
  const testType = searchParams.get("level");
  const entity = isUni() ? "university/pr" : "college";
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

    //console.log(section1, section2, section3, section4, section5);

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
          //console.log(parseInt(curr.Duration));
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

    //console.log(
    //   total,
    //   "total",
    //   totalMcq,
    //   totalEssay,
    //   totalVideo,
    //   totalCompiler,
    //   totalFindAnswer
    // );
    return total;
  };

  const adaptiveCheck = (error) => {
    let err = false;
    for (let i = 0; i < 5; i++) {
      // assuming we have topics[0] to topics[4]
      if (topics[i]) {
        let l1 = 0;
        let l2 = 0;
        let l3 = 0;
        topics[i].questions.forEach((question) => {
          if (question.QuestionLevel === "beginner") {
            l1 += 1;
          } else if (question.QuestionLevel === "intermediate") {
            l2 += 1;
          } else {
            l3 += 1;
          }
        });
        if (l1 < topics[i].totalL1Question) {
          err = `Insufficient l1 question in topic ${i + 1}`;
        }
        if (l2 < topics[i].totalL2Question) {
          err = `Insufficient l2 question in topic ${i + 1}`;
        }
        if (l3 < topics[i].totalL3Question) {
          err = `Insufficient l3 question in topic ${i + 1}`;
        }
      }
    }
    error = err;
    //console.log(error);
    return error;

    // Example usage:
    // const topics = [{ ... }, { ... }, { ... }, { ... }, { ... }];
    // const result = checkQuestions(topics);
    // //console.log(result); // Logs the result of the check
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
        navigate(`/${entity}/test/name?level=${level}`);
      }

      return;
    }
    if (totalAttempts < 0 || totalQuestions < 0) {
      const confirmed = window.confirm(
        "Total attempts, and total questions must be positive numbers."
      );
      if (confirmed) {
        // Navigate to the specified page
        navigate(`/${entity}/test/name?level=${level}`);
      }
      return;
    }
    if (!topics[0]) {
      toast.error("Please select atleast one topic");
      return;
    }
    //console.log("adaapt", testType);
    if (testType === "adaptive") {
      let error = false;
      error = adaptiveCheck(error);
      //console.log(error);

      if (error) {
        return toast.error(error);
      }
      if (parseInt(totalQuestions) * 2 > questions.length) {
        //console.log(totalQuestions, questions.length);
        toast.error(
          `Add ${
            2 * totalQuestions - questions.length
          } more questions to complete the test`
        );
        return;
      }
      if (parseInt(totalQuestions) * 2 < questions.length) {
        //console.log(totalQuestions, questions.length);
        window.alert(
          `Remove ${
            questions.length - totalQuestions * 2
          } questions to complete the test`
        );

        return;
      }
    } else {
      if (totalQuestions > questions.length) {
        //console.log(totalQuestions, questions.length);
        toast.error(
          `Add ${
            totalQuestions - questions.length
          } more questions to complete the test`
        );
        return;
      }
      if (totalQuestions < questions.length) {
        //console.log(totalQuestions, questions.length);
        window.alert(
          `Remove ${
            questions.length - totalQuestions
          } questions to complete the test`
        );

        return;
      }
    }
    let totalTimeCal = handleCalculateTime();

    // totalTimeCal = totalTimeCal.reduce((acc, curr) => {
    //   return acc + curr;
    // }, 0);

    //console.log(totalTimeCal, totalDuration);

    // //console.log(totalTimeCal, totalDuration);

    // if (totalTimeCal[0] > totalDuration) {
    //   window.alert(
    //     "Total duration of questions is greater than the total duration of test"
    //   );

    //   return;
    // }

    // if(totalTimeCal < totalDuration){
    //   window.alert("Total duration of questions is less than the total duration of test");
    //   return;

    // //console.log(totalTimeCal, totalDuration);
    localStorage.setItem("totalTime", JSON.stringify(totalTimeCal));
    localStorage.setItem("testName", JSON.stringify(name));
    setLoading(true);

    dispatch(
      createTest({
        level,
        name,
        description,
        totalAttempts,
        totalQuestions,
        totalDuration: totalTimeCal,
        startDate: duration_from,
        endDate: duration_to,
        // totalDuration,
        topics,
        isNegativeMarking: isNegativeMarking,
      })
    ).then((res) => {
      // dispatch(
      //   setTestBasicDetails({ name: "", description: "", totalAttempts: null ,totalQuestions:0})
      // );
      if (!isUni()) dispatch(getCollege());
      setLoading(false);
      //console.log(res);

      if (res.type === "test/createTest/fulfilled") {
        navigate(
          `/${entity}/test/final?testId=${res.payload._id}&name=${res.payload.name}&duration=${res.payload.totalTime}&attepmts=${res.payload.totalAttempts}&total=${res.payload.totalQuestionsCount}`
        );
      }
    });
  };

  const max = questions?.length / 10;
  const [selected, setSelected] = useState(1);

  return (
    <div className=" relative  h-full  min-h-[90vh] pb-20">
      <Header page={"final"} handleSubmit={handleSubmit} loading={loading} />
      <div className="w-4/5 mx-auto">
        <Progress />
      </div>

      <div className="mt-16 ">
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
                {question.Title && !question.codeQuestion && (
                  <List
                    level={testType}
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

      <div className="absolute -bottom-8 flex gap-2 w-full justify-center">
        <div className="rounded-md bg-gray-100 h-10 w-10 flex justify-center">
          <IoMdArrowDropleft
            className={` text-lg self-center ${selected === 1 && "disabled"}`}
            onClick={() => selected !== 1 && setSelected(selected - 1)}
          />
        </div>

        {Array.from({ length: Math.ceil(max) }).map((_, index) => {
          const pageNumber = index + 1;
          const hasQuestions = (pageNumber - 1) * 10 < questions.length;
          //console.log(questions.length);
          //console.log(Math.ceil(max));
          return (
            hasQuestions && (
              <div
                key={pageNumber}
                className={`rounded-md h-10 w-10 flex justify-center ${
                  selected === pageNumber
                    ? "bg-accent text-white"
                    : "bg-gray-100"
                }`}
                onClick={() => setSelected(pageNumber)}
              >
                <p className="self-center">{pageNumber}</p>
              </div>
            )
          );
        })}

        <div className="rounded-md bg-gray-100 h-10 w-10 flex justify-center">
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
    </div>
  );
};

export default Submit;
