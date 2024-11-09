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
const FindAnswer = ({ question, number }) => {
  const [type, setType] = useState();
  const navigate = useNavigate();
  const [AnswerIndex, setAnswerIndex] = useState(question.AnswerIndex);
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

  const handleEdit = () => {
    if (
      !question.Title ||
      question.Title === "<p><br></p>" ||
      !question.Options[0] ||
      !question.Options[1] ||
      !question.Options[2] ||
      !question.Options[3]
    ) {
      toast.error("Please fill all the fields");

      return;
    } else {
      dispatch(
        editBankQuestionById({
          index: number,
          type: "mcq",
          id: question._id,
          question: question,
        })
      );
    }
  };

  return (
    <div className="flex justify-between gap-3 md:gap-5 font-dmSans relative z-10">
      <button className=" bg-accent rounded-2xl text-white text-base font-bold flex justify-center items-center w-[70px] h-14">
        Q-{number}
      </button>
      <div className="w-full ">
        <Disclosure className="relative z-10">
          {({ open }) => (
            <div className="mb-4">
              <div className="flex w-full justify-between rounded-lg border-[#0D9AAC] border text-[#3E3E3E] py-3 text-left text-lg font-normal  ">
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
                          `/collage/quesBank/find-ans/${question._id}?type=findAnswer&addType=edit`
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
                {/* <div className="flex gap-2 self-center">
                  <Disclosure.Button className="flex gap-2 w-10/12 self-center">
                    <FaCaretDown
                      className={`${
                        open ? "rotate-180" : ""
                      } h-5 w-5 text-gray-400 `}
                    />
                    <h2></h2>{" "}
                  </Disclosure.Button>
                </div> */}
              </div>

              {/* <Transition
                enter="transition duration-300 "
                enterFrom="transform scale-95 ease-in opacity-0"
                enterTo="transform scale-100   duration-700 opacity-100"
                leave="transition duration-300 ease-out"
                leaveFrom="transform scale-100  opacity-100"
                leaveTo="transform scale-95 opacity-0"
              > */}
              {/* <Disclosure.Panel className="bg-white rounded-b-lg pb-2 mb-2  text-sm text-gray-500 z-10 relative">
                {question.Options?.map((question) => (
                  <div className="flex gap-2 z-10 relative rounded-lg p-3">
                    <div className="w-6">
                      <input
                        type="radio"
                        name="answer"
                        id="answer"
                        className="w-3 h-3 p-[.4rem] checked:bg-none  checked:border checked:border-blue-700 border-blued checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center "
                      />
                    </div>

                    <label className="text-black text-sm">
                      {question
                        ? question.question
                          ? question.question
                          : question
                        : ""}
                    </label>
                  </div>
                ))}

                {question.questions?.map((question) => (
                  <div className="flex gap-2  z-10 relative rounded-lg p-3">
                    <div className="w-6">
                      <input
                        type="radio"
                        name="answer"
                        id="answer"
                        className="w-3 h-3 p-[.4rem] checked:bg-none  checked:border checked:border-blue-700 border-blued checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center "
                      />
                    </div>

                    <label className="text-blacktext-sm">
                      {question
                        ? question.question
                          ? question.question
                          : question
                        : ""}
                    </label>
                  </div>
                ))}
              </Disclosure.Panel> */}
              <Disclosure.Panel className="bg-white rounded-b-lg pb-2 mb-2  text-sm text-gray-500 z-10 relative">
                {question.Options?.map((question, index) => (
                  <div className="flex gap-2 z-10 relative rounded-lg p-3">
                    <div className="w-6">
                      {index === AnswerIndex ? (
                        <img
                          src="../../../images/icons/greenDotSelected.png"
                          alt="greensel"
                        />
                      ) : (
                        <img
                          src="../../../images/icons/blueDot.png"
                          alt="greensel"
                        />
                      )}
                    </div>

                    <label
                      className={` text-sm ${
                        AnswerIndex === index ? "text-green" : "text-black"
                      }`}
                    >
                      {question
                        ? question.question
                          ? question.question
                          : question
                        : ""}
                    </label>
                  </div>
                ))}

                {question.questions?.map((question) => (
                  <div className="flex gap-2  z-10 relative rounded-lg p-3">
                    <div className="w-6">
                      <input
                        type="radio"
                        name="answer"
                        id="answer"
                        className="w-3 h-3 p-[.4rem] checked:bg-none  checked:border checked:border-blue-700 border-blued checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center "
                      />
                    </div>

                    <label className="text-blacktext-sm">
                      {question ? (
                        question.question ? (
                          <>
                            {" "}
                            <div>
                              <h3>{question.question}</h3>
                              <p>{question.studentAnswer}</p>
                            </div>
                          </>
                        ) : (
                          question
                        )
                      ) : (
                        ""
                      )}
                    </label>
                  </div>
                ))}
              </Disclosure.Panel>
              {/* </Transition> */}
            </div>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default FindAnswer;
