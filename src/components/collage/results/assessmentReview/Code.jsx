import { Disclosure, Transition } from "@headlessui/react";
import React from "react";
import { FaCaretDown } from "react-icons/fa";
import { RiBookmark2Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { removeQuestionById } from "../../../../redux/collage/test/testSlice";
import Editor from "@monaco-editor/react";

const List = ({ Title, number, code, question }) => {
  const dispatch = useDispatch();
  const handleDelete = ({ sectionId, questionId }) => {
    dispatch(
      removeQuestionById({
        sectionId,
        questionId,
      })
    );
  };
  const getPassedTestCasesCount = () => {
    return question.testcase.filter((tc) => tc.passed).length;
  };

  const passedTestCasesCount = getPassedTestCasesCount();
  const totalTestCasesCount = question.testcase.length;
  const testcasePassed = passedTestCasesCount / totalTestCasesCount;
  return (
    <div className="flex justify-between gap-3 md:gap-5 font-dmSans relative z-10">
      <button className=" bg-[#95ACFA] rounded-2xl text-white text-base font-bold flex justify-center items-center w-[70px] h-14">
        Q-{number}
      </button>
      <div className="w-full  ">
        <Disclosure className="relative z-10">
          {({ open }) => (
            <>
              <div
                className={`${
                  passedTestCasesCount / totalTestCasesCount > 0.5 &&
                  passedTestCasesCount !== 0
                    ? "border-green-500"
                    : "border-red-500"
                } flex w-full justify-between rounded-lg  p-3 text-left text-sm font-medium  border mb-2`}
              >
                <div>
                  <p
                    className="text-sm"
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
                  <div className="flex flex-col gap-2  rounded-lg">
                    {/* <div className="w-6"></div> */}

                    <Editor
                      theme="vs-light"
                      height="300px"
                      defaultLanguage={question.codeLangugae}
                      value={code}
                      options={{ readOnly: true }}
                      className="border-2 border-[#95ACFA] rounded-[4px]"
                    />
                    <div
                      className={`${
                        passedTestCasesCount / totalTestCasesCount > 0.5
                          ? "text-green-500"
                          : "text-red-400"
                      } mt-2 p-2 bg-[#E6EFFF] rounded-lg text-center text-sm font-semibold`}
                    >
                      {passedTestCasesCount > 0
                        ? `Test Cases Passed: ${passedTestCasesCount} /${totalTestCasesCount}`
                        : "0 Testcases Passed"}
                    </div>
                  </div>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
      {/* <div
        className="bg-gray-100 h-11 flex rounded-xl px-1"
        onClick={() => {
          //console.log(question);
          handleDelete({
            sectionId: question.section,
            questionId: question._id,
          });
        }}
      >
        <img
          src="../../images/icons/cross.png"
          alt="cross"
          className="self-center "
        />
      </div> */}
    </div>
  );
};

export default List;
