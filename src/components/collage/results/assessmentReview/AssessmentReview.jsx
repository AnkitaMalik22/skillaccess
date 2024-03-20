import React, { useState } from "react";
import Header from "./Header";
import { Progress } from "./Progress";
import List from "./List";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  createTest,
  setTestBasicDetails,
  setTestSelectedTopics,
} from "../../../../redux/collage/test/testSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Code from "./Code";
import Video from "./Video";
import Essay from "./Essay";
import HeaderMarks from "./HeaderMarks";

const AssessmentReview = () => {
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
  } = useSelector((state) => state.test);

  const [questions, setQuestions] = useState([
    {
      Duration: "2",
      createdByCompany: false,
      essay: [],
      findAnswer: [],
      long: [],
      longAnswer: [],
      mcq: [],
      questions: [
        {
          AnswerIndex: "1",
          Duration: "2",
          Options: ["asa", "aaa", "aass", "ss"],
          QuestionType: "",
          Title: "sadsadww",
          prev: {
            Options: ["asa", "aaa", "aass", "ss", "ss"],
          },
        },
      ],
      section: "65e84f74855bd8ed53d7eb0c",
      short: [],
      shortAnswer: [],
      videoFile:
        "https://res.cloudinary.com/dkqgktzny/video/upload/v1709723575/videos/d1kct20nz6tdbzos9ydf.mp4",
      __v: 0,
      _id: "65e84fc9855bd8ed53d7eb81",
    },
    {
      StudentAnswerIndex: 1,
      Answer: "",
      AnswerIndex: 1,
      LengthyAnswers: [],
      McqAnswers: [],
      Options: ["q", "q", "w", "q"],
      QuestionType: "mcq",
      Title: "ui",
      createdByCompany: false,
      section: "65e6eb0ebf9c492d9798db63",
      __v: 0,
      _id: "65e6eb1fbf9c492d9798db69",
    },
    {
      Answer: "",
      QuestionType: "findAnswer",
      Title: "sample para",
      createdByCompany: false,
      questions: [
        {
          question: "ques",
        },
      ],
      section: "65e16278dc9a90a47549db06",
      __v: 0,
      _id: "65e16294dc9a90a47549db0c",
    },
    {
      Answer: "",
      QuestionType: "Compiler",
      code: "export function undefined( undefined ) { \n    // Insert your code here\n      }",
      codeLanguage: "",
      codeQuestion: "new q",
      createdByCompany: false,
      output: [""],
      parameters: [
        {
          paramName: "sss",
          type: "Int",
        },
      ],
      returnType: "int",
      section: "65e05d48a42cf9a4343ac7c3",
      testcase: [
        {
          input: "[1]",
          expectedOutput: "[1],0",
        },
      ],
      verificationCode:
        "export function undefined( undefined ) { \n    // Insert your code here  \n    }",
      __v: 0,
      _id: "65e061e7c471867a96301276",
    },
    {
      Answer: "",
      QuestionType: "essay",
      Title: "dsddasd",
      createdByCompany: false,
      section: "65e031d9e2257bbccc1f17e5",
      __v: 0,
      _id: "65e035c5e2257bbccc1f1874",
    },
  ]);
  let section1 = [];
  let section2 = [];
  let section3 = [];
  let section4 = [];
  let section5 = [];
  //   useEffect(() => {
  //     if (topics[0])
  //       switch (topics[0].Type) {
  //         case "essay":
  //           section1 = topics[0].essay;
  //           break;
  //         case "video":
  //           section1 = topics[0].video;
  //           break;
  //         case "compiler":
  //           section1 = topics[0].compiler;
  //           break;
  //         case "findAnswer":
  //           section1 = topics[0].findAnswers;
  //           break;
  //         default:
  //           section1 = topics[0].questions;
  //           break;
  //       }

  //     if (topics[1])
  //       switch (topics[1].Type) {
  //         case "essay":
  //           section2 = topics[1].essay;
  //           break;
  //         case "video":
  //           section2 = topics[1].video;
  //           break;
  //         case "compiler":
  //           section2 = topics[1].compiler;
  //           break;
  //         case "findAnswer":
  //           section2 = topics[1].findAnswers;
  //           break;
  //         default:
  //           section2 = topics[1].questions;
  //           break;
  //       }

  //     if (topics[2])
  //       switch (topics[2].Type) {
  //         case "essay":
  //           section3 = topics[2].essay;
  //           break;
  //         case "video":
  //           section3 = topics[2].video;
  //           break;
  //         case "compiler":
  //           section3 = topics[2].compiler;
  //           break;
  //         case "findAnswer":
  //           section3 = topics[2].findAnswers;
  //           break;
  //         default:
  //           section3 = topics[2].questions;
  //           break;
  //       }

  //     if (topics[3])
  //       switch (topics[3].Type) {
  //         case "essay":
  //           section4 = topics[3].essay;
  //           break;
  //         case "video":
  //           section4 = topics[3].video;
  //           break;
  //         case "compiler":
  //           section4 = topics[3].compiler;
  //           break;
  //         case "findAnswer":
  //           section4 = topics[3].findAnswers;
  //           break;
  //         default:
  //           section4 = topics[3].questions;
  //           break;
  //       }

  //     if (topics[4])
  //       switch (topics[4].Type) {
  //         case "essay":
  //           section5 = topics[4].essay;
  //           break;
  //         case "video":
  //           section5 = topics[4].video;
  //           break;
  //         case "compiler":
  //           section5 = topics[4].compiler;
  //           break;
  //         case "findAnswer":
  //           section5 = topics[4].findAnswers;
  //           break;
  //         default:
  //           section5 = topics[4].questions;
  //           break;
  //       }

  //     console.log(section1, section2, section3, section4, section5);

  //     setQuestions([
  //       ...section1,
  //       ...section2,
  //       ...section3,
  //       ...section4,
  //       ...section5,
  //     ]);
  //   }, [topics, ""]);

  const handleSubmit = () => {};

  const max = questions?.length / 10;
  const [selected, setSelected] = useState(1);

  return (
    <div className="w-11/12 mx-auto relative    min-h-[90vh] pb-20">
      {/* <Header page={"final"} handleSubmit={handleSubmit} /> */}
      <HeaderMarks />
      <div className="mt-16">
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
                {question.Title &&
                  (question.AnswerIndex !== undefined ? (
                    <List
                      question={question}
                      number={(selected - 1) * 10 + 1 + i}
                    />
                  ) : (
                    <Essay
                      question={question}
                      number={(selected - 1) * 10 + 1 + i}
                    />
                  ))}
                {question.videoFile && (
                  <Video
                    Number={(selected - 1) * 10 + 1 + i}
                    video={question}
                  />
                )}
              </div>
            );
          })}

        {/* iterate this list */}
      </div>

      <div className="absolute bottom-2 mt-20 flex gap-2 w-full justify-center">
        <div className="rounded-lg bg-gray-100 h-10 w-10 flex justify-center">
          <FaChevronLeft
            className={`rotate-45 text-lg self-center ${
              selected === max && "disabled"
            }`}
            onClick={() => selected !== 1 && setSelected(selected - 1)}
          />
        </div>

        <div
          className={`rounded-lg h-10 w-10 flex justify-center ${
            selected === 1 ? "bg-blue-700 text-white" : "bg-gray-100 "
          }`}
          onClick={() => setSelected(1)}
        >
          <p className="self-center">1</p>
        </div>
        <div
          className={`rounded-lg h-10 w-10 flex justify-center ${
            selected === 2 ? "bg-blue-700 text-white" : "bg-gray-100 "
          }`}
          onClick={() => setSelected(2)}
        >
          <p className="self-center">2</p>
        </div>
        <div
          className={`rounded-lg h-10 w-10 flex justify-center ${
            selected > 2 && selected < max
              ? "bg-blue-700 text-white"
              : "bg-gray-100 "
          }`}
          onClick={() => {
            selected !== 3 && setSelected(3);
          }}
        >
          <p className="self-center">
            {selected >= 3 && selected < max ? selected : 3}
          </p>
        </div>
        <div className="rounded-lg bg-gray-100 h-10 w-10 flex justify-center">
          <p className="self-center">...</p>
        </div>

        {max > 3 && (
          <div
            className={`rounded-lg h-10 w-10 flex justify-center ${
              selected === max ? "bg-blue-700 text-white" : "bg-gray-100 "
            }`}
            onClick={() => setSelected(max)}
          >
            <p className="self-center">{max}</p>
          </div>
        )}

        <div className="rounded-lg bg-gray-100 h-10 w-10 flex justify-center">
          <FaChevronRight
            className={`rotate-45 text-lg self-center ${
              selected === max && "disabled"
            }`}
            onClick={() => selected !== max && setSelected(selected + 1)}
          />
        </div>
      </div>
    </div>
  );
};

export default AssessmentReview;
