import { Disclosure, Transition } from "@headlessui/react";
import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { RiBookmark2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  removeQuestionById,
  setCurrentQuestionCount,
} from "../../../../redux/collage/test/testSlice";

const List = ({ question, number, level }) => {
  const [type, setType] = useState();
  const [AnswerIndex, setAnswerIndex] = useState(question.AnswerIndex);
  const { currentQuestionCount } = useSelector((state) => state.test);
  const dispatch = useDispatch();
  const handleDelete = ({ sectionId, questionId, questionType }) => {
    dispatch(setCurrentQuestionCount(currentQuestionCount - 1));
    dispatch(
      removeQuestionById({
        sectionId,
        questionId,
        questionType,
      })
    );
  };
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
                <div>
                  <p
                    className="text-sm pl-4"
                    dangerouslySetInnerHTML={{ __html: question.Title }}
                  />
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

              {/* <Transition
                enter="transition duration-300 "
                enterFrom="transform scale-95 ease-in opacity-0"
                enterTo="transform scale-100   duration-700 opacity-100"
                leave="transition duration-300 ease-out"
                leaveFrom="transform scale-100  opacity-100"
                leaveTo="transform scale-95 opacity-0"
              > */}
              {/* <Disclosure.Panel className="bg-white rounded-b-lg pb-2 mb-2  text-sm text-gray-500 z-10 relative">
                {question.Options?.map((question, index) => (
                  <div className="flex gap-2 z-10 relative rounded-lg p-3">
                    <div className="w-6" key={index}>
                      <input
                        type="radio"
                        name="answer"
                        // value={index===question.AnswerIndex-1}
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
      {/* <div className="bg-gray-100 h-11 flex  rounded-xl px-1">
        <img
          src="../../images/icons/cross.png"
          alt="cross"
          className="self-center "
          onClick={() => {
            if (question.AnswerIndex) {
              setType("mcq");
              handleDelete({
                sectionId: question.section,
                questionId: question.id,
                questionType: "mcq",
              });
            } else if (question.questions) {
              setType("findAnswer");
              handleDelete({
                sectionId: question.section,
                questionId: question.id,
                questionType: "findAnswer",
              });
            } else {
              setType("essay");
              handleDelete({
                sectionId: question.section,
                questionId: question.id,
                questionType: "essay",
              });
            }

            // //console.log(type);
          }}
        />
      </div> */}
    </div>
  );
};

export default List;
