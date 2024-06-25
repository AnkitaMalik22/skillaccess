import React, { useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Loader from "../../../loaders/Loader";
import toast from "react-hot-toast";
import { addQuestionToTopic } from "../../../../redux/collage/test/thunks/topic";
import { setTotalTopicQuestions } from "../../../../redux/collage/test/thunks/topic";


const Header = ({ question, setQuestion, id, type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { test, ADD_QUESTION_LOADING } = useSelector((state) => state.test);
  const [searchParams, setSearchParams] = useSearchParams();

  const level = searchParams.get("level");

  const handleSave = () => {
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
      dispatch(addQuestionToTopic({ data: question, id: id, type: type })).then(
        () => {
          if (!ADD_QUESTION_LOADING) {
            console.log("calling 2 --", ADD_QUESTION_LOADING);
            level === "adaptive"
              ? navigate(`/collage/test/selectAdaptive?level=${level}`)
              : navigate(-1);
          }
        }
      );
      setQuestion({ Title: "", Options: [], Duration: 0, AnswerIndex: null });
    }
  };


  const {totalTopicQuestions} = useSelector((state) => state.test);

  useEffect(() => {
    if (id) {
      dispatch(setTotalTopicQuestions({ id, type: "mcq" ,level }));
    }
  }, [id,""]);

  return (
    <div className="flex w-full mx-auto justify-between mb-5">
      <div className="flex gap-3">
        <button
          className="self-center object-center rounded-lg h-10 w-10 "
          onClick={() => navigate(-1)}
        >
          <FaChevronLeft className=" p-3 rounded-lg h-10 w-10 self-center bg-[#D9E1E7]" />
        </button>
        <h2 className="text-xl md:text-[28px] font-bold self-center font-dmSans text-[#171717]">
        Question No : {totalTopicQuestions+1}
        </h2>
      </div>

      <div className="flex gap-3">
        <button
          className="bg-[#0052CC] self-center text-white rounded-lg h-10 w-10 sm:w-32 flex items-center justify-center"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>{" "}
        <button
          className="bg-[#0052CC] self-center text-white rounded-lg h-10 w-10 sm:w-32 flex items-center justify-center"
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
