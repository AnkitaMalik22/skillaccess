import { Disclosure, Transition } from "@headlessui/react";
import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { RiBookmark2Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { removeQuestionById } from "../../../../redux/collage/test/testSlice";
import { useEffect } from "react";

const List = ({ question, number }) => {
  let type;

  const [AnswerIndex, setAnswerIndex] = useState(question.AnswerIndex);
  const [StudentAnswerIndex, setStudentAnswerIndex] = useState(
    question.StudentAnswerIndex
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
  console.log(question, "questioncode");

  return (
    <div className="flex justify-between gap-3 md:gap-5 font-dmSans relative z-10 mb-4">
      <button className=" bg-[#95ACFA] rounded-2xl text-white text-base font-bold flex justify-center items-center w-[70px] p-3 h-12">
        Q-{number}
      </button>
      <div className="w-full ">
        <Disclosure className="relative z-10">
          {({ open }) => (
            <div>
              <div className="flex w-full justify-between rounded-lg text-left text-sm font-medium border border-[#95ACFA] p-3">
                <p
                  className="text-base font-normal #3E3E3E"
                  dangerouslySetInnerHTML={{ __html: question.Title }}
                />

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

              {/* <Transition
                enter="transition duration-300 "
                enterFrom="transform scale-95 ease-in opacity-0"
                enterTo="transform scale-100   duration-700 opacity-100"
                leave="transition duration-300 ease-out"
                leaveFrom="transform scale-100  opacity-100"
                leaveTo="transform scale-95 opacity-0"
              > */}
              <Disclosure.Panel className="bg-white rounded-b-lg pb-2 mb-2  text-sm text-gray-500 z-10 relative">
                {question.Options?.map((question, index) => (
                  <div className="flex gap-2 z-10 relative rounded-lg p-3">
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
                        <img src="../../../images/icons/redDot.png" alt="red" />
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
                      className={` text-sm ${
                        AnswerIndex === index
                          ? "text-green"
                          : StudentAnswerIndex === index
                          ? "text-red-500"
                          : "text-black"
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
      {/* <div className="bg-gray-100 h-11 flex  rounded-xl px-1">
        <img
          src="../../images/icons/cross.png"
          alt="cross"
          className="self-center "
          onClick={() => {
            // console.log(question);
            handleDelete({
              sectionId: question.section,
              questionId: question._id,
            });
          }}
        />
      </div> */}
    </div>
  );
};

export default List;
