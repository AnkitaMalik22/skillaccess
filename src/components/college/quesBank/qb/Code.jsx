import { Disclosure, Transition } from "@headlessui/react";
import React from "react";
import { FaCaretDown } from "react-icons/fa";
import { RiBookmark2Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { removeQuestionById } from "../../../../redux/college/test/testSlice";
import { useNavigate } from "react-router-dom";
import { PiPencilSimpleLineBold } from "react-icons/pi";
import { getEntity } from "../../../../util/isCompany";

const List = ({ Title, number, code, question }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = ({ sectionId, questionId }) => {
    dispatch(
      removeQuestionById({
        sectionId,
        questionId,
        questionType: "compiler",
      })
    );
  };
  // //console.log(question);
  return (
    <div className="flex justify-between gap-3 md:gap-5 font-dmSans relative z-10">
      <button className=" bg-accent rounded-2xl text-white text-base font-bold flex justify-center items-center w-[70px] h-14">
        Q-{number}
      </button>
      <div className="w-full  ">
        <Disclosure className="relative z-10">
          {({ open }) => (
            <div className="mb-4">
              <div className="flex w-full justify-between rounded-md border border-[#0D9AAC] text-[#3E3E3E] pl-4 py-3 text-left text-sm font-medium   focus:outline-none  ">
                <div className="flex justify-between items-center w-full">
                  <p>{question.Title}</p>

                  <div className="level flex items-center gap-2 ">
                    <PiPencilSimpleLineBold
                      className=" w-6 h-6 p-1 rounded-md  self-center cursor-pointer"
                      onClick={() => {
                        localStorage.setItem(
                          "qbQues",
                          JSON.stringify(question)
                        );
                        navigate(
                          `/${getEntity()}/quesBank/code/${question._id}?type=code&addType=edit`
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
                      className={`${open ? "rotate-180" : ""
                        } h-5 w-5 text-gray-400 `}
                    />
                    <h2></h2>{" "}
                  </Disclosure.Button>
                </div>
              </div>
              <Transition
                enter="transition duration-300 "
                enterFrom="transform scale-95 ease-in opacity-0"
                enterTo="transform scale-100   duration-700 opacity-100"
                leave="transition duration-300 ease-out"
                leaveFrom="transform scale-100  opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="bg-white rounded-b-lg pb-2 mb-2  text-sm text-gray-500">
                  <div className="flex gap-2  rounded-md p-3">
                    <div className="w-6"></div>

                    <label className="text-blacktext-sm">
                      {/* {code.toString().substring(0, 50)} */}
                      <div
                        className=""
                        dangerouslySetInnerHTML={{
                          __html: question.codeQuestion,
                        }}
                      ></div>
                    </label>
                  </div>
                </Disclosure.Panel>
              </Transition>
            </div>
          )}
        </Disclosure>
      </div>
      {/* <div
        className="bg-gray-100 h-11 flex rounded-xl px-1"
        onClick={() => {
          //console.log(question);
          handleDelete({
            sectionId: question.section,
            questionId: question.id,
          });
        }}
      >
        <img
          src="/images/icons/cross.png"
          alt="cross"
          className="self-center "
        />
      </div> */}
    </div>
  );
};

export default List;
