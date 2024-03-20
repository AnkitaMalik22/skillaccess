import React, { useEffect, useState } from "react";
import Header from "./Header";
import { LiaStopwatchSolid } from "react-icons/lia";
import Mcq from "./Mcq";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import FindAnswer from "./FindAnswer";
import Essay from "./Essay";
import Code from "./Code";
import Video from "./Video";
const { getTopicById } = require("../../../../redux/collage/test/testSlice");

const Review = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type");
  const questionType = searchParams.get("question");
  const view = searchParams.get("view");

  // console.log(questionType);
  const { currentTopic, topics } = useSelector((state) => state.test);
  useEffect(() => {
    if (type === "section") {
      // const topics = JSON.parse(localStorage.getItem("topics"));

      questionType === "mcq" && setQuestions(topics[id].questions);
      questionType === "findAnswer" && setQuestions(topics[id].findAnswers);
      questionType === "essay" && setQuestions(topics[id].essay);
      questionType === "video" && setQuestions(topics[id].video);
      questionType === "compiler" && setQuestions(topics[id].compiler);
    } else if (type === "topic") {
      questionType === "mcq" && setQuestions(currentTopic.questions);
      questionType === "findAnswer" && setQuestions(currentTopic.findAnswers);
      questionType === "essay" && setQuestions(currentTopic.essay);
      questionType === "video" && setQuestions(currentTopic.video);
      questionType === "compiler" && setQuestions(currentTopic.compiler);
    } else {
      questionType === "mcq" &&
        setQuestions(
          JSON.parse(localStorage.getItem("assessment")).topics[id].questions
        );
      questionType === "findAnswer" &&
        setQuestions(
          JSON.parse(localStorage.getItem("assessment")).topics[id].findAnswers
        );
      questionType === "essay" &&
        setQuestions(
          JSON.parse(localStorage.getItem("assessment")).topics[id].essay
        );
      questionType === "video" &&
        setQuestions(
          JSON.parse(localStorage.getItem("assessment")).topics[id].video
        );
      questionType === "compiler" &&
        setQuestions(
          JSON.parse(localStorage.getItem("assessment")).topics[id].compiler
        );
    }
  }, [topics, ""]);

  // useEffect(
  //   () => {
  //     dispatch(getTopicById(id)).then(() =>
  //       setQuestions(currentTopic.questions)
  //     );
  //     console.log(currentTopic, "currentTopic", id);
  //   },
  //   [dispatch],
  //   []
  // );
  // update the topic from topics array where the id matches the id in the url
  // for (let i = 0; i < topics.length; i++) {
  //   if (topics[i]._id === id) {
  //   topics[i].questions = newQuestions;
  //   }
  // }

  return (
    <div className="font-dmSans text-sm font-bold">
      <Header
        view={view}
        qt={questionType}
        id={
          localStorage.getItem("Topics")
            ? JSON.parse(localStorage.getItem("Topics"))._id
            : ""
        }
        type={type}
        topicId={searchParams.get("topicId")}
        sectionId={localStorage.getItem("Details") ? currentTopic._id : ""}
      />

      <div className="  w-11/12 mx-auto min-h-[90vh] my-2 rounded-lg   bg-gray-100 ">
        <div className="flex justify-between p-4">
          <span className="flex gap-2 pl-2">
            <h2>{questionType}</h2>
            <div className="flex gap-1 ">
              <LiaStopwatchSolid className="self-center text-gray-500 w-5 h-5" />
              <p className="text-gray-400 text-xs self-center">10 mins</p>
            </div>
          </span>
          {/* <span className="flex">
            <input
              type="checkbox"
              name="delete"
              className="self-center bg-[#DEEBFF] border-none rounded-md"
            />
            <label for="delete" className="pl-2">
              Delete Selected
            </label>
          </span> */}
        </div>

        {questionType === "mcq" ? (
          questions?.length > 0 ? (
            questions.map((question, i) => {
              // console.log(question);
              return (
                <Mcq
                  view={view}
                  type={type}
                  id={id}
                  Number={i}
                  question={question}
                  Title={question.Title}
                  Options={question.Options}
                  AnswerIndex={question.AnswerIndex}
                />
              );
            })
          ) : (
            <></>
          )
        ) : questionType === "findAnswer" ? (
          questions?.length > 0 ? (
            questions.map((question, i) => {
              console.log(question);
              return (
                <FindAnswer
                  view={view}
                  type={type}
                  id={id}
                  Number={i}
                  question={question}
                  Title={question?.Title || ""}
                  Options={question?.questions || []}
                />
              );
            })
          ) : (
            <></>
          )
        ) : questionType === "essay" ? (
          questions?.length > 0 ? (
            questions.map((question, i) => {
              // console.log(question);
              return (
                <Essay
                  Number={i}
                  Title={question?.Title || ""}
                  id={id}
                  view={view}
                  type={type}
                  question={question}
                />
              );
            })
          ) : (
            <></>
          )
        ) : questionType === "compiler" ? (
          questions?.length > 0 ? (
            questions.map((question, i) => {
              // console.log(question);
              return (
                <Code
                  view={view}
                  type={type}
                  id={id}
                  Number={i}
                  Title={question?.codeQuestion || ""}
                  code={question?.code}
                  question={question}
                />
              );
            })
          ) : (
            <></>
          )
        ) : questions?.length > 0 ? (
          questions.map((question, i) => {
            // console.log(question);
            return (
              <Video
                Number={i}
                id={id}
                video={question}
                view={view}
                type={type}
                question={question}
              />
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Review;
