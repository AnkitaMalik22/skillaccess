import React, { useEffect } from "react";
import { FaAngleLeft, FaChevronLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import {
  addEssay,
  addEssayToTopic,
  addQuestionToTopic,
} from "../../../../redux/college/test/testSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Loader from "../../../loaders/Loader";
import { setTotalTopicQuestions } from "../../../../redux/college/test/thunks/topic";

const Header = ({
  question,
  setQuestion,
  id,
  type,
  addType,
  handleSave,
  isPrev,
  setIsPrev,
  count,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ADD_QUESTION_LOADING } = useSelector((state) => state.test);
  const [searchParams, setSearchParams] = useSearchParams();

  const level = searchParams.get("level");
  const handleSaveNext = () => {
    // handleSave()
    // navigate(-1);
  };
  const { totalTopicQuestions } = useSelector((state) => state.test);

  useEffect(() => {
    if (id) {
      dispatch(setTotalTopicQuestions({ id, type: "essay", level }));
    }
  }, [id, ""]);

  return (
    <div className="flex w-full mx-auto justify-between mb-5 ">
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
          onClick={() => {
            !ADD_QUESTION_LOADING && handleSave("save");
          }}
        >
          {ADD_QUESTION_LOADING ? "Saving" : "Save"}
          {ADD_QUESTION_LOADING && <Loader size="sm" />}
        </button>
      </div>
    </div>
  );
};

export default Header;
