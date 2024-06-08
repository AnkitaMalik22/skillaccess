import { Disclosure, Transition } from "@headlessui/react";
import React from "react";
import { FaCaretDown } from "react-icons/fa";
import { RiBookmark2Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { removeQuestionById } from "../../../../redux/collage/test/testSlice";

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

  return (
    <div className="flex justify-between gap-3 md:gap-5 font-dmSans relative z-10">
      <button className=" bg-[#95ACFA] rounded-2xl text-white text-base font-bold flex justify-center items-center w-[70px] h-14">
        Q-{number}
      </button>
      <div className="w-full  ">
        <Disclosure className="relative z-10">
          {({ open }) => (
            <div className="mb-4">
              <div className="flex w-full justify-between rounded-lg  pl-4 py-3 text-left text-sm font-medium  hover:border-[#95ACFA] hover:border">
                <div>
                  <p className="text-sm">{Title}</p>
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

              <Transition
                enter="transition duration-300 "
                enterFrom="transform scale-95 ease-in opacity-0"
                enterTo="transform scale-100   duration-700 opacity-100"
                leave="transition duration-300 ease-out"
                leaveFrom="transform scale-100  opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="bg-white rounded-b-lg pb-2 mb-2  text-sm text-gray-500">
                  <div className="flex gap-2  rounded-lg p-3">
                    <div className="w-6"></div>

                    <label className="text-blacktext-sm">
                      {/* {code.toString().substring(0, 50)} */}
                      {code}
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
          console.log(question);
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
