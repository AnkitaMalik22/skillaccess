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
import {
  addQuestionToTopic,
  setTotalTopicQuestions,
} from "../../../../redux/college/test/thunks/topic";
import {
  editBankQuestionById,
  editQuestionById,
} from "../../../../redux/college/test/thunks/question";
import { isUni, isCompany } from "../../../../util/isCompany";

const codeTemplates = {
  Java: {
    defaultCode: ``,
    solutionCode: `
      // Insert your Java solution code here
   `,
  },
  Python: {
    defaultCode: ``,
    solutionCode: `# Insert your Python solution code here`,
  },
  Cpp: {
    defaultCode: ``,
    solutionCode: `//Insert your C++ solution code here`,
  },
  C: {
    defaultCode: ``,
    solutionCode: `// Insert your C solution code here`,
  },
};
let ID;

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

  searchParams.get("topicId") !== null
    ? (ID = searchParams.get("topicId"))
    : (ID = id);

  const [question, setQuestion] = useState({
    section: ID,
    id: ID + Date.now(),
    QuestionLevel: "beginner",
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

  const [editorValue, setEditorValue] = useState(() => {
    if (question && question.code && question.codeLanguage)
      return {
        defaultCode: question?.code[question?.codeLanguage]?.defaultCode,
        solutionCode: question?.code[question?.codeLanguage]?.solutionCode,
      };
  });

  useEffect(() => {
    // if (question.code) {
    const defaultValue = question.code[question.codeLanguage];

    setEditorValue({
      defaultCode: defaultValue?.defaultCode,
      solutionCode: defaultValue?.solutionCode,
    });
    // }
  }, [question.codeLanguage, question.code]);

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
    } else if (e.target.name === "QuestionLevel") {
      setQuestion((prev) => {
        return { ...prev, QuestionLevel: e.target.value };
      });
    } else {
      setQuestion({ ...question, [name]: value });
    }
  };
  const resetQuestion = () => {
    setQuestion({
      QuestionLevel: "beginner",
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
      testcase: [],
      output: [""],
    });
  };
  useEffect(() => {
    if (addType === "edit") {
      const ques = JSON.parse(localStorage.getItem("qbQues"));
      setQuestion({ ...ques, codeLanguage: "Java" });
      const defaultValue = ques.code[question.codeLanguage];

      setEditorValue({
        defaultCode: defaultValue?.defaultCode,
        solutionCode: defaultValue?.solutionCode,
      });
    }
  }, []);
  const handleSave = async (component) => {


    if (question.code != "") {
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

      if (question.testcase.length === 0) {
        toast.error("Please add testcases first");
        return;
      }



    } else {
      toast.error("Please fill all the fields");
    }

    if (addType === "topic") {
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
        resetQuestion();
        setToggle(1);
      } else {
        await dispatch(
          addCompilerToTopic({ data: question, id: id, type: type })
        );
        await dispatch(
          addQuestionToTopic({ data: question, id: id, type: type })
        );

        resetQuestion();
        setToggle(1);

        isUni()
          ? navigate(`/university/pr/quesbank/topic/${id}`)
          : isCompany()
            ? navigate(`/company/pr/quesbank/topic/${id}`)
            : navigate(`/college/quesBank/topic/${id}`);
      }

      if (component === "save") {
        navigate(-1);
      }

      setToggle(1);
    } else {
      dispatch(
        editBankQuestionById({
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
  useEffect(() => {
    setCountDetail(currentTopic?.compiler?.length - 1);
  }, [currentTopic]);

  useEffect(() => {
    if (!ADD_QUESTION_LOADING) {
      let topic = JSON.parse(localStorage.getItem("currentTopic"));
      dispatch(setTotalTopicQuestions({ id :topic?._id, type: "compiler", level: "all" }));
    }
  }, [ADD_QUESTION_LOADING]);

  return (
    <div>
      <Header handleSave={handleSave} addType={addType}/>
      <div className="bg-white min-h-[90vh] mx-auto rounded-xl relative">
        <div className="flex flex-wrap gap-2 md:flex-nowrap ">
          <span className="w-1/2">
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
          <span className="w-1/2">
            <Code
              toggle={toggle}
              setToggle={setToggle}
              question={question}
              handleChanges={handleChanges}
              handleQuestionChange={handleQuestionChange}
              setQuestion={setQuestion}
              handleEditorChange={handleEditorChange}
              editorValue={editorValue}
              setEditorValue={setEditorValue}
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
                  className={`self-center justify-center flex bg-accent text-white py-2 px-4 rounded-md text-sm font-bold gap-2 ${countDetail >= 0 ? "" : "hidden"
                    }`}
                  onClick={handlePrev}
                >
                  <FaChevronLeft className="self-center" /> Prev
                </button>
              ) : (
                <button
                  className={`self-center justify-center flex bg-accent text-white py-2 px-4 rounded-md text-sm font-bold gap-2 ${count >= 0 ? "" : "hidden"
                    }`}
                  onClick={handlePrev}
                >
                  <FaChevronLeft className="self-center" /> Prev
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
