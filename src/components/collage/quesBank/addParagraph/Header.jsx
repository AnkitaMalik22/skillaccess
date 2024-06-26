import React,{useEffect} from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import {
  addFindAns,
  addFindAnsToTopic,
  addQuestionToTopic,
} from "../../../../redux/collage/test/testSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../loaders/Loader";
import { setTotalTopicQuestions } from "../../../../redux/collage/test/thunks/topic";

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
  const {totalTopicQuestions} = useSelector((state) => state.test);

  useEffect(() => {
    if (id) {
      dispatch(setTotalTopicQuestions({ id, type: "findAnswer" ,level:"all" }));
    }
  }, [id,""]);
  return (
    // <div className="flex w-[98%] mx-auto justify-between mb-2 mt-5">
    //   <div className="h-fit self-center">
    //     <button className="flex self-center ml-2 rounded-lg  gap-2">
    //       {addType === "topic" && (
    //         <button
    //           onClick={() => navigate(-1)}
    //           className=" mr-3 self-center bg-white rounded-lg "
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
    //         className="self-center w-24  justify-center flex text-blue-800 py-2 px-4 rounded-xl font-bold gap-2 bg-white"
    //         onClick={() => navigate(-1)}
    //       >
    //         Cancel
    //       </button>
    //       <button
    //         className="self-center w-32 justify-center flex bg-blue-700 py-2 font-bold px-4 rounded-xl gap-2 text-white"
    //         onClick={() => handleSave("save")}
    //         // onClick={() => navigate("/collage/test/preview")}
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
