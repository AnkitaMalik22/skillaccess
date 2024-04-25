import React from "react";
import { CiSettings } from "react-icons/ci";
import { Disclosure, Transition } from "@headlessui/react";
import { FiPieChart } from "react-icons/fi";
import Search from "./Search";
import Beginner from "./Beginner";
import { FaCaretDown } from "react-icons/fa";

import { CgUnavailable } from "react-icons/cg";
import Advanced from "./Advanced";
import Intermediate from "./Intermediate";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaFolder } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import {
  setTestBasicDetails,
  setTestSelectedTopics,
} from "../../../../redux/collage/test/testSlice";
import { getAllTests } from "../../../../redux/collage/test/thunks/test";
import Adaptive from "./Adaptive";

export const Test = () => {
  const dispatch = useDispatch();
  const beginner = useSelector((state) => state.test.assessments.beginner);
  const intermediate = useSelector(
    (state) => state.test.assessments.intermediate
  );
  const advanced = useSelector((state) => state.test.assessments.advanced);
  const adaptive = useSelector((state) => state.test.assessments.adaptive);

  const navigate = useNavigate();
  const asses = [1, 2, 3, 4, 5];

  const { status } = useSelector((state) => state.collageAuth);
  useEffect(
    () => {
      dispatch(
        setTestBasicDetails({
          name: "",
          description: "",
          totalAttempts: null,
          totalQuestions: null,
        })
      );
      dispatch(setTestSelectedTopics([]));
      dispatch(getAllTests());
    },
    [],
    status
  );

  const arr = [<Adaptive />,<Beginner />, <Intermediate />, <Advanced />,];

  return (
    <div className="">
      {/* search bar */}
      <Search />

      <div className="flex mt-2  w-[98.3%] rounded-lg  flex-wrap justify-center relative">
        {/* left block */}
        <div className=" sm:w-3/4 w-full rounded-lg">
          <div className="w-full px-4 pt-8">
            <div className="mx-auto w-full  rounded-2xl bg-white p-2">
              {arr.map((comp, i) => (
                <Disclosure defaultOpen>
                  {({ open }) => (
                    <div className="mb-4">
                      <div className="flex w-full justify-between rounded-t-lg border-b-2 border-gray-200 bg-[#F8F8F9] px-4 py-2 text-left text-sm font-medium  hover:bg-purple-200 focus:outline-none  ">
                        <div className="flex gap-2 w-full justify-between">
                          <h2 className="flex gap-2">
                            {i === 0 ? (
                              <>
                            
                                <FaFolder className="text-blued w-5 h-5 " />
                               Adaptive level{" "}
                                <p className="inline-block text-gray-400">
                                  &#40;{adaptive?.length}&#41;
                                </p>{" "}
                              </>
                            ) : i === 1 ? (
                              <>
                              <FaFolder className="text-blued w-5 h-5 " />
                                Beginner level{" "}
                                <p className="inline-block text-gray-400">
                                  &#40;{beginner.length}&#41;
                                </p>{" "}
                              </>
                            ) :  i === 2 ? (
                              <>
                              <FaFolder className="text-blued w-5 h-5" />
                                For Intermediate{" "}
                                <p className="inline-block text-gray-400">
                                  &#40;{intermediate.length}&#41;
                                </p>{" "}
                              </>
                            ) :(
                              <>
                                <FaFolder className="text-blued w-5 h-5" />
                                For Advanced{" "}
                                <p className="inline-block text-gray-400">
                                  &#40;{advanced.length}&#41;
                                </p>{" "}
                              </>
                            )}
                          </h2>{" "}
                          <Disclosure.Button>
                            <FaCaretDown
                              className={`${
                                open ? "" : ""
                              } h-5 w-5 text-gray-300`}
                            />
                          </Disclosure.Button>
                          {/* <CiSettings
                          className="w-5 h-5 text-gray-500 hover:cursor-pointer"
                          onClick={() => navigate("/collage/test/assessment")}
                        /> */}
                        </div>
                      </div>

                      {/* <Transition
                        enter=" "
                        enterFrom=""
                        enterTo=""
                        leave="transition duration-300 ease-out"
                        leaveFrom="transform scale-100  opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      > */}
                      <Disclosure.Panel className="bg-gray-100 rounded-b-lg pb-2 mb-2 pt-4 text-sm text-gray-500">
                        {comp}
                      </Disclosure.Panel>
                      {/* </Transition> */}
                    </div>
                  )}
                </Disclosure>
              ))}
            </div>
          </div>
        </div>

        {/* right block */}
        <div className=" sm:w-[23%] w-full ml-2 bg-gray-100 rounded-3xl p-2  mt-10  min-h-[50rem] basis-full font-dmSans sm:block sm:basis-auto  ">
          <div className="w-11/12 mt-2 rounded-3xl bg-white min-h-[99%] mx-auto">
            <h2 className="text-base border-b-2 border-gray-200 font-bold text-center py-3  px-2">
              Recent Assessments Completed
            </h2>
            {asses.map(() => {
              return (
                <>
                  <div className="flex gap-2 px-3 py-1 mt-2">
                    <div className="min-w-[2.5rem] h-10 bg-amber-500 self-center rounded-lg"></div>
                    <div className="ml-1 mt-1">
                      <h2 className="text-sm  font-bold  py-1 ">
                        Software Engineer
                      </h2>
                      <h2 className="text-sm  font-normal  pb-2">
                        Google{" "}
                        <p className="text-gray-400 inline">in Pune,India</p>
                      </h2>
                    </div>
                  </div>
                  <div className="flex px-3 pb-3 mt-2 justify-between">
                    <div className="flex gap-1">
                      <button className="rounded-lg bg-gray-100 p-2 text-base font-dmSans font-base">
                        View
                      </button>
                      <button className="rounded-lg p-3  bg-gray-100 self-center">
                        <CgUnavailable className="text-gray-400 text-lg" />
                      </button>
                    </div>

                    <p className="text-sm  font-normal text-gray-400">
                      1 week ago
                    </p>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
