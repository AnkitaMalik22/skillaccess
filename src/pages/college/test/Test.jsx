import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import Header from "../../../components/college/test/home/Header";
import Beginner from "../../../components/college/test/home/Beginner";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { CgUnavailable } from "react-icons/cg";
import Advanced from "../../../components/college/test/home/Advanced";
import Intermediate from "../../../components/college/test/home/Intermediate";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaFolder } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentQuestionCount,
  setTestBasicDetails,
  setTestSelectedTopics,
} from "../../../redux/college/test/testSlice";
import {
  getAllTests,
  getRecentTests,
  removeFromRecent,
} from "../../../redux/college/test/thunks/test";
import Adaptive from "../../../components/college/test/home/Adaptive";
import calculateDaysAndWeeks from "../../../util/daysAndWeeks";
import { getStudents } from "../../../redux/college/student/studentSlice";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "../../../components/loaders/Loader";
import { isUni } from "../../../util/isCompany";

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
  const { user } = useSelector((state) => state.collegeAuth);
  const { approvedStudents } = useSelector((state) => state.collegeStudents);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(1);
  const [loadingRecent, setLoadingRecent] = useState(false);

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
    !isUni() && dispatch(getRecentTests({ skip: index * 10, limit: 10 }));
    dispatch(setTestSelectedTopics([]));
    dispatch(setCurrentQuestionCount(0));
    dispatch(getAllTests());
  }, []);

  const loadMore = () => {
    //console.log("loadmore", loadingRecent);
    if (loadingRecent) {
      return;
    }

    setLoadingRecent(true);
    dispatch(getRecentTests({ skip: index * 10, limit: 10 }))
      .then((res) => {
        setLoadingRecent(false);
        //console.log(res);
        //console.log(res?.payload?.assessment?.length);
        if (res?.payload?.assessment?.length <= 0) {
          setHasMore(false);
        }
      })
      .catch((error) => {
        setLoadingRecent(false);
      });

    setIndex((prev) => prev + 1);
  };

  const arr = [
    <Adaptive key="adaptive" />,
    <Beginner key="beginner" />,
    <Intermediate key="intermediate" />,
    <Advanced key="advanced" />,
  ];
  return (
    <div>
      {/* search bar */}
      <Header students={approvedStudents} />

      <div
        className={`flex rounded-md md:flex-nowrap justify-center relative gap-3 md:gap-8 items-stretch ${
          isUni() ? "" : "h-screen"
        }`}
      >
        {/* left block */}
        <div className="w-3/4 rounded-md flex flex-col">
          <div className="w-full flex-grow overflow-y-auto">
            <div className="mx-auto w-full rounded-2xl bg-white">
              {arr.map((comp, i) => (
                <Disclosure defaultOpen key={i}>
                  {({ open }) => (
                    <div className="mb-4">
                      <div className="flex w-full justify-between rounded-t-2xl border-b-2 border-opacity-50 border-gray-200 bg-[#F8F8F9] px-4 py-4 text-left text-sm font-mediumfocus:outline-none">
                        <div className="flex gap-2 w-full justify-between text-sm font-bold">
                          <h2 className="flex gap-3 text-[#171717] text-sm">
                            {i === 0 ? (
                              <>
                                <FaFolder className="text-blued w-5 h-5" />
                                Adaptive level{" "}
                                <p className="inline-block text-[#8F92A1]">
                                  &#40;{adaptive?.length}&#41;
                                </p>{" "}
                              </>
                            ) : i === 1 ? (
                              <>
                                <FaFolder className="text-blued w-5 h-5" />
                                Beginner level{" "}
                                <p className="inline-block text-[#8F92A1]">
                                  &#40;{beginner.length}&#41;
                                </p>{" "}
                              </>
                            ) : i === 2 ? (
                              <>
                                <FaFolder className="text-blued w-5 h-5" />
                                For Intermediate{" "}
                                <p className="inline-block text-[#8F92A1]">
                                  &#40;{intermediate.length}&#41;
                                </p>{" "}
                              </>
                            ) : (
                              <>
                                <FaFolder className="text-blued w-5 h-5" />
                                For Advanced{" "}
                                <p className="inline-block text-[#8F92A1]">
                                  &#40;{advanced.length}&#41;
                                </p>{" "}
                              </>
                            )}
                          </h2>
                          <Disclosure.Button>
                            {open ? (
                              <FaCaretDown className="text-[#8F92A1] text-lg" />
                            ) : (
                              <FaCaretUp className="text-[#8F92A1] text-lg" />
                            )}
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
        {!isUni() && (
          <div className="w-1/4 p-4 bg-gray-100 rounded-md font-dmSans sm:block flex flex-col">
            <div className="rounded-md bg-white h-full mx-auto flex flex-col">
              <h2 className="text-base border-b-2 border-gray-200 font-bold text-center pt-5 pb-3 text-[#171717]">
                Recent Assessments Completed
              </h2>

              <div className="p-3 overflow-y-scroll !scrollbar-track-neutral-400 !scrollbar-thumb-slate-400">
                <div>
                  {recentAssessments?.map((assessment, index) => (
                    <div className="flex flex-col md:gap-8 mb-5" key={index}>
                      <div className="flex gap-3 items-center">
                        {/* <div className="min-w-[2.5rem] h-10 self-center rounded-md">
                        <img
                          src="/images/teams.png"
                          alt="user-icon"
                          className="rounded-md w-11 h-11"
                        />
                      </div> */}
                        <div>
                          <h2 className="text-sm font-bold text-[#171717] first-letter:uppercase">
                            {assessment.name}
                          </h2>
                          <h2 className="text-sm font-normal first-letter:uppercase">
                            {assessment.description}
                          </h2>
                        </div>
                      </div>
                      <div className="flex mb-5 gap-2 justify-between items-center">
                        <div className="flex gap-2">
                          <button
                            className="rounded-md bg-[#8F92A1] hover:border-[#8F92A1] bg-opacity-5 py-1 px-2 text-base font-dmSans border border-gray-200 transition-all hover:shadow-md"
                            onClick={() => {
                              navigate(
                                `/college/results/overview?level=${assessment.level}&assessment=${assessment._id}`
                              );
                            }}
                          >
                            View
                          </button>
                          <button
                            className="rounded-md bg-[#8F92A1] hover:border-[#8F92A1] bg-opacity-5 py-1 px-2 text-base font-dmSans border border-gray-200 transition-all hover:shadow-md"
                            data-tip="Cick here to remove."
                            onClick={() =>
                              dispatch(removeFromRecent(assessment._id))
                            }
                          >
                            <CgUnavailable className="text-[#8F92A1] text-lg" />
                          </button>
                        </div>
                        <p className="text-sm font-normal text-[#8F92A1]">
                          {calculateDaysAndWeeks(assessment.endDate)}
                        </p>
                      </div>
                    </div>
                  ))}
                  {hasMore && (
                    <div className="bg-blued p-1 rounded-md w-fit h-fit">
                      <button
                        onClick={loadMore}
                        className=" bg-blued text-secondary-foreground shadow-md  text-white  hover:shadow-inner-lg p-1 rounded-md"
                      >
                        load more
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Test;
