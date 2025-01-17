import React, { useEffect } from "react";
import { FaAngleLeft, FaChevronLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Loader from "../../../loaders/Loader";
import toast from "react-hot-toast";
import {
  addQuestionToTopic,
  setTotalTopicQuestions,
  uploadQuestionImage,
} from "../../../../redux/college/test/thunks/topic";
import { editBankQuestionById } from "../../../../redux/college/test/thunks/question";
import isCompany, { isUni } from "../../../../util/isCompany";

const Header = ({ question, setQuestion, id, type, addType, image, file }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { test, ADD_QUESTION_LOADING, totalTopicQuestions } = useSelector(
    (state) => state.test
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const level = searchParams.get("level");
  // //console.log(question);
  const handleSave = async () => {
    let res = "";
    if (image && file) {
      const req = await dispatch(uploadQuestionImage(file));

      res = req.payload.secure_url;
    }
    if (addType === "topic") {
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
      } else if (question.Duration == 0) {
        toast.error("Please enter required time");
        return;
      } else if (question.AnswerIndex === null) {
        toast.error("Please select correct answer");
        return;
      } else {
        await dispatch(
          addQuestionToTopic({
            data: { ...question, image: res },
            id: id,
            type: type,
          })
        ).then(() => {
          if (!ADD_QUESTION_LOADING) {
            // //console.log("calling 2 --", ADD_QUESTION_LOADING);
            isUni()
              ? navigate(`/university/pr/quesBank/topic/${id}`)
              : isCompany()
              ? navigate(`/company/pr/quesBank/topic/${id}`)
              : navigate(`/college/quesBank/topic/${id}`);
          }
        });
        setQuestion({ Title: "", Options: [], Duration: 0, AnswerIndex: null });
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
        await dispatch(
          editBankQuestionById({
            type: "mcq",
            id: question._id,
            question: { ...question, image: res },
          })
        );
        // //console.log("ok");
        navigate(-1);
      }
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(setTotalTopicQuestions({ id, type: "mcq", level: "all" }));
    }
  }, [id, ""]);
  return (
    <div className="flex w-full mx-auto justify-between mb-6">
      <div className="flex gap-3">
        <button
          className="bg-white border self-center rounded-md p-2 hover:shadow-md transition-shadow duration-300 hover:border-gray-500"
          onClick={() => navigate(-1)}
        >
          <FaAngleLeft className="h-5 w-5" />
        </button>
        <h2 className="text-xl md:text-[28px] font-bold self-center font-dmSans text-[#171717]">
          Question No : {totalTopicQuestions + 1}
        </h2>
      </div>

      <div className="flex gap-3">
        <button
          className="bg-accent self-center text-white rounded-md h-10 w-10 sm:w-32 flex items-center justify-center"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>{" "}
        <button
          className="bg-accent self-center text-white rounded-md h-10 w-10 sm:w-32 flex items-center justify-center"
          onClick={handleSave}
        >
          {ADD_QUESTION_LOADING ? "Saving" : "Save"}
          {ADD_QUESTION_LOADING && <Loader size="sm" />}
        </button>
      </div>
    </div>
  );
};

export default Header;
