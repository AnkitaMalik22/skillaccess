import React, { useEffect, useState } from "react";
import Header from "../../../components/college/quesBank/addEssay/Header";
import { FaChevronLeft, FaPlus } from "react-icons/fa";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  editBankQuestionById,
  editQuestionById,
} from "../../../redux/college/test/thunks/question";
import {
  addEssay,
  addEssayToTopic,
} from "../../../redux/college/test/testSlice";
import { addQuestionToTopic,setTotalTopicQuestions } from "../../../redux/college/test/thunks/topic";
import CircularLoader from "../../../components/CircularLoader";
import useTranslate from "../../../hooks/useTranslate";
import { isUni } from "../../../util/isCompany";


const AddEssay = () => {
  //useTranslate();
  const { id } = useParams();

  //prev count
  const { topics, currentTopic, ADD_QUESTION_LOADING } = useSelector(
    (state) => state.test
  );
  const [loading, setLoading] = useState(false);
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
    QuestionLevel: "beginner",
    section: ID,
    id: ID + Date.now(),
    Title: "",
    Duration: 0,
  });

  const handleChanges = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (addType === "edit") {
      const ques = JSON.parse(localStorage.getItem("qbQues"));
      setQuestion(ques);
    }
  }, []);

  const handleSave = async (saveType) => {
    if (addType === "topic") {
      if (
        !question.Title ||
        question.Title.trim() === "" ||
        question.Title === "<p><br></p>"
      ) {
        toast.error("Please enter the question");
      } else if (question.Duration == 0) {
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
            QuestionLevel: "beginner",
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
            QuestionLevel: "beginner",
          });
          setLoading(false);
          if (!ADD_QUESTION_LOADING) {
            if (saveType === "save") navigate(isUni() ? "/university/pr/quesbank/topic/${id}" : `/college/quesBank/topic/${id}`);
          }
        }
      }
    } else {
      if (
        !question.Title ||
        question.Title.trim() === "" ||
        question.Title === "<p><br></p>"
      ) {
        toast.error("Please enter the question");
      } else if (question.Duration == 0) {
        toast.error("Please enter required time");
        return;
      } else {
        dispatch(
          editBankQuestionById({
            type: "essay",
            id: question._id,
            question: question,
          })
        );
        navigate(-1);
      }
    }
  };

  useEffect(() => {
    setCountDetail(currentTopic?.essay?.length - 1);
  }, [currentTopic]);

  useEffect(() => {
    if (!ADD_QUESTION_LOADING) {
      dispatch(setTotalTopicQuestions({ id, type: "essay" ,level : "all"}));
    }
  }, [ADD_QUESTION_LOADING]);

  return (
    <div>
      <Header
        save={handleSave}
        topics={topics}
        isPrev={isPrev}
        setIsPrev={setIsPrev}
        question={question}
        setQuestion={setQuestion}
        id={id}
        type={type}
        addType={addType}
      />
      <div className="bg-white min-h-[90vh] mx-auto rounded-xl">
        <div>
          <div className="w-1/2">
            <h2 className="font-bold mb-4 text-xl text-[#3E3E3E]">Question</h2>
            <div className="gap-3 flex mb-4">
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
          </div>

          <textarea
            className="resize-none w-full h-full md:h-[250px] rounded-xl bg-[#F8F8F9] focus:outline-none border-none  text-[#3E3E3E] placeholder:text-[#3E3E3E]"
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
                className={`self-center justify-center flex bg-accent text-white py-2 px-4 rounded-lg text-sm font-bold gap-2 ${
                  countDetail >= 0 ? "" : "hidden"
                }`}
                onClick={handlePrev}
              >
                <FaChevronLeft className="self-center" /> Prev
              </button>
            ) : (
              <button
                className={`self-center justify-center flex bg-accent text-white py-2 px-4 rounded-lg text-sm font-bold gap-2 ${
                  count >= 0 ? "" : "hidden"
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
                className="self-center justify-center flex bg-accent text-white py-2 px-4 rounded-lg text-sm font-bold gap-2 "
                onClick={() => handleSave()}
              >
                {/* {loading ? (
                  <CircularLoader />
                ) : ( */}
                  <FaPlus className="self-center" />
                {/* )}{" "} */}
                Add Next Question
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEssay;
