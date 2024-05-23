import React, { useEffect, useState } from "react";
import Header from "./Header";
import { FaX } from "react-icons/fa6";
import { FaChevronLeft, FaPlus } from "react-icons/fa";
import Question from "./Question";
import Code from "./rightBlock/Index";

import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  addCompiler,
  addCompilerToTopic,
} from "../../../../redux/collage/test/testSlice";
import { addQuestionToTopic } from "../../../../redux/collage/test/thunks/topic";
import { editQuestionById } from "../../../../redux/collage/test/thunks/question";

const AddCode = () => {
  const { id } = useParams();
  const { topics, currentTopic } = useSelector((state) => state.test);
  const [isPrev, setIsPrev] = useState(false);

  const [count, setCount] = useState(topics[id]?.compiler.length - 1);

  const [countDetail, setCountDetail] = useState(-1);

  const handlePrev = () => {
    if (addType === "topic") {
      setIsPrev(true);
      let current = currentTopic.compiler[countDetail];
      current = JSON.stringify(current);
      current = JSON.parse(current);
      setQuestion({ ...current, Duration: parseInt(current.Duration) || 0 });

      setCountDetail((prev) => {
        if (prev - 1 >= 0) return prev - 1;
        return -1;
      });
    } else {
      setIsPrev(true);
      let current = topics[id].compiler[count];
      setQuestion({ ...current, Duration: parseInt(current.Duration) });
      setCount((prev) => {
        if (prev - 1 >= 0) return prev - 1;
        return -1;
      });
    }
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [validate, setValidate] = useState(false);
  const { ADD_QUESTION_LOADING } = useSelector((state) => state.test);
  const type = searchParams.get("type");
  const level = searchParams.get("level");

  const addType = searchParams.get("addType");
  const [toggle, setToggle] = useState(1);

  let ID;
  searchParams.get("topicId") !== null
    ? (ID = searchParams.get("topicId"))
    : (ID = id);

  const [question, setQuestion] = useState({
    section: ID,
    id: ID + Date.now(),
    QuestionLevel: "beginner",
    Duration: 0,
    code: "",
    codeQuestion: "",
    codeLanguage: "",
    parameters: [
      {
        paramName: "",
        type: "String",
      },
    ],
    testcase: [{ input: "", expectedOutput: "" }],
    output: [""],
    returnType: "",
    verificationCode: "",
  });

  const handleChanges = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "input" || name === "expectedOutput") {
      const list = [...question.testcase];
      list[index][name] = value;
      setQuestion({ ...question, testcase: list });
    } else if (name === "paramName" || name === "type") {
      const list = [...question.parameters];
      list[index][name] = value;
      setQuestion({ ...question, parameters: list });
    } else {
      setQuestion({ ...question, [name]: value });
    }
  };

  useEffect(() => {
    if (addType === "edit") {
      const ques = JSON.parse(localStorage.getItem("qbQues"));
      setQuestion(ques);
    }
  }, []);
  const handleSave = (component) => {
    if (addType === "topic") {
      if (
        question.codeQuestion != "" ||
        question.code != "" ||
        question.codeLanguage != "" ||
        question.code != "" ||
        question.verificationCode != ""
      ) {
        if (question.code === "") {
          toast.error("Please fill the code");

          return;
        }
        if (question.verificationCode === "") {
          toast.error("Please fill the code");

          return;
        }
        if (question.Duration == 0) {
          toast.error("Please fill the duration");

          return;
        }
        if (question.codeQuestion === "") {
          toast.error("Please fill the question");

          return;
        }
        if (question.codeLanguage === "") {
          toast.error("Please fill the codelanguage");

          return;
        }
        if (isPrev) {
          dispatch(
            editQuestionById({
              index: countDetail + 1,
              type: "code",
              id: question._id,
              question: question,
            })
          );
          setCountDetail(currentTopic.compiler.length - 1);

          setIsPrev(false);
          setQuestion({
            QuestionLevel: "beginner",

            id: ID + Date.now(),
            section: ID,
            code: "",
            Duration: 0,
            codeQuestion: "",
            codeLanguage: "",
            parameters: [
              {
                paramName: "",
                type: "String",
              },
            ],
            testcase: [{ input: "", expectedOutput: "" }],
            output: [""],
          });
          setToggle(1);
        } else {
          dispatch(addCompilerToTopic({ data: question, id: id, type: type }));
          dispatch(addQuestionToTopic({ data: question, id: id, type: type }));
          setQuestion({
            QuestionLevel: level,

            id: ID + Date.now(),
            section: ID,
            code: "",
            Duration: 0,
            codeQuestion: "",
            codeLanguage: "",
            parameters: [
              {
                paramName: "",
                type: "String",
              },
            ],
            testcase: [{ input: "", expectedOutput: "" }],
            output: [""],
          });
          setToggle(1);
        }

        if (component === "save") {
          navigate(-1);
        }

        setToggle(1);
      } else {
        toast.error("Please fill all the fields");
      }

      console.log(question);
    } else {
      dispatch(
        editQuestionById({
          type: "code",
          id: question._id,
          question: question,
        })
      );
      navigate(-1);
    }
  };
  useEffect(() => {
    setCountDetail(currentTopic?.compiler?.length - 1);
  }, [currentTopic]);

  return (
    <div className="">
      <Header handleSave={handleSave} />
      <div className="bg-white min-h-[90vh] mx-auto rounded-xl pt-4 sm:w-[95.7%] px-3 relative">
        <div className="flex flex-wrap gap-2  ">
          <span className="w-[49%] ">
            <Question
              question={question}
              setQuestion={setQuestion}
              id={id}
              type={type}
              handleChanges={handleChanges}
              handleQuestionChange={handleQuestionChange}
              handleSave={handleSave}
              addType={addType}
            />
          </span>
          <span className="w-[49%]">
            <Code
              toggle={toggle}
              setToggle={setToggle}
              question={question}
              handleChanges={handleChanges}
              handleQuestionChange={handleQuestionChange}
              setQuestion={setQuestion}
              id={id}
              type={type}
            />
          </span>
        </div>

        <div className="pt-20">
          <div className="absolute bottom-10 flex right-8 gap-2">
            {" "}
            <div className=" flex gap-2">
              {addType === "topic" ? (
                <button
                  className={`self-center justify-center flex bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-bold gap-2 ${
                    countDetail >= 0 ? "" : "hidden"
                  }`}
                  onClick={handlePrev}
                >
                  <FaChevronLeft className="self-center" /> Prev
                </button>
              ) : (
                <button
                  className={`self-center justify-center flex bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-bold gap-2 ${
                    count >= 0 ? "" : "hidden"
                  }`}
                  onClick={handlePrev}
                >
                  <FaChevronLeft className="self-center" /> Prev
                </button>
              )}
            </div>
            <div className=" flex">
              {addType === "topic" && (
                <button
                  className="self-center justify-center flex bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-bold gap-2 "
                  onClick={() => handleSave("next")}
                >
                  <FaPlus className="self-center" /> Add Next Question
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCode;
