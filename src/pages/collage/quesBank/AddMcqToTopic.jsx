import React, { useEffect, useState } from "react";
import Header from "../../../components/collage/quesBank/addMcqToTopic/Header";

import { FaX } from "react-icons/fa6";
import { FaChevronLeft, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill"; // Import ReactQuill
import "react-quill/dist/quill.snow.css"; // Import Quill styles

import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import toast from "react-hot-toast";
import {
  editBankQuestionById,
  editQuestionById,
} from "../../../redux/collage/test/thunks/question";
import {
  addQuestionToTopic,
  setTotalTopicQuestions,
} from "../../../redux/collage/test/thunks/topic";
import CircularLoader from "../../../components/CircularLoader";
import useTranslate from "../../../hooks/useTranslate";

const AddMcqToTopic = () => {
  //useTranslate();
  const { currentTopic, ADD_QUESTION_LOADING } = useSelector(
    (state) => state.test
  );

  const [loading, setLoading] = useState(false);
  const [isPrev, setIsPrev] = useState(false);
  const [countDetail, setCountDetail] = useState(-1);
  // const[level,setLevel]=useState("beginner");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type");
  const addType = searchParams.get("addType");
  const [question, setQuestion] = useState({
    QuestionLevel: "beginner",
    Duration: 0,
    id: id + Date.now(),
    Title: "",
    Options: [],
    QuestionType: "",
    AnswerIndex: null,
  });

  // section Id
  const { sectionId } = useParams();

  const [step, setStep] = useState(1);

  const handlePrev = () => {
    setIsPrev(true);
    let current = currentTopic?.questions[countDetail];

    setQuestion({ ...current, Duration: parseInt(current.Duration) || 0 });

    setCountDetail((prev) => {
      if (prev - 1 >= 0) return prev - 1;
      return -1;
    });
  };

  const handleChanges = (e) => {
    // //console.log(question);
    if (e.target.name === "Title") {
      setQuestion((prev) => {
        // //console.log({ ...prev, Title: e.target.value });
        return { ...prev, Title: e.target.value };
      });
    } else if (e.target.name === "Duration") {
      setQuestion((prev) => {
        return { ...prev, Duration: e.target.value };
      });
    } else if (e.target.name === "QuestionLevel") {
      setQuestion((prev) => {
        return { ...prev, QuestionLevel: e.target.value };
      });
    } else {
      switch (e.target.name) {
        case "Option1":
          setQuestion((prev) => {
            return {
              ...prev,
              "prev.Options": [
                ...prev.Options,
                (prev.Options[0] = e.target.value),
              ],
            };
          });
          break;

        case "Option2":
          setQuestion((prev) => {
            return {
              ...prev,
              "prev.Options": [
                ...prev.Options,
                (prev.Options[1] = e.target.value),
              ],
            };
          });
          break;
        case "Option3":
          setQuestion((prev) => {
            return {
              ...prev,
              "prev.Options": [
                ...prev.Options,
                (prev.Options[2] = e.target.value),
              ],
            };
          });
          break;

        case "Option4":
          setQuestion((prev) => {
            return {
              ...prev,
              "prev.Options": [
                ...prev.Options,
                (prev.Options[3] = e.target.value),
              ],
            };
          });
          break;

        default:
          setQuestion((prev) => {
            return {
              ...prev,
              AnswerIndex: e.target.value,
            };
          });
          break;
      }
    }
  };
  useEffect(() => {
    if (addType === "edit") {
      const ques = JSON.parse(localStorage.getItem("qbQues"));
      setQuestion(ques);
    }
  }, []);
  const handleQuestionSave = () => {
    if (addType === "topic") {
      {
        if (
          !question.Title ||
          question.Title.trim() === "" ||
          question.Title === "<p><br></p>"
        ) {
          toast.error("Please enter question");
          return;
        } else if (
          !question.Options[0] ||
          !question.Options[1] ||
          !question.Options[2] ||
          !question.Options[3]
        ) {
          toast.error("Please enter atleast 4 options");
          return;
        } else if (question.AnswerIndex === null) {
          toast.error("Please select correct answer");
          return;
        } else if (question.Options.some((option) => option.trim() === "")) {
          toast.error("Please enter all options");
          return;
        } else if (question.Duration == 0) {
          toast.error("Please enter required time");
          return;
        } else {
          if (isPrev) {
            //api call
            setIsPrev(false);
            setCountDetail(currentTopic?.questions?.length - 1);
            setLoading(true);
            dispatch(
              editQuestionById({
                index: countDetail + 1,
                type: "mcq",
                id: question._id,
                question: question,
              })
            ).then(() => setLoading(false));
            setQuestion({
              QuestionLevel: "beginner",
              Title: "",
              Options: [],
              id: id + Date.now(),
              Duration: 0,
              AnswerIndex: null,
            });
          } else {
            setLoading(true);
            setIsPrev(false);
            setCountDetail(currentTopic?.questions?.length - 1);
            dispatch(
              addQuestionToTopic({ data: question, id: id, type: type })
            ).then(() => {
              setLoading(false);
              // if(!ADD_QUESTION_LOADING){
              //   navigate(-1);
              // }
              setQuestion({
                QuestionLevel: "beginner",
                Title: "",
                Options: [],
                id: id + Date.now(),
                Duration: 0,
                AnswerIndex: null,
              });
            });

            // navigate(-1);
          }
        }
      }
    } else {
      if (
        !question.Title ||
        question.Title.trim() === "" ||
        question.Title === "<p><br></p>"
      ) {
        toast.error("Please enter question");
        return;
      } else if (
        !question.Options[0] ||
        !question.Options[1] ||
        !question.Options[2] ||
        !question.Options[3]
      ) {
        toast.error("Please enter atleast 4 options");
        return;
      } else if (question.AnswerIndex === null) {
        toast.error("Please select correct answer");
        return;
      } else if (question.Options.some((option) => option.trim() === "")) {
        toast.error("Please enter all options");
        return;
      } else if (question.Duration == 0) {
        toast.error("Please enter required time");
        return;
      } else {
        editBankQuestionById({
          type: "mcq",
          id: question._id,
          question: question,
        });
      }
    }
  };

  useEffect(() => {
    //console.log(currentTopic);
    setCountDetail(currentTopic?.questions?.length - 1);
  }, [currentTopic]);
  useEffect(() => {
    if (!ADD_QUESTION_LOADING) {
      dispatch(setTotalTopicQuestions({ id, type: "mcq", level: "all" }));
    }
  }, [ADD_QUESTION_LOADING]);

  return (
    <div>
      <Header
        question={question}
        setQuestion={setQuestion}
        id={id}
        type={type}
        addType={addType}
      />
      <div className="bg-white min-h-[90vh] mx-auto rounded-xl">
        <div className="flex md:flex-nowrap flex-wrap gap-5 mx-auto md:mb-40 mb-10">
          <div className="w-1/2">
            <h2 className="font-bold mb-4 text-xl text-[#3E3E3E]">Question</h2>
            <div className="flex gap-3 w-full justify-between mb-5">
              <select
                name="Duration"
                onChange={handleChanges}
                value={question.Duration}
                id=""
                className="w-3/5 rounded-xl bg-[#F8F8F9] focus:outline-none border-none select text-[#3E3E3E]"
              >
                <option value={0}>Time to answer the question</option>

                <option value={1}>1 minute</option>
                <option value={2}>2 minutes</option>
                <option value={3}>3 minutes</option>
                <option value={4}>4 minutes</option>
              </select>

              <select
                name="QuestionLevel"
                onChange={handleChanges}
                value={question.QuestionLevel}
                className="w-2/5 rounded-xl bg-[#F8F8F9] focus:outline-none border-none select text-[#3E3E3E]"
              >
                <option value="">Level</option>

                <option value={"beginner"}>Beginner</option>
                <option value={"intermediate"}>Intermediate</option>
                <option value={"advanced"}>Advanced</option>
              </select>
            </div>
            <ReactQuill
              value={question.Title}
              onChange={(value) =>
                setQuestion((prev) => {
                  // //console.log({ ...prev, Title: e.target.value });
                  return { ...prev, Title: value };
                })
              }
              className="bg-[#F8F8F9] border-none focus:outline-none rounded-xl focus:ring-0 placeholder-[#3E3E3E]"
              placeholder="Enter Question Here"
              name="Title"
            />
          </div>
          <div className="w-1/2">
            <h2 className="font-bold mb-4 text-xl text-[#3E3E3E]">
              Test Description
            </h2>
            <div className="flex flex-col gap-4">
              {/* mcq option wrapper */}
              <div className="flex gap-2">
                {/*  */}
                {/* radio button */}
                <div className="flex w-5 justify-center ">
                  <input
                    type="radio"
                    name="Answer"
                    id="option1"
                    value={0}
                    checked={parseInt(question.AnswerIndex) === 0}
                    onChange={handleChanges}
                    className="w-3 h-3 p-[.4rem] checked:bg-none cursor-pointer checked:border checked:border-blue-700 border-blued checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center "
                  />{" "}
                </div>
                {/* option input */}
                <input
                  type="text"
                  placeholder="option 1"
                  name="Option1"
                  value={
                    question.Options && question.Options.length > 0
                      ? question.Options[0]
                      : ""
                  }
                  onChange={handleChanges}
                  className="w-11/12 rounded-lg border-none outline-none focus:outline-none bg-[#171717] bg-opacity-5"
                />

                {/*  */}
                <div
                  className=" flex justify-center rounded-lg cursor-pointer "
                  onClick={() =>
                    setQuestion({
                      ...question,
                      "question.Options": [
                        ...question.Options,
                        (question.Options[0] = ""),
                      ],
                    })
                  }
                >
                  <FaX className="self-center mx-2" />
                </div>
              </div>

              <div className="flex gap-2">
                {/*  */}
                {/* radio button */}
                <div className="flex w-5 justify-center">
                  <input
                    type="radio"
                    name="Answer"
                    id="option3"
                    value={1}
                    checked={parseInt(question.AnswerIndex) === 1}
                    onChange={handleChanges}
                    className="w-3 h-3 p-[.4rem] checked:bg-none cursor-pointer checked:border checked:border-blue-700 border-blued checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center "
                  />{" "}
                </div>
                {/* option input 2*/}
                <input
                  type="text"
                  placeholder="option 2"
                  name={`Option2`}
                  value={
                    question.Options && question.Options.length > 0
                      ? question.Options[1]
                      : ""
                  }
                  onChange={handleChanges}
                  className="w-11/12 rounded-lg border-none outline-none focus:outline-none bg-[#171717] bg-opacity-5"
                />

                {/*  */}
                <div
                  className="flex justify-center rounded-lg cursor-pointer "
                  onClick={() =>
                    setQuestion({
                      ...question,
                      "question.Options": [
                        ...question.Options,
                        (question.Options[1] = ""),
                      ],
                    })
                  }
                >
                  <FaX className="self-center mx-2" />
                </div>
              </div>

              <div className="flex gap-2">
                {/*  */}
                {/* radio button */}
                <div className="flex w-5 justify-center">
                  <input
                    type="radio"
                    name="Answer"
                    id="option3"
                    value={2}
                    checked={parseInt(question.AnswerIndex) === 2}
                    onChange={handleChanges}
                    className="w-3 h-3 p-[.4rem] checked:bg-none cursor-pointer  checked:border checked:border-blue-700 border-blued checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center "
                  />{" "}
                </div>
                {/* option input 3*/}
                <input
                  type="text"
                  placeholder="option 3"
                  name={`Option3`}
                  value={
                    question.Options && question.Options.length > 0
                      ? question.Options[2]
                      : ""
                  }
                  onChange={handleChanges}
                  className="w-11/12 rounded-lg border-none outline-none focus:outline-none bg-[#171717] bg-opacity-5"
                />

                {/*  */}
                <div
                  className=" flex justify-center rounded-lg cursor-pointer "
                  onClick={() =>
                    setQuestion({
                      ...question,
                      "question.Options": [
                        ...question.Options,
                        (question.Options[2] = ""),
                      ],
                    })
                  }
                >
                  <FaX className="self-center mx-2" />
                </div>
              </div>

              <div className="flex gap-2">
                {/*  */}
                {/* radio button */}
                <div className="flex w-5 justify-center">
                  <input
                    type="radio"
                    name="Answer"
                    id="option3"
                    value={3}
                    checked={parseInt(question.AnswerIndex) === 3}
                    onChange={handleChanges}
                    className="w-3 h-3 p-[.4rem] checked:bg-none cursor-pointer checked:border checked:border-blue-700 border-blued checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center "
                  />{" "}
                </div>
                {/* option input 4*/}
                <input
                  type="text"
                  placeholder="option 4"
                  name={`Option4`}
                  value={
                    question.Options && question.Options.length > 0
                      ? question.Options[3]
                      : ""
                  }
                  onChange={handleChanges}
                  className="w-11/12 rounded-lg border-none outline-none focus:outline-none bg-[#171717] bg-opacity-5"
                />

                {/*  */}
                <div
                  className=" flex justify-center rounded-lg cursor-pointer "
                  onClick={() =>
                    setQuestion({
                      ...question,
                      "question.Options": [
                        ...question.Options,
                        (question.Options[3] = ""),
                      ],
                    })
                  }
                >
                  <FaX className="self-center mx-2" />
                </div>
              </div>
              {/* add button and shuffle container */}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-5">
          {" "}
          <div className=" flex gap-2">
            {addType === "topic" && (
              <button
                className={`self-center justify-center cursor-pointer flex bg-[#8F92A1] text-[#171717] py-3 px-6 rounded-2xl text-sm font-bold gap-2 bg-opacity-10 ${
                  countDetail >= 0 ? "" : "hidden"
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
                className="self-center justify-center cursor-pointer flex bg-accent text-white  py-3 px-6 rounded-2xl text-sm font-bold gap-2 "
                // onClick={addQuestion}
                onClick={handleQuestionSave}
              >
                {/* {loading ? (
                  <CircularLoader />
                ) : (
                  <FaPlus className="self-center" />
                )}{" "} */}
                Add Next Question
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMcqToTopic;
