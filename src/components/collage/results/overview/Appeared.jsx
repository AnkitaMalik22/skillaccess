import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllTests,
  getTest,
  selectStudentTest,
} from "../../../../redux/collage/test/thunks/test";
import { getTestResultPage } from "../../../../redux/collage/test/thunks/test";
import { getStudentResponse } from "../../../../redux/collage/test/thunks/student";
import CircularLoader from "../../../CircularLoader";
import Skeleton from "../../../loaders/Skeleton";

const Appeared = ({ assessment }) => {
  const [isLoading, setIsLoading] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleStatusChange = (testId, responseId) => async (event) => {
    const status = event.target.value;
    setIsLoading({ ...isLoading, [responseId]: true });
    await dispatch(selectStudentTest({ testId, responseId, status }));
    await dispatch(getTest(testId));
    await dispatch(getTestResultPage(assessment._id));
    setIsLoading({ ...isLoading, [responseId]: false });
  };

  const { testDataResponse, response, TEST_DATA_RESPONSE_LOADING } =
    useSelector((state) => state.test);

  // console.log(response);

  useEffect(() => {
    if (assessment?._id) {
      dispatch(getTestResultPage(assessment._id));
    }
  }, [dispatch, assessment?._id]);

  const getResponse = (responseId) => {
    dispatch(getStudentResponse(responseId));
  };

  let arr = [assessment?.studentResponses];

  // console.log(arr);

  // const getProgressBarColor = (percentage) => {
  //   if (percentage === 0) {
  //     return ""; // Return empty string for transparent
  //   } else if (percentage > 0 && percentage < 33.33) {
  //     return "bg-red-600"; // Red color
  //   } else if (percentage >= 33.33 && percentage < 66.66) {
  //     return "bg-blue-600"; // Blue color
  //   } else {
  //     return "bg-green-600"; // Green color
  //   }
  // };
  // const getProgressBarWidth = (percentage) => {
  //   if (percentage === 0) {
  //     return 0; // Width is 0 when percentage is 0
  //   } else if (percentage < 33.33) {
  //     return 40; // 2/5 width
  //   } else if (percentage < 66.66) {
  //     return 60; // 3/5 width
  //   } else {
  //     return 100; // Full width
  //   }
  // };
  // console.log(arr);

  let percentageData = [];
  let colors = [];

  if (testDataResponse?.length > 0) {
    percentageData = testDataResponse.map((item) => item.percentage);

    percentageData.forEach((percentage) => {
      let color = "";
      if (percentage <= 0) {
        color = "transparent";
      } else if (percentage > 0 && percentage < 33.33) {
        color = "#F44336"; // Red color
      } else if (percentage >= 33.33 && percentage < 66.66) {
        color = "#FFC107"; // Orange color
      } else {
        color = "#4CAF50"; // Green color
      }
      colors.push(color);
    });
  }

  return (
    <div className="w-full mx-auto">
      {/* legend */}
      <div className=" grid-cols-5  text-center  mx-auto  font-dmSans font-bold text-base hidden md:grid bg-[#0052CC] bg-opacity-5 rounded-lg p-4 mb-5">
        <h2>Name and Profile</h2>
        <h2>Date</h2>
        <h2>Status</h2>
        <h2>Assessment Performance</h2>
        <h2>Review</h2>
      </div>

      {/* list to be iterated */}
      {TEST_DATA_RESPONSE_LOADING ? (
        <Skeleton />
      ) : (
        <>
          {" "}
          {!TEST_DATA_RESPONSE_LOADING && testDataResponse?.length > 0 ? (
            testDataResponse?.map((student, index) => (
              <div
                className="grid-cols-5 rounded-2xl my-4 py-2 pl-2 text-center mx-auto font-dmSans text-sm hidden md:grid w-full border-2 transition-colors duration-300"
                style={{ borderColor: "transparent", borderWidth: "2px" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = colors[index])
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "transparent")
                }
              >
                {" "}
                {/* row-2 */}
                <div className="flex justify-center gap-2">
                  <div className=" min-w-[3rem]  h-12 self-center">
                    <img
                      src="../../images/user.jpg"
                      alt="icon"
                      className="h-12 w-12"
                    />
                  </div>
                  <span className="break-words min-w-24 self-center">
                    <h2 className="font-dmSans font-semibold text-sm first-letter:capitalize  ">
                      {student?.studentId?.FirstName}
                    </h2>
                  </span>
                </div>
                {/*  */}
                <div className="flex justify-center items-center">
                  <h2 className="font-dmSans text-sm ">
                    1st March - 8th March
                  </h2>
                </div>
                {/*  */}
                <div className="flex justify-center">
                  <div className=" self-center h-fit">
                    <span>
                      {isLoading[student?._id] ? (
                        <CircularLoader />
                      ) : (
                        <select
                          className="font-dmSans border-none focus:border-none bg-transparent focus:ring-0 sm:text-sm"
                          onChange={handleStatusChange(
                            assessment?._id,
                            student?._id
                          )}
                          value={student?.status}
                        >
                          <option value="">Pending</option>
                          <option value="rejected">Rejected</option>
                          <option value="selected">Selected</option>
                        </select>
                      )}
                    </span>
                  </div>
                </div>
                {/*  */}
                <div className="flex justify-center">
                  <div className=" self-center">
                    <span className="flex gap-2 items-center">
                      <div className="min-w-[6rem] bg-opacity-5 rounded-lg h-3 mx-auto bg-green-600">
                        <div
                          className={`h-full rounded-lg`}
                          style={{
                            width: `${student?.percentage}%`,
                            backgroundColor: colors[index],
                          }}
                        ></div>
                      </div>
                      <h2 className="font-dmSans font-bold text-xs ">
                        {" "}
                        {student?.percentage?.toFixed(2)}%
                      </h2>
                    </span>
                  </div>
                </div>
                {/*  */}
                <div className="flex justify-center">
                  <span
                    className="self-center cursor-pointer"
                    onClick={() =>
                      navigate(
                        `/collage/results/assessmentReview?studentId=${student.studentId._id}&assessmentId=${student.assessmentId}&responseId=${student._id}`
                      )
                    }
                  >
                    <h2 className="font-dmSans text-sm text-blue-500 ">
                      Assessment Review
                    </h2>
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center h-96">
              <h2 className="font-dmSans text-lg text-gray-500">
                No students have appeared for this assessment
              </h2>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Appeared;
