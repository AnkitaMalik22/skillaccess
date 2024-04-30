import React, { useEffect, useState } from "react";
import Header from "./Header";
import ReactQuill from "react-quill"; // Import ReactQuill
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { FaX } from "react-icons/fa6";
import { FaChevronLeft, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  setTest,
  setMcq,
  addMcq,
} from "../../../../redux/collage/test/testSlice";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const AddMcq = () => {
  const { topics,ADD_QUESTION_LOADING } = useSelector((state) => state.test);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // section Id
  const { id } = useParams();

  const [step, setStep] = useState(1);
  const [isPrev, setIsPrev] = useState(false);
  const [search, setSearch] = useSearchParams();

  const section = search.get("topicId");
  const [searchParams, setSearchParams] = useSearchParams();

  const level = searchParams.get("level");
  console.log(section);
  const [question, setQuestion] = useState({
    QuestionLevel: level === "adaptive" ? "beginner" : level,
    id: search.get("topicId") + Date.now(),
    section: search.get("topicId"),
    Duration: 0,
    Title: "",
    Options: [],
    QuestionType: "",
    AnswerIndex: null,
  });

  const [count, setCount] = useState(topics[id].questions.length - 1);
  const handlePrev = () => {
    setIsPrev(true);
    let current = topics[id].questions[count];
    setQuestion({ ...current, Duration: parseInt(current.Duration) });
    setCount((prev) => {
      if (prev - 1 >= 0) return prev - 1;
      return -1;
    });
  };

  const handleChanges = (e) => {
    // console.log(question);
    if (e.target.name === "Title") {
      setQuestion((prev) => {
        // console.log({ ...prev, Title: e.target.value });
        return { ...prev, Title: e.target.value };
      });
    } else if (e.target.name === "Duration") {
      setQuestion((prev) => {
        return { ...prev, Duration: e.target.value };
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

  const handleAddQuestion = (type) => {
    console.log(
      question.Title,
      question.Title === "",
      question.Title.trim() === "",
      question.Title === null
    );
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
    } else if (question.Options.some((option) => option.trim() === "")) {
      toast.error("Please enter all options");
      return;
    } else if (question.Duration == 0) {
      toast.error("Please enter required time");
      return;
    } else if (question.AnswerIndex === null) {
      toast.error("Please select correct answer");
      return;
    } else {
      if (isPrev) {
        dispatch(
          addMcq({ question: question, id: id, prev: true, index: count + 1 })
        ).then(() => {

        setIsPrev(false);
        setQuestion({
          QuestionLevel: level === "adaptive" ? "beginner" : level,
          id: search.get("topicId") + Date.now(),
          Title: "",
          Options: [],
          Duration: 0,
          AnswerIndex: null,
          section: search.get("topicId"),
        })
        setCount(topics[id].questions.length - 1)
        if (type === "save") {
          level === "adaptive"
            ? navigate(`/collage/test/selectAdaptive?level=${level}`)
            : navigate(`/collage/test/select?level=${level}`);
          
        }
        });
        
      } else {
        dispatch(addMcq({ question: question, id: id, prev: false })).then(()=>{
          console.log("calling 2 --" , ADD_QUESTION_LOADING)
          if (type === "save") 
          {
          level === "adaptive"
            ? navigate(`/collage/test/selectAdaptive?level=${level}`)
            : navigate(`/collage/test/select?level=${level}`);
          
          }
        })
        setQuestion({
          QuestionLevel: level === "adaptive" ? "beginner" : level,
          id: search.get("topicId") + Date.now(),
          Title: "",
          Options: [],
          Duration: 0,
          AnswerIndex: null,
          section: search.get("topicId"),
        });
       
        //   if(!ADD_QUESTION_LOADING){
        //    navigate(-1);
        //  }
        // console.log("ADD_QUESTION_LOADING",ADD_QUESTION_LOADING)
      
      
   
      }
    }
  };


  // useEffect(() => {
  //   console.log("ADD_QUESTION_LOADING 1",ADD_QUESTION_LOADING)
  // if(!ADD_QUESTION_LOADING){
  //       navigate(-1); 
  // }

  //   return () => {
  //     //navigate(-1);
  //   }
  // }
  // , [ADD_QUESTION_LOADING]);
    




  return (
    <div>
      <Header
        handleSave={handleAddQuestion}
        topics={topics}
        question={question}
        setQuestion={setQuestion}
        section={section}
        search={search}
        isPrev={isPrev}
        setIsPrev={setIsPrev}
      />
      <div className="bg-white min-h-[90vh] w-[98%] mx-auto rounded-xl pt-4">
        <div className="flex flex-wrap gap-2 sm:w-[95.7%] mx-auto ">
          <span className="w-[49%] ">
            <h2 className="font-bold mb-2">Question</h2>
            <div className="flex w-full justify-between">
            <select
              name="Duration"
              onChange={handleChanges}
              value={question.Duration}
              id=""
              className={`${
                level === "adaptive" ? "w-[65%]" : "w-full"
              } rounded-lg bg-gray-100 focus:outline-none border-none mb-4  select text-gray-400`}
            >
              <option value={0}>Time to answer the question</option>

              <option value={1}>1 minute</option>
              <option value={2}>2 minutes</option>
              <option value={3}>3 minutes</option>
              <option value={4}>4 minutes</option>
            </select>
            {level === "adaptive" && (
              <select
                name="Level"
                // onChange={handleChanges}
                // value={question.Duration}
                id=""
                className="w-[30%] rounded-lg bg-gray-100 focus:outline-none border-none mb-4  select text-gray-400"
              >
                <option value="">Level</option>

                <option value={"beginner"}>Beginner</option>
                <option value={"intermediate"}>Intermediate</option>
                <option value={"advanced"}>Advanced</option>
              </select>
            )}
            </div>
            <ReactQuill
              value={question.Title}
              onChange={(value) =>
                setQuestion((prev) => {
                  // console.log({ ...prev, Title: e.target.value });
                  return { ...prev, Title: value };
                })
              }
              className="bg-gray-100 border-none focus:outline-none rounded-lg focus:ring-0 placeholder-gray-400"
              placeholder="Enter Question Here"
              name="Title"
            />
          </span>
          <span className="w-[49%]">
            <h2 className="font-bold mb-2">Test description</h2>
            <div className="w-11/12 flex flex-col gap-2">
              <div className="px-5 pb-4 flex flex-col gap-4">
                {/* mcq option wrapper */}
                <span className="flex gap-2">
                  {/*  */}
                  {/* radio button */}
                  <div className="flex w-5 justify-center">
                    <input
                      type="radio"
                      name="Answer"
                      id="option1"
                      value={0}
                      checked={parseInt(question.AnswerIndex) === 0}
                      onChange={handleChanges}
                      className="w-3 h-3 p-[.4rem] checked:bg-none  checked:border checked:border-blue-700 border-blued checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center "
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
                    className="w-11/12 rounded-lg border-none outline-none focus:outline-none bg-gray-100"
                  />

                  {/*  */}
                  <div
                    className="bg-gray-100 flex justify-center rounded-lg "
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
                </span>

                <span className="flex gap-2">
                  {/*  */}
                  {/* radio button */}
                  <div className="flex w-5 justify-center">
                    <input
                      type="radio"
                      name="Answer"
                      id="option3"
                      checked={parseInt(question.AnswerIndex) === 1}
                      value={1}
                      onChange={handleChanges}
                      className="w-3 h-3 p-[.4rem] checked:bg-none  checked:border checked:border-blue-700 border-blued checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center "
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
                    className="w-11/12 rounded-lg border-none outline-none focus:outline-none bg-gray-100"
                  />

                  {/*  */}
                  <div
                    className="bg-gray-100 flex justify-center rounded-lg "
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
                </span>

                <span className="flex gap-2">
                  {/*  */}
                  {/* radio button */}
                  <div className="flex w-5 justify-center">
                    <input
                      type="radio"
                      name="Answer"
                      id="option3"
                      checked={parseInt(question.AnswerIndex) === 2}
                      value={2}
                      onChange={handleChanges}
                      className="w-3 h-3 p-[.4rem] checked:bg-none  checked:border checked:border-blue-700 border-blued checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center "
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
                    className="w-11/12 rounded-lg border-none outline-none focus:outline-none bg-gray-100"
                  />

                  {/*  */}
                  <div
                    className="bg-gray-100 flex justify-center rounded-lg "
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
                </span>

                <span className="flex gap-2">
                  {/*  */}
                  {/* radio button */}
                  <div className="flex w-5 justify-center">
                    <input
                      checked={parseInt(question.AnswerIndex) === 3}
                      type="radio"
                      name="Answer"
                      id="option3"
                      value={3}
                      onChange={handleChanges}
                      className="w-3 h-3 p-[.4rem] checked:bg-none  checked:border checked:border-blue-700 border-blued checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center "
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
                    className="w-11/12 rounded-lg border-none outline-none focus:outline-none bg-gray-100"
                  />

                  {/*  */}
                  <div
                    className="bg-gray-100 flex justify-center rounded-lg "
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
                </span>
                {/* add button and shuffle container */}
                <div className="flex justify-between">
                  {/* <button className="flex w-1/5 bg-gray-100 rounded-xl  font-boldgap-2 justify-center py-3">
                    <FaPlus className="self-center" /> Add
                  </button> */}
                  {/* <span className="self-center">
                    <input type="checkbox" className="mr-2" />{" "}
                    <label className="">Shuffle Answers</label>
                  </span> */}
                </div>
              </div>
            </div>
          </span>
        </div>
        <div className="absolute bottom-10 flex right-8 gap-2">
          {" "}
          <div className=" flex gap-2">
            <button
              className={`${
                count > 0 ? "" : "hidden "
              } self-center justify-center flex ${
                step === 1 ? " bg-gray-200" : " bg-blue-200"
              } p-2 rounded-lg text-sm font-bold gap-2 w-32`}
              onClick={handlePrev}
              // onClick={() => navigate(-1)}
            >
              <FaChevronLeft className="self-center" /> Prev
            </button>
          </div>
          <div className=" flex">
            <button
              className="self-center justify-center flex bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-bold gap-2 "
              // onClick={addQuestion}
              onClick={handleAddQuestion}
            >
              <FaPlus className="self-center" /> Add Next Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMcq;
