import React, { useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Loader from "../../../loaders/Loader";
import toast from "react-hot-toast";
import { addQuestionToTopic } from "../../../../redux/collage/test/thunks/topic";
import { editBankQuestionById } from "../../../../redux/collage/test/thunks/question";

const Header = ({ question, setQuestion, id, type, addType }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { test, ADD_QUESTION_LOADING } = useSelector((state) => state.test);
  const [searchParams, setSearchParams] = useSearchParams();

  const level = searchParams.get("level");
  console.log(question);
  const handleSave = () => {
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
        dispatch(
          addQuestionToTopic({ data: question, id: id, type: type })
        ).then(() => {
          if (!ADD_QUESTION_LOADING) {
            console.log("calling 2 --", ADD_QUESTION_LOADING);
            navigate(-1);
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
        dispatch(
          editBankQuestionById({
            type: "mcq",
            id: question._id,
            question: question,
          })
        );
        console.log("ok");
        navigate(-1);
      }
    }
  };

  return (
    <div className="flex w-full mx-auto justify-between mb-6">
      {/* comp */}
      <div className="flex gap-3">
        {addType === "topic" && (
          <button
            className="self-center object-center rounded-lg h-10 w-10 "
            onClick={() =>
              level === "adaptive"
                ? navigate(`/collage/test/selectAdaptive?level=${level}`)
                : navigate(`/collage/test/select?level=${level}`)
            }
          >
            <FaChevronLeft className=" p-3 rounded-lg h-10 w-10 self-center bg-gray-200" />
          </button>
        )}
        <h2 className="text-xl md:text-[28px] font-bold self-center font-dmSans text-[#171717]">
          Create Assessment
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

    // <div className="flex w-[98%] mx-auto justify-between mb-2 mt-5">
    //   <div className="h-fit self-center">
    //     <button className="flex self-center ml-2 rounded-lg  gap-2">
    //       {addType === "topic" && (
    //         <button
    //           onClick={() =>
    //             level === "adaptive"
    //               ? navigate(`/collage/test/selectAdaptive?level=${level}`)
    //               : navigate(`/collage/test/select?level=${level}`)
    //           }
    //           className=" mr-3 self-center bg-white rounded-lg "
    //         >
    //           <FaChevronLeft className=" p-3  h-10 w-10 self-center " />
    //         </button>
    //       )}

    //       <div className="self-center">
    //         <h2 className="sm:text-xl  text-left font-bold self-center text-3xl font-dmSans  text-black ">
    //           Create Assessment
    //         </h2>
    //       </div>
    //     </button>
    //   </div>

    //   <div className=" rounded-xl mx-2   h-12 flex my-2 font-dmSans ">
    //     <div className=" flex gap-2">
    //       <button
    //         className="self-center w-24  justify-center flex text-blue-800 py-2 px-4 rounded-xl font-bold gap-2 bg-white"
    //         onClick={() => {
    //           navigate(-1);
    //         }}
    //       >
    //         Cancel
    //       </button>
    //       <button
    //         className="self-center w-32 justify-center flex bg-blue-700 py-2 font-bold px-4 rounded-xl gap-2 text-white"

    //         onClick={handleSave}
    //       >
    //         {ADD_QUESTION_LOADING ? "Saving" : "Save"}
    //         {ADD_QUESTION_LOADING && <Loader size="sm" />}
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Header;
