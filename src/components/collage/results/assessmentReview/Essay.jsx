import { Disclosure, Transition } from "@headlessui/react";
import React from "react";
import { FaCaretDown } from "react-icons/fa";
import { RiBookmark2Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { removeQuestionById } from "../../../../redux/collage/test/testSlice";

const Essay = ({ question, number }) => {
  let type;

  const dispatch = useDispatch();
  const handleDelete = ({ sectionId, questionId }) => {
    dispatch(
      removeQuestionById({
        sectionId,
        questionId,
      })
    );
  };

  // //console.log(question , "questionessay");
  return (
    <div className="flex justify-between gap-3 md:gap-5 font-dmSans relative z-10 mb-4">
      <button className="bg-accent rounded-2xl text-white text-base font-bold flex justify-center items-center w-[70px] p-3 h-12">
        Q-{number}
      </button>
      <div className="w-full ">
        <Disclosure className="relative z-10">
          {({ open }) => (
            <div>
              <div className=" flex w-full justify-between rounded-lg text-left text-sm font-medium border border-[#0D9AAC] p-3">
                <div>
                  <p className="text-sm">{question.Title}</p>
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
              <Disclosure.Panel className="bg-white rounded-b-lg pb-2 mb-2  text-sm text-gray-500 z-10 relative">
                {/* {question.Options?.map((question) => (
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
                    <label className="text-blacktext-sm">
                      {question
                        ? question.question
                          ? question.question
                          : question
                        : ""}
                    </label>
                  </div>
                ))} */}

                <div className="flex gap-2  z-10 relative rounded-lg p-3">
                  <label className="text-blacktext-sm">
                    {question.studentAnswer}
                  </label>
                </div>
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
            // //console.log(question);
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

export default Essay;
