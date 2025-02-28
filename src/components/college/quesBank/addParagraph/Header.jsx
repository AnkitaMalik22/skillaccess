import React, { useEffect } from "react";
import { FaAngleLeft, FaChevronLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import {
  addFindAns,
  addFindAnsToTopic,
  addQuestionToTopic,
} from "../../../../redux/college/test/testSlice";
import { useDispatch, useSelector } from "react-redux";
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
  const handleSave = () => {
    save("save");
  };
  const { totalTopicQuestions } = useSelector((state) => state.test);

  useEffect(() => {
    if (id) {
      let topic = JSON.parse(localStorage.getItem("currentTopic"));
      dispatch(
        setTotalTopicQuestions({ id :topic?._id, type: "findAnswer", level: "all" })
      );
    }
  }, [id, ""]);
  return (
    // <div className="flex w-[98%] mx-auto justify-between mb-2 mt-5">
    //   <div className="h-fit self-center">
    //     <button className="flex self-center ml-2 rounded-md  gap-2">
    //       {addType === "topic" && (
    //         <button
    //           onClick={() => navigate(-1)}
    //           className=" mr-3 self-center bg-white rounded-md "
    //         >
    //           <FaChevronLeft className=" p-3  h-10 w-10 self-center " />
    //         </button>
    //       )}

    //       <div className="self-center">
    //         <h2 className="sm:text-xl  text-left font-bold self-center text-3xl font-dmSans   ">
    //           Create Assessment
    //         </h2>
    //       </div>
    //     </button>
    //   </div>

    //   <div className=" rounded-xl mx-2   h-12 flex my-2 font-dmSans ">
    //     <div className=" flex gap-2">
    //       <button
    //         className="self-center w-24  justify-center flex text-bluedpy-2 px-4 rounded-xl font-bold gap-2 bg-white"
    //         onClick={() => navigate(-1)}
    //       >
    //         Cancel
    //       </button>
    //       <button
    //         className="self-center w-32 justify-center flex bg-accent py-2 font-bold px-4 rounded-xl gap-2 text-white"
    //         onClick={() => handleSave("save")}
    //         // onClick={() => navigate("/college/test/preview")}
    //       >
    //         {ADD_QUESTION_LOADING ? "Saving" : "Save"}
    //         {ADD_QUESTION_LOADING && <Loader size="sm" />}
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <div className="flex w-full mx-auto justify-between mb-6">
      <div className="flex gap-3">
        <button
          className="bg-white border self-center rounded-md p-2 hover:shadow-md transition-shadow duration-300 hover:border-gray-500"
          onClick={() => navigate(-1)}
        >
          <FaAngleLeft className="h-5 w-5" />
        </button>
        <h2 className="text-xl md:text-[28px] font-bold self-center font-dmSans text-[#171717]">
        {
            addType === "topic" ?  `Question No : ${totalTopicQuestions + 1 }`: `Edit Question`
          }
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
