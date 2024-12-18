import React, { useState } from "react";
import HeaderSelect from "../../../components/college/quesBank/addquestions/HeaderSelect";
import { useDispatch } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import useTranslate from "../../../hooks/useTranslate";
import { isUni } from "../../../util/isCompany";

const AddQuestionsSelect = () => {
  //useTranslate();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const level = searchParams.get("level");
  const [selectQuestionType, setSelectQuestionType] = useState("");

  const NavHandler = () => {
    switch (selectQuestionType) {
      case "mcq":
        navigate(
          isUni() ? `/university/pr/quesBank/addMcqToTopic/${id}?type=mcq&addType=topic` : `/college/quesBank/addMcqToTopic/${id}?type=mcq&addType=topic`

        );
        break;

      case "code":
        navigate(isUni() ? `/university/pr/quesBank/code/${id}?type=compiler&addType=topic` : `/college/quesBank/code/${id}?type=compiler&addType=topic`);
        break;

      case "video":
        navigate(isUni() ? `/university/pr/quesBank/video/${id}?type=video&addType=topic` : `/college/quesBank/video/${id}?type=video&addType=topic`);

        break;

      case "findAnswer":
        navigate(
          isUni() ? `/university/pr/quesBank/find-ans/${id}?type=findAnswer&addType=topic` : `/college/quesBank/find-ans/${id}?type=findAnswer&addType=topic`
        );
        break;

      case "essay":
        navigate(
          isUni() ? `/university/pr/quesBank/essay/${id}?type=essay&addType=topic` : `/college/quesBank/essay/${id}?type=essay&addType=topic`
        );
        break;

      default:
        toast.error("please select field");
        break;
    }
  };
  return (
    <div>
      <HeaderSelect Q={selectQuestionType} />

      <div className="mx-auto ">
        {/* larger screens */}
        <h2 className="font-medium text-base text-[#7D7D7D] mb-5 font-dmSans">
          Add up to 10 custom questions to your assessment (optional). You can
          use five question types: multiple-choice, essay, video, code and find
          answer.
        </h2>

        <div className="w-full md:mb-10 mb-5">
          {[
            {
              type: "mcq",
              label: "Multiple Questions",
              description: "One Correct Answer",
            },
            {
              type: "code",
              label: "Code",
              description: "Programming Questions",
            },
            { type: "essay", label: "Essay", description: "Open Text Answer" },
            {
              type: "video",
              label: "Video",
              description: "Record video to answer questions",
            },
            {
              type: "findAnswer",
              label: "Find Answer",
              description: "Read Phrase and Answer them",
            },
          ].map((item) => (
            <div
              key={item.type}
              className={`w-full flex justify-between items-center gap-5 bg-[#F8F8F9] text-[#000000]  rounded-2xl border px-5 py-3 mb-3 cursor-pointer ${
                selectQuestionType === item.type
                  ? "border-[#0D9AAC]"
                  : " opacity-60"
              }`}
              onClick={() => setSelectQuestionType(item.type)}
            >
              <div className="flex gap-5 font-dmSans items-center w-1/3">
                <input
                  type="radio"
                  name="ques"
                  checked={selectQuestionType === item.type}
                  className="w-3 h-3 checked:bg-none checked:border checked:border-blue-700 border-blue-700 ring-transparent ring-2 checked:ring-blue-700 ring-offset-2"
                  onChange={() => setSelectQuestionType(item.type)}
                />
                <img
                  src="../../../images/icons/exam.png"
                  alt=""
                  className="w-6 h-8"
                />
                <h2 className="text-lg font-normal">{item.label}</h2>
              </div>
              <h2 className="text-lg font-normal flex-1">{item.description}</h2>
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="4"
                viewBox="0 0 17 4"
                fill="none"
                style={{
                  opacity: selectQuestionType === item.type ? 1 : 0.5,
                }}
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.609375 1.9998C0.609375 0.8955 1.51015 0 2.62096 0C3.73267 0 4.63254 0.8955 4.63254 1.9998C4.63254 3.105 3.73267 3.9996 2.62096 3.9996C1.51015 3.9996 0.609375 3.105 0.609375 1.9998ZM6.64502 1.9998C6.64502 0.8955 7.5458 0 8.6566 0C9.76741 0 10.6682 0.8955 10.6682 1.9998C10.6682 3.105 9.76741 3.9996 8.6566 3.9996C7.5458 3.9996 6.64502 3.105 6.64502 1.9998ZM12.6794 1.9998C12.6794 0.8955 13.5802 0 14.6919 0C15.8027 0 16.7035 0.8955 16.7035 1.9998C16.7035 3.105 15.8027 3.9996 14.6919 3.9996C13.5802 3.9996 12.6794 3.105 12.6794 1.9998Z"
                  fill="#000000"
                />
              </svg> */}
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <div className="flex gap-4">
            <button
              className="self-center justify-center flex bg-accent border  py-3 px-8 rounded-xl text-xs gap-2 text-white"
              onClick={NavHandler}
            >
              Add Question
            </button>
            {/* <button className="self-center justify-center flex bg-white border border-blued py-3 px-8 rounded-xl text-xs gap-2 text-blued">
            Copy question from another assessment
          </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionsSelect;
