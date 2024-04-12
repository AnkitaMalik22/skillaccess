import React from "react";
import { RiBookmark2Fill } from "react-icons/ri";
import { Disclosure, Transition } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeBookmark } from "../../../../redux/collage/test/thunks/question";

const Dropdown = ({ bookmark, index }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Disclosure>
      {({ open }) => (
        <div className="mb-4">
          <div className="flex w-full justify-between rounded-t-lg bg-white pl-4 py-2 text-left text-sm font-medium  hover:bg-slate-50 focus:outline-none  ">
            <div>
              <p className="text-sm">
                <span>{index}. </span>
                {bookmark.Title}
              </p>
            </div>
            <div className="flex gap-2 self-center">
              <RiBookmark2Fill
                className="text-[#95ACFA] h-7 w-7 self-center"
                onClick={() => dispatch(removeBookmark(bookmark._id))}
              />

              <Disclosure.Button className="flex gap-2 w-10/12 self-center">
                <FaChevronDown
                  className={`${
                    open ? "rotate-180" : ""
                  } h-5 w-5 text-[#95ACFA] `}
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
              {/* <div className="flex gap-2  rounded-lg p-3">
                <div className="w-6">
                  <input
                    type="radio"
                    name="answer"
                    id="answer"
                    className="w-3 h-3 p-[.4rem] checked:bg-none  checked:border checked:border-blue-700 border-blued checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center "
                  />
                </div>

                <label className="text-blacktext-sm"></label>
              </div> */}

              {bookmark.Options.map((option, index) => (
                <div className="flex gap-2  rounded-lg p-3">
                  <div className="w-6">
                    <input
                      type="radio"
                      name="answer"
                      id="answer"
                      className="w-3 h-3 p-[.4rem] checked:bg-none  checked:border checked:border-blue-700 border-blued checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center "
                    />
                  </div>

                  <label className="text-blacktext-sm">{option}</label>
                </div>
              ))}
            </Disclosure.Panel>
          </Transition>
        </div>
      )}
    </Disclosure>
  );
};

export default Dropdown;
