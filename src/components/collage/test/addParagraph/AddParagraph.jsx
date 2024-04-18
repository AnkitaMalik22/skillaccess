import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { FaChevronLeft, FaPlus } from "react-icons/fa";

import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { editQuestionById } from "../../../../redux/collage/test/thunks/question";
import {
  addFindAns,
  addFindAnsToTopic,
} from "../../../../redux/collage/test/testSlice";
import { addQuestionToTopic } from "../../../../redux/collage/test/thunks/topic";

const AddParagraph = () => {
  const MAX_QUESTIONS = 3;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const type = searchParams.get("type");
  const addType = searchParams.get("addType");
  let ID;
  searchParams.get("topicId") !== null
    ? (ID = searchParams.get("topicId"))
    : (ID = id);
  const [question, setQuestion] = useState({
    section: ID,
    id: ID + Date.now(),
    Title: "",
    Duration: 0,
    questions: [{ question: "" }],
  });

  const { topics, currentTopic } = useSelector((state) => state.test);
  const [isPrev, setIsPrev] = useState(false);

  const [count, setCount] = useState(topics[id]?.findAnswers.length - 1);

  const [countDetail, setCountDetail] = useState(-1);

  const handlePrev = () => {
    if (addType === "topic") {
      setIsPrev(true);
      let current = currentTopic.findAnswers[countDetail];
      current = JSON.stringify(current);
      current = JSON.parse(current);
      setQuestion({
        ...current,
        Duration: parseInt(current.Duration),
        questions: [...current.questions],
      });
      setCountDetail((prev) => {
        if (prev - 1 >= 0) return prev - 1;
        return -1;
      });
    } else {
      setIsPrev(true);
      let current = topics[id].findAnswers[count];
      setQuestion({ ...current, Duration: parseInt(current.Duration) });
      setCount((prev) => {
        if (prev - 1 >= 0) return prev - 1;
        return -1;
      });
    }
  };

  const handleChanges = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...question.questions];
    list[index][name] = value;
    setQuestion({ ...question, questions: list });
  };

  // React.useEffect(() => {
  //   console.log(question);
  // }, [question]);

  const handleSave = (type) => {
    if (addType === "topic") {
      if (!question.Title || question.Title.trim() === "" || question.Title === "<p><br></p>") {
        toast.error("Please enter the question");
      } else if (question.Duration == 0) {
        toast.error("Please enter required time");
        return;
      } else if (question.questions.some((q) => q.question === "")) {
        toast.error("Please enter all questions");
        return;
      } else {
        if (isPrev) {
          setCountDetail(currentTopic.findAnswers.length - 1);
          setIsPrev(false);
          //api call
          dispatch(
            editQuestionById({
              index: countDetail + 1,
              type: "findAnswer",
              id: question._id,
              question: question,
            })
          );

          setQuestion({
            Title: "",
            section: ID,
            questions: [{ question: "" }],
            Duration: 0,
            id: ID + Date.now(),
          });
        } else {
          dispatch(
            addFindAnsToTopic({ data: question, id: id, type: "findAnswer" })
          );
          dispatch(
            addQuestionToTopic({ data: question, id: id, type: "findAnswer" })
          );
          setQuestion({
            Title: "",
            section: ID,
            questions: [{ question: "" }],
            Duration: 0,
            id: ID + Date.now(),
          });
        }
      }
    } else {
      if (question.Title == "") {
        toast.error("Please enter the question");
      } else if (question.Duration == 0) {
        toast.error("Please enter required time");
        return;
      } else if (question.questions.some((q) => q.question === "")) {
        toast.error("Please enter all questions");
        return;
      } else {
        if (isPrev) {
          dispatch(
            addFindAns({
              data: question,
              id: id,
              type: "findAnswer",
              prev: true,
              index: count + 1,
            })
          );
          setCount(topics[id].findAnswers.length - 1);
          setQuestion({
            id: ID + Date.now(),
            Title: "",
            questions: [],
            Duration: 0,
            section: ID,
          });
          if (type === "save") navigate(-1);
        } else {
          dispatch(
            addFindAns({
              data: question,
              id: id,
              type: "findAnswer",
              prev: false,
              index: count + 1,
            })
          );
          if (type === "save") navigate(-1);
          // dispatch(addQuestionToTopic({ data: question, id: id, type: type }));
          setQuestion({
            id: ID + Date.now(),
            Title: "",
            questions: [],
            Duration: 0,
            section: ID,
          });
        }
      }
    }
  };

  useEffect(() => {
    setCountDetail(currentTopic?.findAnswers?.length - 1);
  }, [currentTopic]);
  return (
    <div>
      <Header
        save={handleSave}
        section={ID}
        question={question}
        setQuestion={setQuestion}
        id={id}
        type={type}
        addType={addType}
      />
      <div className="bg-white min-h-[90vh] w-[98%] mx-auto rounded-xl pt-4 font-dmSans">
        <div className=" sm:w-[95.7%] mx-auto ">
          <div className="w-[49%]">
            <h2 className="font-bold mb-2">Question</h2>
            <select
              name="Duration"
              onChange={handleChanges}
              value={question.Duration}
              id=""
              className="w-full rounded-lg bg-gray-100 focus:outline-none border-none mb-4  select text-gray-400"
            >
              <option value={0}>Time to answer the question</option>

              <option value={1}>1 minute</option>
              <option value={2}>2 minutes</option>
              <option value={3}>3 minutes</option>
              <option value={4}>4 minutes</option>
            </select>
          </div>

          <textarea
            className="resize-none w-full h-full text-lg bg-gray-100 border-none focus:outline-none rounded-lg focus:ring-0placeholder-gray-400 mb-6"
            placeholder="Enter Paragraph"
            name="Title"
            onChange={handleChanges}
            value={question.Title}
          ></textarea>

          {question.questions.map((ques, index) => (
            <div key={index} className="mb-4">
              <textarea
                className="resize-none w-full h-full text-lg bg-gray-100 border-none focus:outline-none  mb-3 rounded-lg focus:ring-0placeholder-gray-400"
                placeholder="Enter Question Here"
                name="question"
                value={question.questions[index].question}
                onChange={(e) => handleQuestionChange(e, index)}
              ></textarea>
            </div>
          ))}

          {/* <button className="bg-[#F2F2F2] text-black px-4 py-2 rounded-lg focus:outline-none"
            onClick={() => 
            >
              Add more
            </button> */}
        </div>

        {/* <Footer question={question}  setQues={setQuestion} handleSave={handleSave} /> */}
        <div className="pt-10 flex justify-between">
          <div className=" ml-8 mb-10">
            {" "}
            <div className=" flex">
              <button
                className="self-center justify-center flex bg-[#8F92A1] bg-opacity-10  py-3 px-4 rounded-xl text-sm font-bold gap-2 "
                onClick={() => {
                  if (question.questions.some((q) => q.question === "")) {
                    toast.error("Please enter all questions");
                    return;
                  } else if (question.questions.length >= MAX_QUESTIONS) {
                    toast.error("You can't add more than 3 questions");
                    return;
                  } else {
                    setQuestion({
                      ...question,
                      questions: [...question.questions, { question: "" }],
                    });
                  }
                }}
              >
                Add More
              </button>
            </div>
          </div>

          <div className=" mb-10 flex pr-8 gap-2">
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
                onClick={() => handleSave()}
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

export default AddParagraph;
