import React from "react";
import { Disclosure } from "@headlessui/react";
import Header from "../../../components/collage/test/home/Header";
import Beginner from "../../../components/collage/test/home/Beginner";
import { FaCaretDown } from "react-icons/fa";
import { CgUnavailable } from "react-icons/cg";
import Advanced from "../../../components/collage/test/home/Advanced";
import Intermediate from "../../../components/collage/test/home/Intermediate";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaFolder } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentQuestionCount,
  setTestBasicDetails,
  setTestSelectedTopics,
} from "../../../redux/collage/test/testSlice";
import {
  getAllTests,
  getRecentTests,
  removeFromRecent,
} from "../../../redux/collage/test/thunks/test";
import Adaptive from "../../../components/collage/test/home/Adaptive";
import calculateDaysAndWeeks from "../../../util/daysAndWeeks";
import { getStudents } from "../../../redux/collage/student/studentSlice";
import useTranslate from "../../../hooks/useTranslate";

const Test = () => {
  //useTranslate();
  const dispatch = useDispatch();
  const beginner = useSelector((state) => state.test.assessments.beginner);
  const intermediate = useSelector(
    (state) => state.test.assessments.intermediate
  );
  const advanced = useSelector((state) => state.test.assessments.advanced);
  const adaptive = useSelector((state) => state.test.assessments.adaptive);

  const navigate = useNavigate();

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
    <div>
      {/* search bar */}
      <Header students={approvedStudents} />

      <div className="flex rounded-lg md:flex-nowrap justify-center relative gap-3 md:gap-8 items-stretch">
        {/* left block */}
        <div className="w-3/4 rounded-lg flex flex-col">
          <div className="w-full flex-grow">
            <div className="mx-auto w-full rounded-2xl bg-white">
              {arr.map((comp, i) => (
                <Disclosure defaultOpen key={i}>
                  {({ open }) => (
                    <div className="mb-4">
                      <div className="flex w-full justify-between rounded-t-2xl border-b-2 border-opacity-50 border-gray-200 bg-[#F8F8F9] px-4 py-4 text-left text-sm font-medium hover:bg-purple-200 focus:outline-none">
                        <div className="flex gap-2 w-full justify-between text-sm font-bold">
                          <h2 className="flex gap-3 text-[#171717] text-sm">
                            {i === 0 ? (
                              <>
                                <FaFolder className="text-[#B3D4FF] w-5 h-5" />
                                Adaptive level{" "}
                                <p className="inline-block text-[#8F92A1]">
                                  &#40;{adaptive?.length}&#41;
                                </p>{" "}
                              </>
                            ) : i === 1 ? (
                              <>
                                <FaFolder className="text-[#B3D4FF] w-5 h-5" />
                                Beginner level{" "}
                                <p className="inline-block text-[#8F92A1]">
                                  &#40;{beginner.length}&#41;
                                </p>{" "}
                              </>
                            ) : i === 2 ? (
                              <>
                                <FaFolder className="text-[#B3D4FF] w-5 h-5" />
                                For Intermediate{" "}
                                <p className="inline-block text-[#8F92A1]">
                                  &#40;{intermediate.length}&#41;
                                </p>{" "}
                              </>
                            ) : (
                              <>
                                <FaFolder className="text-[#B3D4FF] w-5 h-5" />
                                For Advanced{" "}
                                <p className="inline-block text-[#8F92A1]">
                                  &#40;{advanced.length}&#41;
                                </p>{" "}
                              </>
                            )}
                          </h2>
                          <Disclosure.Button>
                            <FaCaretDown
                              className={`${
                                open ? "" : ""
                              } h-5 w-5 text-[#8F92A1]`}
                            />
                          </Disclosure.Button>
                        </div>
                      </div>
                      <Disclosure.Panel className="bg-gray-100 rounded-b-lg pb-6 mb-2 pt-4 text-sm text-gray-500">
                        {comp}
                      </Disclosure.Panel>
                    </div>
                  )}
                </Disclosure>
              ))}
            </div>
          </div>
        </div>

        {/* right block */}
        <div className="w-1/4 p-4 bg-gray-100 h-[1200px] rounded-3xl font-dmSans sm:block flex-grow flex-shrink-0 flex flex-col">
          <div className="rounded-3xl bg-white h-full mx-auto flex flex-col">
            <h2 className="text-base border-b-2 border-gray-200 font-bold text-center pt-5 pb-3 text-[#171717]">
              Recent Assessments Completed
            </h2>
            <div className="p-3 h-full overflow-y-auto">
              {recentAssessments.map((assessment, index) => (
                <div className="flex flex-col md:gap-8" key={index}>
                  <div className="flex gap-3 items-center">
                    <div className="min-w-[2.5rem] h-10 self-center rounded-lg">
                      <img
                        src="../../images/teams.png"
                        alt="user-icon"
                        className="rounded-lg w-11 h-11"
                      />
                    </div>
                    <div>
                      <h2 className="text-xs font-bold text-[#171717] first-letter:uppercase">
                        {assessment.name}
                      </h2>
                      <h2 className="text-xs font-normal first-letter:uppercase">
                        {assessment.description}
                      </h2>
                    </div>
                  </div>
                  <div className="flex mb-5 gap-2 justify-between items-center">
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
                        className="rounded-lg p-3 bg-[#8F92A1] bg-opacity-5 self-center tooltip"
                        data-tip="Cick here to remove."
                        onClick={() =>
                          dispatch(removeFromRecent(assessment._id))
                        }
                      >
                        <CgUnavailable className="text-[#8F92A1] text-lg" />
                      </button>
                    </div>
                    <p className="text-xs font-normal text-[#8F92A1]">
                      {calculateDaysAndWeeks(assessment.endDate)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
