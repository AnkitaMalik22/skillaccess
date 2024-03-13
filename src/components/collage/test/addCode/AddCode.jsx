import React, { useState } from "react";
import Header from "./Header";
import { FaX } from "react-icons/fa6";
import { FaChevronLeft, FaPlus } from "react-icons/fa";
import Question from "./Question";
import Code from "./rightBlock/Index";
import {
  addCompiler,
  addCompilerToTopic,
  addQuestionToTopic,
} from "../../../../redux/collage/test/testSlice";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const AddCode = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [validate, setValidate] = useState(false);
  const { id } = useParams();
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
        question.code != ""
      ) {
        if (question.code === "") {
          alert("Please fill the code");

          return;
        }

        if (question.Duration == 0) {
          alert("Please fill the duration");

          return;
        }
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
      } else {
        alert("Please fill all the fields");
      }
    } else {
      if (
        question.codeQuestion != "" ||
        question.code != "" ||
        question.codeLanguage != "" ||
        question.code != ""
      ) {
        if (question.code === "") {
          alert("Please fill the code");

          return;
        }
        if (question.codeQuestion === "") {
          alert("Please add the question");
          return;
        }

        if (question.Duration == 0) {
          alert("Please fill the duration");
          return;
        }
        dispatch(addCompiler({ data: question, id: id, type: type }));
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
        setToggle(1);
      } else {
        alert("Please fill all the fields");
      }
    }
    console.log(question);
    if (component === "save") {
      navigate(-1);
    }
  };

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
              <button
                className="self-center justify-center flex bg-gray-200 p-2 rounded-lg text-sm font-bold gap-2 w-32"
                onClick={() => navigate(-1)}
              >
                <FaChevronLeft className="self-center" /> Prev
              </button>
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
