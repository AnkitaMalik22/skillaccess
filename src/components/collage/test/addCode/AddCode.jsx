import React, { useEffect, useState } from "react";
import Header from "./Header";
import { FaX } from "react-icons/fa6";
import { FaChevronLeft, FaPlus } from "react-icons/fa";
import Question from "./Question";
import Code from "./rightBlock/Index";
import {
  addCompiler,
  addCompilerToTopic,
  addQuestionToTopic,
  editQuestionById,
} from "../../../../redux/collage/test/testSlice";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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

  const type = searchParams.get("type");
  const addType = searchParams.get("addType");
  const [toggle, setToggle] = useState(1);

  let ID;
  searchParams.get("topicId") !== null
    ? (ID = searchParams.get("topicId"))
    : (ID = id);
  // Format of the question object
  // "code": "printf('hello world')",
  // "codeQuestion": "Write a program to print 'hello world'",
  // "codeLanguage": "c",
  // "parameters": "int",
  // "testcase": [
  // {
  //   "input": "5",
  //   "expectedOutput": "5"
  // },
  // {
  //   "input": "10",
  //   "expectedOutput": "10"
  // }
  // ],
  // "output": [
  // "hello world"
  // ]
  const [question, setQuestion] = useState({
    section: ID,
    id: ID + Date.now(),

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
          alert("Please fill the code");

          return;
        }
        if (question.verificationCode === "") {
          alert("Please fill the code");

          return;
        }
        if (question.Duration == 0) {
          alert("Please fill the duration");

          return;
        }
        if (question.codeQuestion === "") {
          alert("Please fill the question");

          return;
        }
        if (question.codeLanguage === "") {
          alert("Please fill the codelanguage");

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
        alert("Please fill all the fields");
      }
    } else {
      if (
        question.codeQuestion != "" ||
        question.code != "" ||
        question.codeLanguage != "" ||
        question.code != "" ||
        question.verificationCode != ""
      ) {
        if (question.code === "") {
          alert("Please fill the code");

          return;
        }
        if (question.codeQuestion === "") {
          alert("Please add the question");
          return;
        }
        if (question.verificationCode === "") {
          alert("Please fill the code");

          return;
        }

        if (question.Duration == 0) {
          alert("Please fill the duration");
          return;
        }
        if (question.codeLanguage === "") {
          alert("Please fill the langugage");

          return;
        }
        if (isPrev) {
          dispatch(
            addCompiler({
              data: question,
              id: id,
              type: type,
              prev: true,
              index: count + 1,
            })
          );
          setCount(topics[id].compiler.length - 1);
          setIsPrev(false);
          setQuestion({
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
        } else {
          dispatch(
            addCompiler({ data: question, id: id, type: type, prev: false })
          );
          // dispatch(addQuestionToTopic({ data: question, id: id, type: type }));
          setQuestion({
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
        }

        setToggle(1);
        if (component === "save") {
          navigate(-1);
        }
      } else {
        alert("Please fill all the fields");
      }
    }
    console.log(question);
  };
  useEffect(() => {
    setCountDetail(currentTopic?.compiler.length - 1);
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
              <button
                className="self-center justify-center flex bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-bold gap-2 "
                onClick={() => handleSave("next")}
              >
                <FaPlus className="self-center" /> Add Next Question
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCode;
