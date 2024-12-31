import React, { useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import {
  addFindAns,
  addFindAnsToTopic,
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

  addType,
  save,
  section,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { test, ADD_QUESTION_LOADING } = useSelector((state) => state.test);
  const [searchParams, setSearchParams] = useSearchParams();
  const level = searchParams.get("level");

  const handleSave = () => {
    !ADD_QUESTION_LOADING && save("save");
  };

  const { totalTopicQuestions } = useSelector((state) => state.test);

  useEffect(() => {
    if (id) {
      dispatch(setTotalTopicQuestions({ id, type: "findAnswer", level }));
    }
  }, [id, ""]);

  return (
    <div className="flex w-full mx-auto justify-between mb-5 ">
      <div className="flex gap-3">
        <button
          className="self-center object-center rounded-lg h-10 w-10 "
          onClick={() => navigate(-1)}
        >
          <FaChevronLeft className=" p-3 rounded-lg h-10 w-10 self-center bg-[#D9E1E7]" />
        </button>
        <h2 className="text-xl md:text-[28px] font-bold self-center font-dmSans text-[#171717]">
          Question No : {totalTopicQuestions + 1}
        </h2>
      </div>

      <div className="flex gap-3">
        <button
          className="bg-accent self-center text-white rounded-lg h-10 w-10 sm:w-32 flex items-center justify-center"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>{" "}
        <button
          className="bg-accent self-center text-white rounded-lg h-10 w-10 sm:w-32 flex items-center justify-center"
          onClick={() => handleSave("save")}
        >
          {ADD_QUESTION_LOADING ? "Saving" : "Save"}
          {ADD_QUESTION_LOADING && <Loader size="sm" />}
        </button>
      </div>
    </div>
  );
};

export default Header;
