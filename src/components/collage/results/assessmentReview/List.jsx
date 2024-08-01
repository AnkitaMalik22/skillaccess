import { Disclosure } from "@headlessui/react";
import React, { useState, useEffect } from "react";
import { FaCaretDown } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeQuestionById } from "../../../../redux/collage/test/testSlice";

const List = ({ question, level, number, isLoading }) => {
  const [AnswerIndex, setAnswerIndex] = useState(question?.AnswerIndex);
  const [StudentAnswerIndex, setStudentAnswerIndex] = useState(
    question?.StudentAnswerIndex
  );
  const dispatch = useDispatch();

  const handleDelete = ({ sectionId, questionId }) => {
    dispatch(
      removeQuestionById({
        sectionId,
        questionId,
      })
    );
  };

  return (
    <div className="flex justify-between gap-3 md:gap-5 font-dmSans relative z-10 mb-4">
      <button className="bg-[#95ACFA] rounded-2xl text-white text-base font-bold flex justify-center items-center w-[70px] p-3 h-12">
        Q-{number}
      </button>
      <div className="w-full ">
        {isLoading ? (
          <div className="animate-pulse flex flex-col space-y-4">
            <div className="flex justify-between bg-gray-200 rounded-lg p-3 h-10">
              <div className="w-3/4 bg-gray-300 rounded"></div>
              <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
            </div>
            <div className="flex flex-col space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex gap-2 rounded-lg p-3">
                  <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                  <div className="flex-1 bg-gray-300 rounded h-6"></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Disclosure className="relative z-10">
            {({ open }) => (
              <div>
                <div
                  className={`${
                    AnswerIndex === StudentAnswerIndex
                      ? "border-green-500"
                      : "border-red-500"
                  } flex w-full justify-between rounded-lg text-left text-sm font-medium border border-[#95ACFA] p-3`}
                >
                  <p
                    className="text-base font-normal #3E3E3E"
                    dangerouslySetInnerHTML={{ __html: question.Title }}
                  />
                  <div className="flex gap-2 self-center">
                    {level === "adaptive" && (
                      <div className="level flex items-center gap-2 ">
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
                    )}
                    <Disclosure.Button className="flex gap-2 w-10/12 self-center">
                      <FaCaretDown
                        className={`${
                          open ? "rotate-180" : ""
                        } h-5 w-5 text-gray-400 `}
                      />
                      <h2></h2>
                    </Disclosure.Button>
                  </div>
                </div>
                <Disclosure.Panel className="bg-white rounded-b-lg pb-2 mb-2 text-sm text-gray-500 z-10 relative">
                  {question.Options?.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 z-10 relative rounded-lg p-3"
                    >
                      <div className="w-6">
                        {AnswerIndex === StudentAnswerIndex ? (
                          index === AnswerIndex ? (
                            <img
                              src="../../../images/icons/greenDotSelected.png"
                              alt="greensel"
                            />
                          ) : (
                            <img
                              src="../../../images/icons/blueDot.png"
                              alt="greensel"
                            />
                          )
                        ) : index === StudentAnswerIndex ? (
                          <img
                            src="../../../images/icons/redDot.png"
                            alt="red"
                          />
                        ) : index === AnswerIndex ? (
                          <img
                            src="../../../images/icons/greenDot.png"
                            alt="green"
                          />
                        ) : (
                          <img
                            src="../../../images/icons/blueDot.png"
                            alt="blue"
                          />
                        )}
                      </div>
                      <label
                        className={`text-sm ${
                          AnswerIndex === index
                            ? "text-[#00875A] font-bold"
                            : StudentAnswerIndex === index
                            ? "text-red-500"
                            : "text-black"
                        }`}
                      >
                        {option.question || option}
                      </label>
                    </div>
                  ))}
                  {question.questions?.map((subQuestion, idx) => (
                    <div
                      key={idx}
                      className="flex gap-2 z-10 relative rounded-lg p-3"
                    >
                      <div className="w-6">
                        <input
                          type="radio"
                          name={`answer-${number}-${idx}`}
                          className="w-3 h-3 p-[.4rem] checked:bg-none checked:border checked:border-blue-700 border-blued checked:p-0 border-2 ring-transparent ring-2 checked:ring-blue-700 ring-offset-2 self-center"
                        />
                      </div>
                      <label className="text-black text-sm">
                        {subQuestion.question ? (
                          <>
                            <div>
                              <h3
                               className="font-bold">{subQuestion.question}</h3>
                              <p>{subQuestion.studentAnswer}</p>
                            </div>
                          </>
                        ) : (
                          subQuestion
                        )}
                      </label>
                    </div>
                  ))}
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        )}
      </div>
    </div>
  );
};

export default List;
