import React, { useEffect, useState } from "react";
import Header from "./Header";

import { FaX } from "react-icons/fa6";
import { FaChevronLeft, FaPlus } from "react-icons/fa";

import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { editQuestionById } from "../../../../redux/collage/test/thunks/question";
import {
  addEssay,
  addEssayToTopic,
} from "../../../../redux/collage/test/testSlice";
import { addQuestionToTopic } from "../../../../redux/collage/test/thunks/topic";

const AddEssay = () => {
  const { id } = useParams();
  //prev count
  const { topics, currentTopic } = useSelector((state) => state.test);
  const [isPrev, setIsPrev] = useState(false);
  const [countDetail, setCountDetail] = useState(-1);
  const [count, setCount] = useState(topics[id]?.essay.length - 1);
  const handlePrev = () => {
    if (addType === "topic") {
      setIsPrev(true);
      let current = currentTopic.essay[countDetail];
      setQuestion({ ...current, Duration: parseInt(current.Duration) || 0 });
      setQuestion({ ...current, Duration: parseInt(current.Duration) } || 0);
      setCountDetail((prev) => {
        if (prev - 1 >= 0) return prev - 1;
        return -1;
      });
    } else {
      setIsPrev(true);
      let current = topics[id].essay[count];
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
  });

  const handleChanges = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (addType === "topic") {
      if (question.Title == "") {
        toast.error("Please enter the question");
      } else if (question.Duration == 0) {
        toast.error("Please enter required time");
        return;
      } else {
        if (isPrev) {
          //dispatch api call to update by ID
          dispatch(
            editQuestionById({
              index: countDetail + 1,
              type: "essay",
              id: question._id,
              question: question,
            })
          );
          setCountDetail(currentTopic.essay.length - 1);
          setQuestion({ Title: "", Duration: 0, id: id + Date.now() });
        } else {
          dispatch(addEssayToTopic({ data: question, id: id, type: type }));
          dispatch(addQuestionToTopic({ data: question, id: id, type: type }));
          setQuestion({ Title: "", Duration: 0, id: id + Date.now() });
        }
      }
    } else {
      if (question.Title == "") {
        toast.error("Please enter the question");
      } else if (question.Duration == 0) {
        toast.error("Please enter required time");
        return;
      } else {
        if (isPrev) {
          dispatch(
            addEssay({
              data: question,
              id: id,
              type: type,
              prev: true,
              index: count + 1,
            })
          );
          setCount(topics[id].essay.length - 1);
          setQuestion({
            id: ID + Date.now(),
            Title: "",
            Duration: 0,
            section: ID,
          });
        } else {
          dispatch(
            addEssay({ data: question, id: id, type: type, prev: false })
          );
          setIsPrev(false);
          setCount(topics[id].essay.length - 1);
          setQuestion({
            id: ID + Date.now(),
            Title: "",
            Duration: 0,
            section: ID,
          });
        }
      }
    }
  };

  useEffect(() => {
    setCountDetail(currentTopic.essay.length - 1);
  }, [currentTopic]);

  return (
    <div>
      <Header
        handleSave={handleSave}
        topics={topics}
        isPrev={isPrev}
        setIsPrev={setIsPrev}
        question={question}
        setQuestion={setQuestion}
        id={id}
        type={type}
        addType={addType}
      />
      <div className="bg-white min-h-[90vh] w-[98%] mx-auto rounded-xl pt-4">
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
            className="resize-none w-full h-full text-lg bg-gray-100 border-none focus:outline-none rounded-lg focus:ring-0placeholder-gray-400"
            placeholder="Enter Question Here"
            name="Title"
            onChange={handleChanges}
            value={question.Title}
          ></textarea>
        </div>

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
              onClick={() => handleSave()}
            >
              <FaPlus className="self-center" /> Add Next Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEssay;
