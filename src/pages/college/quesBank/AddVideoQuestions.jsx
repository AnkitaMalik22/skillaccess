import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/college/quesBank/addVideo/addSelect/Header";
import toast from "react-hot-toast";
import useTranslate from "../../../hooks/useTranslate";
import isCompany, { isUni } from "../../../util/isCompany";

const AddVideoQuestionsType = () => {
  //useTranslate();
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectQuestionType, setSelectQuestionType] = useState("");

  const NavHandler = () => {
    switch (selectQuestionType) {
      case "mcq":
        navigate(
          isUni()
            ? `/university/pr/quesBank/video/${id}/addmcq`
            : isCompany()
            ? `/company/pr/quesBank/video/${id}/addmcq`
            : `/college/quesBank/video/${id}/addmcq`
        );

        break;

      case "short":
        navigate(
          isUni()
            ? `/university/pr/quesBank/video/shortlong/${id}?length=short`
            : isCompany()
            ? `/company/pr/quesBank/video/shortlong/${id}?length=short`
            : `/college/quesBank/video/shortlong/${id}?length=short`
        );

        break;

      case "long":
        navigate(
          isUni()
            ? `/university/pr/quesBank/video/shortlong/${id}?length=long`
            : isCompany()
            ? `/company/pr/quesBank/video/shortlong/${id}?length=long`
            : `/college/quesBank/video/shortlong/${id}?length=long`
        );
        break;

      default:
        toast.error("please select field");

        break;
    }
  };

  return (
    <div className="text-sm font-bold">
      <Header selectQuestionType={selectQuestionType} />

      <div className="mt-5">
        {/* larger screens */}

        <div className="   my-2 rounded-md tracking-wide justify-between  ">
          <h2 className="font-normal text-sm sm:text-sm text-gray-400  mt-8 tracking-wide ">
            You can use three question types: multiple-choice, short and long
            answer.
          </h2>
        </div>

        <div className="  sm:mt-5 rounded-md tracking-wide  w-full ">
          {/* mcq */}

          <div
            className={`w-full flex justify-between bg-gray-100 rounded-md border  h-20 py-4 px-8  my-2  ${
              selectQuestionType === "mcq" ? "border-blued" : "opacity-70"
            }`}
            onClick={() => setSelectQuestionType("mcq")}
          >
            {" "}
            <div className="flex gap-5 font-dmSans w-1/3">
              <div className="w-5 h-5 self-center">
                <input
                  type="radio"
                  name="ques"
                  checked={selectQuestionType === "mcq"}
                  className={`w-3 h-3 p-[.4rem] checked:bg-none  checked:border checked:border-blue-700 border-blue-700 checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center `}
                  onClick={(e) => {
                    setSelectQuestionType("mcq");
                  }}
                />
              </div>

              <img
                src="/images/icons/exam.png"
                alt=""
                className="w-6 h-8 self-center"
              />

              <h2 className="text-xl font-normal self-center">
                Multiple Questions
              </h2>
            </div>
            {/*  */}
            <h2 className="text-xl font-normal self-center">
              One Correct Answer
            </h2>
            <div className=""></div>
            {/* <img
              src="/images/icons/dot.png"
              alt=""
              className="self-center w-5"
            /> */}
          </div>

          {/* Essay */}

          <div
            className={`w-full flex justify-between bg-gray-100 rounded-md border  h-20 py-4 px-8  my-2  ${
              selectQuestionType === "short" ? "border-blued" : "opacity-70"
            }`}
            onClick={() => setSelectQuestionType("short")}
          >
            {" "}
            <div className="flex gap-5 font-dmSans w-1/3">
              <div className="w-5 h-5 self-center">
                <input
                  type="radio"
                  checked={selectQuestionType === "short"}
                  name="ques"
                  className="w-3 h-3 p-[.4rem] checked:bg-none  checked:border checked:border-blue-700 border-blue-700 checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center "
                  onClick={() => setSelectQuestionType("short")}
                />
              </div>

              <img
                src="/images/icons/exam.png"
                alt=""
                className="w-6 h-8 self-center"
              />

              <h2 className="text-xl font-normal self-center">Short Answers</h2>
            </div>
            {/*  */}
            <h2 className="text-xl font-normal self-center">Answer in brief</h2>
            <div className=""></div>
            {/* <img
              src="/images/icons/dot.png"
              alt=""
              className="self-center w-5"
            /> */}
          </div>

          <div
            className={`w-full flex justify-between bg-gray-100 rounded-md border  h-20 py-4 px-8  my-2  ${
              selectQuestionType === "long" ? "border-blued" : "opacity-70"
            }`}
            onClick={() => setSelectQuestionType("long")}
          >
            {" "}
            <div className="flex gap-5 font-dmSans w-1/3">
              <div className="w-5 h-5 self-center">
                <input
                  type="radio"
                  checked={selectQuestionType === "long"}
                  name="ques"
                  className="w-3 h-3 p-[.4rem] checked:bg-none  checked:border checked:border-blue-700 border-blue-700 checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center "
                  onClick={() => setSelectQuestionType("long")}
                />
              </div>

              <img
                src="/images/icons/exam.png"
                alt=""
                className="w-6 h-8 self-center"
              />

              <h2 className="text-xl font-normal self-center">Long Answers</h2>
            </div>
            {/*  */}
            <h2 className="text-xl font-normal self-center">
              Answer in detail
            </h2>
            <div className=""></div>
            {/* <img
              src="/images/icons/dot.png"
              alt=""
              className="self-center w-5"
            /> */}
          </div>
        </div>
      </div>

      <div className=" w-11/12 mx-auto flex justify-end mt-14">
        <div className="flex gap-4">
          <button
            className="self-center justify-center flex bg-white border border-blued py-3 px-8 rounded-xl text-sm gap-2 text-blued"
            onClick={NavHandler}
          >
            New Question
          </button>
          {/* className="self-center justify-center flex bg-gray-100 py-3 px-8 rounded-xl text-sm gap-2 " */}
          {/* <button className="self-center justify-center flex bg-white border border-blued py-3 px-8 rounded-xl text-sm gap-2 text-blued">
            Copy question from another assessment
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default AddVideoQuestionsType;
