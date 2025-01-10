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


  const RecentAssessments = () => {
    return (
      <div className="w-full bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <h2 className="px-6 py-4 text-lg font-semibold">
            Recent Assessments
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assessment Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentAssessments?.map((assessment) => (
                <tr key={assessment._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 capitalize">
                      {assessment.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 capitalize">
                      {assessment.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {calculateDaysAndWeeks(assessment.endDate)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          navigate(
                            `/college/results/overview?level=${assessment.level}&assessment=${assessment._id}`
                          )
                        }}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-blued hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                      >
                        View Results
                      </button>
                      <button
                        onClick={() => dispatch(removeFromRecent(assessment._id))}
                        className="inline-flex items-center px-2 py-1 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                        title="Remove from recent"
                      >
                        <CgUnavailable className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {hasMore && (
            <div className="px-6 py-4 border-t border-gray-200">
              <button
                onClick={loadMore}
                disabled={loadingRecent}
                className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blued hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingRecent ? "Loading..." : "Load More Assessments"}
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }


  return (
    <div>
      {/* search bar */}
      <Header students={approvedStudents} />

      {/* Main assessments section */}
      <div className="w-full rounded-md ">
        <div className="w-10/12 flex-grow overflow-y-auto mx-auto">
          <div className="mx-auto w-full rounded-2xl bg-white">
            {arr.map((comp, i) => (
              <Disclosure defaultOpen key={i}>
                {({ open }) => (
                  <div className="mb-4">
                    <div className="flex w-full justify-between rounded-t-2xl border-b-2 border-opacity-50 border-gray-200 bg-[#F8F8F9] px-4 py-4 text-left text-sm font-medium focus:outline-none">
                      <div className="flex gap-2 w-full justify-between text-sm font-bold">
                        <h2 className="flex gap-3 text-[#171717] text-sm">
                          <FaFolder className="text-blued w-5 h-5" />
                          {i === 0 ? (
                            <>
                              Adaptive level{" "}
                              <span className="text-[#8F92A1]">
                                ({adaptive?.length})
                              </span>
                            </>
                          ) : i === 1 ? (
                            <>
                              Beginner level{" "}
                              <span className="text-[#8F92A1]">
                                ({beginner.length})
                              </span>
                            </>
                          ) : i === 2 ? (
                            <>
                              For Intermediate{" "}
                              <span className="text-[#8F92A1]">
                                ({intermediate.length})
                              </span>
                            </>
                          ) : (
                            <>
                              For Advanced{" "}
                              <span className="text-[#8F92A1]">
                                ({advanced.length})
                              </span>
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

      {/* Recent Assessments Table - Now below */}
      {/* {!isUni() && (
        <RecentAssessments />
      )} */}
    </div>
  );
};

export default Test;
