import { Disclosure, Transition } from "@headlessui/react";
import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { RiBookmark2Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { removeQuestionById } from "../../../../redux/collage/test/testSlice";
import { PiPencilSimpleLineBold } from "react-icons/pi";
import toast from "react-hot-toast";
import { editBankQuestionById } from "../../../../redux/collage/test/thunks/question";
import { useNavigate } from "react-router-dom";
const Essay = ({ question, number }) => {
  const [type, setType] = useState();
  const [AnswerIndex, setAnswerIndex] = useState(question.AnswerIndex);
  console.log(question);
  const dispatch = useDispatch();
  const handleDelete = ({ sectionId, questionId }) => {
    dispatch(
      removeQuestionById({
        sectionId,
        questionId,
        questionType: type,
      })
    );
  };
  const navigate = useNavigate();

  return (
    <div className="flex justify-between gap-2 font-dmSans relative z-10">
      <button className=" bg-blued rounded-xl text-white text-base font-bold py-2 w-12 h-11">
        Q-{number}
      </button>
      <div className="w-full ">
        <Disclosure className="relative z-10">
          {({ open }) => (
            <div className="mb-4">
              <div className="flex w-full justify-between rounded-lg bg-gray-100 pl-4 py-3 text-left text-sm font-medium  hover:bg-slate-50 focus:outline-none  ">
                <div className="flex justify-between items-center w-full">
                  <p
                    className="text-sm pl-4"
                    dangerouslySetInnerHTML={{ __html: question.Title }}
                  ></p>

                  <div className="level flex items-center gap-2 ">
                    <PiPencilSimpleLineBold
                      className=" w-6 h-6 p-1 rounded-lg  self-center cursor-pointer"
                      onClick={() => {
                        navigate(
                          `/collage/quesBank/essay/${question._id}?type=essay&addType=edit`
                        );
                        localStorage.setItem(
                          "qbQues",
                          JSON.stringify(question)
                        );
                      }}
                    />
                    {question.QuestionLevel == "beginner" && (
                      <p className="rounded-2xl mr-4 py-1.5 bg-cyan-500 text-white w-8 h-8 text-center font-extrabold  ">
                        L1
                      </p>
                    )}
                    {question.QuestionLevel == "intermediate" && (
                      <p className="rounded-2xl mr-4   py-1.5 bg-green-500 text-white w-8 h-8 text-center font-extrabold  ">
                        L2
                      </p>
                    )}
                    {question.QuestionLevel == "advanced" && (
                      <p className="rounded-2xl mr-4   py-1.5 bg-red-500 text-white w-8 h-8 text-center font-extrabold  ">
                        L3
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 self-center">
                  <Disclosure.Button className="flex gap-2 w-10/12 self-center">
                    <FaCaretDown
                      className={`${
                        open ? "rotate-180" : ""
                      } h-5 w-5 text-gray-400 `}
                    />
                    <h2></h2>{" "}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default Essay;
