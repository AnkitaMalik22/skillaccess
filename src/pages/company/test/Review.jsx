import React, { useEffect, useState } from "react";
import Header from "../../../components/collage/test/review/Header";
import { LiaStopwatchSolid } from "react-icons/lia";
import Mcq from "../../../components/collage/test/review/Mcq";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import FindAnswer from "../../../components/collage/test/review/FindAnswer";
import Essay from "../../../components/collage/test/review/Essay";
import Code from "../../../components/collage/test/review/Code";
import Video from "../../../components/collage/test/review/Video";
import useTranslate from "../../../hooks/useTranslate";
import { getTest } from "../../../redux/company/test/thunks/test";

const Review = () => {
  //useTranslate();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [questions, setQuestions] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type");
  const questionType = searchParams.get("question");
  const view = searchParams.get("view");
  const [visible, setVisible] = useState(false);
  // //console.log(questionType);
  const { currentTopic, topics,test } = useSelector((state) => state.companyTest);


  useEffect(() => {
   if(currentTopic){
    if (type === "section") {
      // const topics = JSON.parse(localStorage.getItem("topics"));
      setName(topics[id].Heading);
      questionType === "mcq" && setQuestions(topics[id].questions);
      questionType === "findAnswer" && setQuestions(topics[id].findAnswers);
      questionType === "essay" && setQuestions(topics[id].essay);
      questionType === "video" && setQuestions(topics[id].video);
      questionType === "compiler" && setQuestions(topics[id].compiler);
    } else if (type === "topic") {
      setName(currentTopic.Heading);
      questionType === "mcq" && setQuestions(currentTopic.questions);
      questionType === "findAnswer" && setQuestions(currentTopic.findAnswers);
      questionType === "essay" && setQuestions(currentTopic.essay);
      questionType === "video" && setQuestions(currentTopic.video);
      questionType === "compiler" && setQuestions(currentTopic.compiler);
    } else {
   if(topics[id]){
    setName(
      JSON.parse(localStorage.getItem("assessment")).topics[id].Heading
    );
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
  }
   }
  }, [topics, "", currentTopic]);
  //console.log(currentTopic);

  // useEffect(
  //   () => {
  //     dispatch(getTopicById(id)).then(() =>
  //       setQuestions(currentTopic.questions)
  //     );
  //     //console.log(currentTopic, "currentTopic", id);
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
  const handleCalculateTime = () => {
    let totalMcq = 0,
      totalEssay = 0,
      totalVideo = 0,
      totalCompiler = 0,
      totalFindAnswer = 0;

    if (type === "topic") {
      if (currentTopic.Type === "essay") {
        totalEssay += currentTopic.essay?.reduce((acc, curr) => {
          return acc + parseInt(curr.Duration);
        }, 0);
      }
      if (currentTopic.Type === "video") {
        totalVideo += currentTopic.video?.reduce((acc, curr) => {
          return acc + parseInt(curr.Duration);
        }, 0);
      }
      if (currentTopic.Type === "compiler") {
        totalCompiler += currentTopic.compiler?.reduce((acc, curr) => {
          return acc + parseInt(curr.Duration);
        }, 0);
      }
      if (currentTopic.Type === "findAnswer") {
        totalFindAnswer += currentTopic.findAnswers?.reduce((acc, curr) => {
          return acc + parseInt(curr.Duration);
        }, 0);
      }

      if (currentTopic.Type === "mcq") {
        totalMcq += currentTopic.questions?.reduce((acc, curr) => {
          return acc + parseInt(curr.Duration);
        }, 0);
      }
    } else if (type === "section") {
      const section = topics[id];

      if (section.Type === "essay") {
        totalEssay += section.essay?.reduce((acc, curr) => {
          return acc + parseInt(curr.Duration);
        }, 0);
      }
      if (section.Type === "video") {
        totalVideo += section.video?.reduce((acc, curr) => {
          return acc + parseInt(curr.Duration);
        }, 0);
      }
      if (section.Type === "compiler") {
        totalCompiler += section.compiler?.reduce((acc, curr) => {
          return acc + parseInt(curr.Duration);
        }, 0);
      }
      if (section.Type === "findAnswer") {
        totalFindAnswer += section.findAnswers?.reduce((acc, curr) => {
          return acc + parseInt(curr.Duration);
        }, 0);
      }

      if (section.Type === "mcq") {
        totalMcq += section.questions?.reduce((acc, curr) => {
          return acc + parseInt(curr.Duration);
        }, 0);
      }
    }

    const total =
      totalMcq + totalEssay + totalVideo + totalCompiler + totalFindAnswer;

    return total;
  };
  const [noQuestionsMessage, setNoQuestionsMessage] = useState("");

  useEffect(() => {
    // Other code...

    // Set message if no questions are present for the type
    if (questions?.length === 0) {
      setNoQuestionsMessage(`No ${questionType} questions found.`);
    } else {
      setNoQuestionsMessage("");
    }
  }, [questions]);
  const totalTime = handleCalculateTime();



  useEffect(() => {
    dispatch(getTest(id));
    console.log(test, "test");
  } , []);
  return (
    <>
     {/* Test Details */}
      <div className="flex justify-between">
        <h2 className="text-lg capitalize">{test?.name}</h2>
        <div className="flex gap-2 items-center">
          <LiaStopwatchSolid className="self-center text-gray-500 w-5 h-5" />
          <p className="text-gray-400 text-xs self-center">{test?.totalTime} mins</p>
        </div>
      </div>
     
    

      <div
        className={`mx-auto p-5 min-h-[80vh] my-2 rounded-lg   bg-gray-100  ${
          visible && "h-[80vh] overflow-hidden"
        }`}
      >
        <div className="flex justify-between mb-5">
          <span className="flex gap-2 items-center">
            <h2 className="capitalize text-lg">{questionType}</h2>
            <div className="flex gap-1 items-center ">
              <LiaStopwatchSolid className="self-center text-gray-500 w-5 h-5" />
              <p className="text-gray-400 text-xs self-center">
                {totalTime} mins
              </p>
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
        {noQuestionsMessage && (
          <div className="text-red-500 text-center">{noQuestionsMessage}</div>
        )}
        {questionType === "mcq" ? (
          questions?.length > 0 ? (
            [...questions] // Create a copy of the questions array
              // Sort questions based on level
              .sort((a, b) => {
                // Define the order of levels
                const levelsOrder = ["beginner", "intermediate", "advanced"];

                // Compare the levels of questions
                const levelAIndex = levelsOrder.indexOf(a.QuestionLevel);
                const levelBIndex = levelsOrder.indexOf(b.QuestionLevel);

                // Return the comparison result
                return levelAIndex - levelBIndex;
              })
              // Map over sorted questions
              .map((question, i) => (
                <Mcq
                  key={i}
                  view={view}
                  type={type}
                  id={id}
                  Number={i}
                  question={question}
                  Title={question.Title}
                  Options={question.Options}
                  AnswerIndex={question.AnswerIndex}
                />
              ))
          ) : (
            <></>
          )
        ) : questionType === "findAnswer" ? (
          questions?.length > 0 ? (
            questions.map((question, i) => {
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
              // //console.log(question);
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
              // //console.log(question);
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
            // //console.log(question);
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
    </>
  );
};

export default Review;
