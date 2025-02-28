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
} from "../../../../redux/college/test/testSlice";
import { addQuestionToTopic } from "../../../../redux/college/test/thunks/topic";
import { editQuestionById } from "../../../../redux/college/test/thunks/question";
import { setTotalTopicQuestions } from "../../../../redux/college/test/thunks/topic";
import { addQuestionToTopicCompany } from "../../../../redux/company/test/thunks/topic";
import HeaderCompany from "../../../company/HeaderCompany";
import Loader from "../addVideo/Loader";

const AddCode = () => {
  const { id } = useParams();
  const { topics, currentTopic } = useSelector((state) => state.test);
  const [isPrev, setIsPrev] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(topics[id]?.compiler.length - 1);

  const [countDetail, setCountDetail] = useState(-1);

  const isCompany = () => {
    return /\/company.*/.test(window.location.pathname);
  };

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
  const codeTemplates = {
    Java: {
      defaultCode: ``,
      solutionCode: `import java.io.*;
  
  public class Main {
    public static void main(String[] args) {
      // Insert your Java solution code here
    }
  }`,
    },
    Python: {
      defaultCode: ``,
      solutionCode: `def main():
      # Insert your Python solution code here
  
  if __name__ == "__main__":
      main()`,
    },
    Cpp: {
      defaultCode: ``,
      solutionCode: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // Insert your C++ solution code here\n    return 0;\n}`,
    },
    C: {
      defaultCode: ``,
      solutionCode: `#include <stdio.h>\n\nint main() {\n    // Insert your C solution code here\n    return 0;\n}`,
    },
  };
  let ID;
  searchParams.get("topicId") !== null
    ? (ID = searchParams.get("topicId"))
    : (ID = id);

  const [question, setQuestion] = useState({
    section: ID,
    id: ID + Date.now(),
    QuestionLevel: level,
    Duration: 0,
    code: {
      Java: codeTemplates.Java,
      Cpp: codeTemplates.Cpp,
      Python: codeTemplates.Python,
      C: codeTemplates.C,
    },
    codeQuestion: "",
    codeLanguage: "Java",
    parameters: [
      {
        paramName: "",
        type: "String",
      },
    ],
    testcase: [],
    output: [""],
    returnType: "",
    verificationCode: "",
    Title: "",
  });

  const [editorValue, setEditorValue] = useState({
    initialCode: question?.code[question.codeLanguage]?.defaultCode,
    solutionCode: question?.code[question.codeLanguage]?.solutionCode,
  });

  useEffect(() => {
    const defaultValue = question.code[question?.codeLanguage];
    setEditorValue({
      initialCode: defaultValue?.defaultCode,
      solutionCode: defaultValue?.solutionCode,
    });
    // //console.log(question.codeLanguage);
  }, [question?.codeLanguage, question?.code]);

  const handleEditorChange = (value, type) => {
    setEditorValue((prev) => ({ ...prev, [type]: value }));
    setQuestion((prevQuestion) => ({
      ...prevQuestion,
      code: {
        ...prevQuestion.code,
        [prevQuestion.codeLanguage]: {
          ...prevQuestion.code[prevQuestion.codeLanguage],
          [type]: value,
        },
      },
    }));
  };

  const selectedLanguage = question.codeLanguage.toLowerCase();
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
  const resetQuestion = () => {
    setQuestion({
      QuestionLevel: level,
      id: ID + Date.now(),
      section: ID,
      Title: "",
      code: {
        Java: {
          defaultCode: codeTemplates.Java.defaultCode,
          solutionCode: codeTemplates.Java.solutionCode,
        },
        Cpp: {
          defaultCode: codeTemplates.Cpp.defaultCode,
          solutionCode: codeTemplates.Cpp.solutionCode,
        },
        Python: {
          defaultCode: codeTemplates.Python.defaultCode,
          solutionCode: codeTemplates.Python.solutionCode,
        },
        C: {
          defaultCode: codeTemplates.C.defaultCode,
          solutionCode: codeTemplates.C.solutionCode,
        },
      },
      Duration: 0,
      codeQuestion: "",
      codeLanguage: "Java",
      parameters: [
        {
          paramName: "",
          type: "String",
        },
      ],
      testcase: [{ input: "", expectedOutput: "", isHidden: true }],
      output: [""],
    });
  };
  const handleSave = async (component) => {
    setLoading(true);
    if (addType === "topic") {
      if (
        // question.codeQuestion != "" ||
        question.code != ""
        // question.codeLanguage != "" ||
      ) {
        if (question.code === "") {
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

        if (isPrev) {
          dispatch(
            editQuestionById({
              index: countDetail + 1,
              type: "code",
              id: question._id,
              question: { ...question, codeLanguage: "" },
            })
          );
          setCountDetail(currentTopic.compiler.length - 1);

          setIsPrev(false);

          resetQuestion();
          setToggle(1);
        } else {
          if (question.testcase.length < 1) {
            toast.error("Testcases required");
            return;
          }

          if (isCompany()) {
            await dispatch(
              addQuestionToTopicCompany({
                data: { ...question, codeLanguage: "" },
                id: id,
                type: type,
              })
            );
          } else {
            await dispatch(
              addCompilerToTopic({
                data: { ...question, codeLanguage: "" },
                id: id,
                type: type,
              })
            );
            await dispatch(
              addQuestionToTopic({
                data: { ...question, codeLanguage: "" },
                id: id,
                type: type,
              })
            );
          }

          resetQuestion();
          setToggle(1);
        }

        if (component === "save") {
          navigate(-1);
        }

        setToggle(1);
      } else {
        toast.error("Please fill all the fields");
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
          toast.error("Please fill the code");

          return;
        }
        if (question.codeQuestion === "") {
          toast.error("Please add the question");
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
        if (question.codeLanguage === "") {
          toast.error("Please fill the langugage");

          return;
        }
        if (isPrev) {
          await dispatch(
            addCompiler({
              data: { ...question, codeLanguage: "" },
              id: id,
              type: type,
              prev: true,
              index: count + 1,
            })
          ).then(() => {
            setCount(topics[id].compiler.length - 1);
            setIsPrev(false);

            resetQuestion();
          });
        } else {
          await dispatch(
            addCompiler({
              data: { ...question, codeLanguage: "" },
              id: id,
              type: type,
              prev: false,
            })
          ).then(() => {
            resetQuestion();
            if (!ADD_QUESTION_LOADING) {
              setToggle(1);
              if (component === "save") {
                navigate(-1);
              }
            }
          });
          // dispatch(addQuestionToTopic({ data: question, id: id, type: type }));
        }
      } else {
        toast.error("Please fill all the fields");
      }
    }
    setLoading(false);
    // //console.log(question);
  };
  useEffect(() => {
    setCountDetail(currentTopic?.compiler?.length - 1);
  }, [currentTopic]);
  // //console.log(question);

  useEffect(() => {
    if (!ADD_QUESTION_LOADING) {
      dispatch(setTotalTopicQuestions({ id, type: "compiler", level }));
    }
  }, [ADD_QUESTION_LOADING]);

  return (
    <div>
      {isCompany() ? (
        <HeaderCompany
          hideNext={true}
          children={
            <button
              className="bg-accent self-center text-white rounded-md h-10 w-10 sm:w-32 flex items-center justify-center"
              onClick={() => handleSave("save")}
            >
              {loading ? "Saving" : "Save"}
              {loading && <Loader size="sm" />}
            </button>
          }
          handlePrev={() => {
            navigate(`/company/pr/test/select?level=${level}`);
          }}
        />
      ) : (
        <Header handleSave={handleSave} />
      )}

      <div className="bg-white min-h-[90vh] mx-auto rounded-xl relative">
        <div className="flex flex-wrap gap-5 md:flex-nowrap mb-5 md:mb-10 ">
          <div className="w-1/2 ">
            <Question
              question={question}
              setQuestion={setQuestion}
              id={id}
              type={type}
              handleChanges={handleChanges}
              handleQuestionChange={handleQuestionChange}
              handleSave={handleSave}
            />
          </div>
          <div className="w-1/2">
            <Code
              toggle={toggle}
              setToggle={setToggle}
              question={question}
              handleChanges={handleChanges}
              handleQuestionChange={handleQuestionChange}
              setQuestion={setQuestion}
              handleEditorChange={handleEditorChange}
              editorValue={editorValue}
              id={id}
              type={type}
            />
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          {" "}
          <div className=" flex gap-2">
            {addType === "topic" ? (
              <button
                className={`self-center justify-center flex bg-accent text-white py-2 px-4 rounded-md text-sm font-bold gap-2 ${
                  countDetail >= 0 ? "" : "hidden"
                }`}
                onClick={handlePrev}
              >
                <FaChevronLeft className="self-center" /> Prev
              </button>
            ) : (
              <button
                className={`self-center justify-center flex bg-accent text-white py-2 px-4 rounded-md text-sm font-bold gap-2 ${
                  count >= 0 ? "" : "hidden"
                }`}
                onClick={handlePrev}
              >
                <FaChevronLeft className="self-center" /> Next
              </button>
            )}
          </div>
          <div className=" flex">
            <button
              className="self-center justify-center flex bg-accent text-white py-2 px-4 rounded-md text-sm font-bold gap-2 "
              onClick={() => handleSave("next")}
            >
              <FaPlus className="self-center" /> Add Next Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCode;
