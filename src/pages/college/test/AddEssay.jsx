import React, { useEffect, useState } from "react";
import Header from "../../../components/college/test/addEssay/Header";
import { FaChevronLeft, FaPlus } from "react-icons/fa";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { editQuestionById } from "../../../redux/college/test/thunks/question";
import {
  addEssay,
  addEssayToTopic,
} from "../../../redux/college/test/testSlice";
import { addQuestionToTopic } from "../../../redux/college/test/thunks/topic";
import CircularLoader from "../../../components/CircularLoader";
import useTranslate from "../../../hooks/useTranslate";
import { setTotalTopicQuestions } from "../../../redux/college/test/thunks/topic";

const AddEssay = () => {
  //useTranslate();
  const { id } = useParams();
  //prev count
  const [loading, setLoading] = useState(false);
  const { topics, currentTopic, ADD_QUESTION_LOADING } = useSelector(
    (state) => state.test
  );
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
  const level = searchParams.get("level");
  const type = searchParams.get("type");
  const addType = searchParams.get("addType");
  let ID;
  searchParams.get("topicId") !== null
    ? (ID = searchParams.get("topicId"))
    : (ID = id);
  const [question, setQuestion] = useState({
    QuestionLevel: level,
    section: ID,
    id: ID + Date.now(),
    Title: "",
    Duration: 0,
  });

  const handleChanges = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const handleSave = async (saveType) => {
    if (addType === "topic") {
      if (
        !question.Title ||
        question.Title.trim() === "" ||
        question.Title === "<p><br></p>"
      ) {
        toast.error("Please enter the question");
      } else if (question.Duration === 0) {
        toast.error("Please enter required time");
        return;
      } else {
        if (isPrev) {
          //dispatch api call to update by ID
          setLoading(true);
          await dispatch(
            editQuestionById({
              index: countDetail + 1,
              type: "essay",
              id: question._id,
              question: question,
            })
          );
          await setCountDetail(currentTopic?.essay?.length - 1);

          await setQuestion({
            Title: "",
            Duration: 0,
            id: id + Date.now(),
            QuestionLevel: level,
          });
          setLoading(false);
        } else {
          setLoading(true);
          await dispatch(
            addEssayToTopic({ data: question, id: id, type: type })
          );
          await dispatch(
            addQuestionToTopic({ data: question, id: id, type: type })
          );
          await setQuestion({
            Title: "",
            Duration: 0,
            id: id + Date.now(),
            QuestionLevel: level,
          });
          setLoading(false);
          if (!ADD_QUESTION_LOADING) {
            if (saveType === "save") navigate(-1);
          }
        }
      }
    } else {
      if (question.Title === "") {
        toast.error("Please enter the question");
      } else if (question.Duration === 0) {
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
          ).then(() => {
            setCount(topics[id].essay.length - 1);
            setQuestion({
              QuestionLevel: level,

              id: ID + Date.now(),
              Title: "",
              Duration: 0,
              section: ID,
            });
            if (!ADD_QUESTION_LOADING) {
              if (saveType === "save") navigate(-1);
            }
          });
        } else {
          await dispatch(
            addEssay({ data: question, id: id, type: type, prev: false })
          );
          await setIsPrev(false);
          await setCount(topics[id].essay.length - 1);
          await setQuestion({
            QuestionLevel: level,

            id: ID + Date.now(),
            Title: "",
            Duration: 0,
            section: ID,
          });
          if (!ADD_QUESTION_LOADING) {
            if (saveType === "save") navigate(-1);
          }
        }
      }
    }
  };

  useEffect(() => {
    setCountDetail(currentTopic?.essay?.length - 1);
  }, [currentTopic]);
  useEffect(() => {
    if (!ADD_QUESTION_LOADING) {
      dispatch(setTotalTopicQuestions({ id, type: "essay", level }));
    }
  }, [ADD_QUESTION_LOADING]);

  return (
    <>
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
      <div className="bg-white min-h-[90vh] mx-auto rounded-xl ">
        <div className=" mx-auto ">
          <div className="w-1/2">
            <h2 className="font-bold mb-2 text-lg">Question</h2>
            <select
              name="Duration"
              onChange={handleChanges}
              value={question.Duration}
              id=""
              className="w-full rounded-md bg-gray-100 focus:outline-none border-none mb-4  select text-gray-400"
            >
              <option value={0}>Time to answer the question</option>

              <option value={1}>1 minute</option>
              <option value={2}>2 minutes</option>
              <option value={3}>3 minutes</option>
              <option value={4}>4 minutes</option>
            </select>
          </div>

          <textarea
            className="resize-none w-full h-full text-lg bg-gray-100 border-none focus:outline-none rounded-md focus:ring-0placeholder-gray-400"
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
                <FaChevronLeft className="self-center" /> Prev
              </button>
            )}
          </div>
          <div className=" flex">
            <button
              className="self-center justify-center flex bg-accent text-white py-2 px-4 rounded-md text-sm font-bold gap-2 "
              onClick={() => {
                if (!loading) handleSave();
              }}
            >
              {/* {loading ? (
                <CircularLoader />
              ) : (
                <FaPlus className="self-center" />
              )}{" "} */}
              Add Next Question
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEssay;
