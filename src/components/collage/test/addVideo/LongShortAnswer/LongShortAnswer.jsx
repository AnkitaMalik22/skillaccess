import React, { useEffect, useState } from "react";

import Header from "./Header";

import { useDispatch, useSelector } from "react-redux";

import { addVideo } from "../../../../../redux/collage/test/testSlice";

import { FaX } from "react-icons/fa6";

import { FaChevronLeft, FaPlus } from "react-icons/fa";

import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const LongShortAnswer = () => {
  const navigate = useNavigate();
  const { TopicToBeAdded } = useSelector((state) => state.test);
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const { id } = useParams();

  const type = searchParams.get("type");

  const addType = searchParams.get("addType");

  const LongShort = searchParams.get("length");

  const [question, setQuestion] = useState({
    id: `${Date.now()}`,

    Title: "",

    Duration: 0,
  });
  const [count, setCount] = useState(-1);
  useEffect(() => {
    if (LongShort === "short") {
      setCount(TopicToBeAdded.video.short.length - 1);
    } else {
      setCount(TopicToBeAdded.video.long.length - 1);
    }
  }, [TopicToBeAdded]);
  const [isPrev, setIsPrev] = useState(false);

  const handlePrev = () => {
    setIsPrev(true);
    if (LongShort === "short") {
      setQuestion(TopicToBeAdded.video.short[count]);
    } else {
      setQuestion(TopicToBeAdded.video.long[count]);
    }

    setCount((prev) => {
      if (prev - 1 > 0) return prev - 1;
      return -1;
    });
  };
  const handleChanges = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
    if (e.target.name === "Duration") {
      setQuestion((prev) => {
        return { ...prev, Duration: e.target.value };
      });
    }
  };

  const handleSave = () => {
    console.log(question);

    if (LongShort === "short") {
      if (question.Title == "" || question.Title.trim() === "" || question.Title === "<p><br></p>") {
        toast.error("Please enter the question");
      } else if (question.Duration == 0) {
        toast.error("Please enter required time");
        return;
      } else {
        if (isPrev) {
          dispatch(addVideo({ short: question, prev: true, index: count + 1 }));
          setIsPrev(false);
          setCount(TopicToBeAdded.video.short.length - 1);
          setQuestion({
            id: `${Date.now()}`,

            Title: "",

            Duration: 0,
          });
        } else {
          dispatch(addVideo({ short: question, prev: false }));

          setQuestion({
            id: `${Date.now()}`,

            Title: "",

            Duration: 0,
          });
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
          dispatch(addVideo({ long: question, prev: true, index: count + 1 }));
          setIsPrev(false);
          setCount(TopicToBeAdded.video.long.length - 1);
          setQuestion({
            id: `${Date.now()}`,

            Title: "",

            Duration: 0,
          });
        } else {
          dispatch(addVideo({ long: question, prev: false }));

          // dispatch(addQuestionToTopic({ data: question, id: id, type: type }));

          setQuestion({
            id: `${Date.now()}`,

            Title: "",

            Duration: 0,
          });
        }
      }
    }
  };

  return (
    <div>
      <Header
        handleSave={handleSave}
        question={question}
        setQuestion={setQuestion}
        id={id}
        type={type}
        addType={addType}
        LongShort={LongShort}
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
            value={question.Title}
            onChange={handleChanges}
          ></textarea>
        </div>

        <div className="absolute bottom-10 flex right-8 gap-2">
          {" "}
          <div className=" flex gap-2">
            {count >= 0 && (
              <button
                className="self-center justify-center flex bg-gray-200 p-2 rounded-lg text-sm font-bold gap-2 w-32"
                onClick={handlePrev}
              >
                <FaChevronLeft className="self-center" /> Prev
              </button>
            )}
          </div>
          <div className=" flex">
            <button
              className="self-center justify-center flex bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-bold gap-2 "
              onClick={handleSave}
            >
              <FaPlus className="self-center" /> Add Next Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LongShortAnswer;
