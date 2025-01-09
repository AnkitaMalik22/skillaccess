import { Disclosure } from "@headlessui/react";
import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeQuestionById } from "../../../../redux/college/test/testSlice";
import { PiPencilSimpleLineBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
const Essay = ({ question, number }) => {
  const [type, setType] = useState();
  // //console.log(question);
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
    <div className="flex justify-between gap-3 md:gap-5 font-dmSans relative z-10">
      <button className="bg-accent rounded-2xl text-white text-base font-bold flex justify-center items-center w-[70px] h-14">
        Q-{number}
      </button>
      <div className="w-full ">
        <Disclosure className="relative z-10">
          {({ open }) => (
            <div className="mb-4">
              <div className="flex w-full justify-between rounded-md border-[#0D9AAC] border text-[#3E3E3E] py-3 text-left text-lg font-normal  ">
                <div className="flex justify-between items-center w-full px-2">
                  <p
                    className="text-sm pl-4"
                    dangerouslySetInnerHTML={{ __html: question.Title }}
                  ></p>

                  <div className="level flex items-center gap-2 ">
                    <PiPencilSimpleLineBold
                      className=" w-6 h-6 p-1 rounded-md  self-center cursor-pointer"
                      onClick={() => {
                        navigate(
                          `/college/quesBank/essay/${question._id}?type=essay&addType=edit`
                        );
                        localStorage.setItem(
                          "qbQues",
                          JSON.stringify(question)
                        );
                      }}
                    />
                    <div>
                      {question.QuestionLevel == "beginner" && (
                        <p className="rounded-2xl bg-cyan-500 text-white text-sm w-8 h-8 text-center font-medium flex items-center justify-center ">
                          L1
                        </p>
                      )}
                      {question.QuestionLevel == "intermediate" && (
                        <p className="rounded-2xl bg-green-500 text-white text-sm  w-8 h-8 text-center font-medium flex items-center justify-center ">
                          L2
                        </p>
                      )}
                      {question.QuestionLevel == "advanced" && (
                        <p className="rounded-2xl bg-red-500 text-white text-sm  w-8 h-8 text-center font-medium flex justify-center items-center ">
                          L3
                        </p>
                      )}
                    </div>
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
