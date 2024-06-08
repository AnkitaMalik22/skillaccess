import React from "react";
import { CiSettings } from "react-icons/ci";
import { Disclosure, Transition } from "@headlessui/react";
import { FiPieChart } from "react-icons/fi";
import Header from "./Header";
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
  setCurrentQuestionCount,
  setTestBasicDetails,
  setTestSelectedTopics,
} from "../../../../redux/collage/test/testSlice";
import {
  getAllTests,
  getRecentTests,
  removeFromRecent,
} from "../../../../redux/collage/test/thunks/test";
import Adaptive from "./Adaptive";
import Assessment from "../assessment/Assessment";

import calculateDaysAgo from "../../../../util/calculateDaysAgo";
import calculateDaysAndWeeks from "../../../../util/daysAndWeeks";
import { getStudents } from "../../../../redux/collage/student/studentSlice";

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

  const { recentAssessments } = useSelector((state) => state.test);
  const { user } = useSelector((state) => state.collageAuth);
  const { approvedStudents } = useSelector((state) => state.collegeStudents);

  useEffect(() => {
    dispatch(
      setTestBasicDetails({
        name: "",
        description: "",
        totalAttempts: null,
        totalQuestions: null,
      })
    );
    dispatch(getStudents({ id: user?._id }));
    dispatch(getRecentTests());
    dispatch(setTestSelectedTopics([]));
    dispatch(setCurrentQuestionCount(0));
    dispatch(getAllTests());
  }, []);

  const arr = [<Adaptive />, <Beginner />, <Intermediate />, <Advanced />];

  return (
    <div className="w-11/12 mx-auto py-5 md:py-10">
      {/* search bar */}
      <Header students={approvedStudents} />

      <div className="flex rounded-lg  md:flex-nowrap justify-center relative gap-3 md:gap-8">
        {/* left block */}
        <div className="w-3/4 rounded-lg">
          <div className="w-full">
            <div className="mx-auto w-full  rounded-2xl bg-white">
              {arr.map((comp, i) => (
                <Disclosure defaultOpen>
                  {({ open }) => (
                    <div className="mb-4 ">
                      <div className="flex w-full justify-between rounded-t-2xl border-b-2  border-opacity-50 border-gray-200 bg-[#F8F8F9] px-4 py-4 text-left text-sm font-medium  hover:bg-purple-200 focus:outline-none  ">
                        <div className="flex gap-2 w-full justify-between text-sm font-bold">
                          <h2 className="flex gap-3 text-[#171717] text-sm">
                            {i === 0 ? (
                              <>
                                <FaFolder className="text-[#B3D4FF] w-5 h-5 " />
                                Adaptive level{" "}
                                <p className="inline-block text-[#8F92A1]">
                                  &#40;{adaptive?.length}&#41;
                                </p>{" "}
                              </>
                            ) : i === 1 ? (
                              <>
                                <FaFolder className="text-[#B3D4FF] w-5 h-5 " />
                                Beginner level{" "}
                                <p className="inline-block text-[#8F92A1]">
                                  &#40;{beginner.length}&#41;
                                </p>{" "}
                              </>
                            ) : i === 2 ? (
                              <>
                                <FaFolder className="text-[#B3D4FF] w-5 h-5 " />
                                For Intermediate{" "}
                                <p className="inline-block text-[#8F92A1]">
                                  &#40;{intermediate.length}&#41;
                                </p>{" "}
                              </>
                            ) : (
                              <>
                                <FaFolder className="text-[#B3D4FF] w-5 h-5 " />
                                For Advanced{" "}
                                <p className="inline-block text-[#8F92A1]">
                                  &#40;{advanced.length}&#41;
                                </p>{" "}
                              </>
                            )}
                          </h2>{" "}
                          <Disclosure.Button>
                            <FaCaretDown
                              className={`${
                                open ? "" : ""
                              } h-5 w-5 text-[#8F92A1]`}
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
                      <Disclosure.Panel className="bg-gray-100 rounded-b-lg pb-6 mb-2 pt-4 text-sm text-gray-500">
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
        <div className="w-1/4 p-4 bg-gray-100 rounded-3xl   min-h-[50rem] basis-full font-dmSans sm:block sm:basis-auto  ">
          <div className="rounded-3xl bg-white min-h-[99%] mx-auto">
            <h2 className="text-base border-b-2 border-gray-200 font-bold text-center pt-5 pb-3 text-[#171717]">
              Recent Assessments Completed
            </h2>
            <div className="p-3 ">
              {recentAssessments.map((assessment) => {
                return (
                  <div className="flex flex-col md:gap-8">
                    <div className="flex gap-3 items-center">
                      <div className="min-w-[2.5rem] h-10  self-center rounded-lg">
                        <img
                          src="../../images/teams.png"
                          alt=" user-icon"
                          className=" rounded-lg w-11 h-11"
                        />
                      </div>
                      <div>
                        <h2 className="text-xs  font-bold text-[#171717] ">
                          {assessment.name}
                        </h2>
                        <h2 className="text-xs  font-normal">
                          {assessment.description}
                          {/* <span className="text-[#8F92A1] inline">
                            in Pune,India
                          </span> */}
                        </h2>
                      </div>
                    </div>
                    <div className="flex  mb-5 gap-2 justify-between items-center">
                      <div className="flex gap-2">
                        <button
                          className="rounded-lg bg-[#8F92A1] bg-opacity-5 p-2 text-base font-dmSans font-base"
                          onClick={() => {
                            navigate(
                              `/collage/results/overview?level=${assessment.level}&assessment=${assessment._id}`
                            );
                          }}
                        >
                          View
                        </button>
                        <button
                          className="rounded-lg p-3  bg-[#8F92A1] bg-opacity-5 self-center"
                          onClick={() =>
                            dispatch(removeFromRecent(assessment._id))
                          }
                        >
                          <CgUnavailable className="text-[#8F92A1] text-lg" />
                        </button>
                      </div>

                      <p className="text-xs  font-normal text-[#8F92A1]">
                        {calculateDaysAndWeeks(assessment.endDate)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
