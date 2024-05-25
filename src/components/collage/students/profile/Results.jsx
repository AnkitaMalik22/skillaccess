import React from "react";
import { useDispatch } from "react-redux";
import {
  getTest,
  selectStudentTest,
} from "../../../../redux/collage/test/thunks/test";
import { getStudentCV } from "../../../../redux/collage/student/studentSlice";

const Results = ({ assessmentResult, id }) => {
  const dispatch = useDispatch();
  const handleStatusChange = (testId, responseId) => async (event) => {
    const status = event.target.value;
    await dispatch(selectStudentTest({ testId, responseId, status }));
    dispatch(getStudentCV(id));
    // dispatch(getTestResultPage(testId));
  };
  console.log(assessmentResult);
  function formatDate(dateStr) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const dateObj = new Date(dateStr);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = months[dateObj.getMonth()];
    const year = String(dateObj.getFullYear()).slice(-2);

    return `${day} ${month} -${year}`;
  }
  return (
    <div className="px-4  ">
      <div className=" grid grid-cols-5 text-center mt-3 bg-[#8F92A1] bg-opacity-10 rounded-lg ">
        <span className="w-full   p-2 font-bold font-dmSans">Name of test</span>
        <span className="w-full   p-2 font-bold font-dmSans">Date</span>
        <span className="w-full   p-2 font-bold font-dmSans">Topics</span>
        <span className="w-full   p-2 font-bold font-dmSans">Score</span>
        <span className="w-full  p-2 font-bold font-dmSans">Status</span>
      </div>

      {/* iterable  */}
      {assessmentResult?.map((response, index) => {
        return (
          <div
            className=" grid grid-cols-5 text-center mt-3 bg-white rounded-lg "
            key={index}
          >
            <span className="w-full   py-2 text-sm font-dmSans">
              Wipro web -Fresher -aug2021{" "}
            </span>
            <span className="w-full   p-2 text-sm font-dmSans">
              {formatDate(response.completedAt)}
            </span>
            <span className="w-full   p-2 text-sm font-dmSans">
              {response.topics.map((topic) => topic.Heading).join(", ")}
            </span>
            <span className="w-full   p-2 text-sm font-dmSans">
              {response.percentage}%
            </span>
            <div className="flex justify-center">
              <div className=" self-center h-fit">
                <span>
                  <select
                    className="font-dmSans border-none focus:border-none bg-transparent focus:ring-0 sm:text-sm"
                    onChange={handleStatusChange(
                      response.assessmentId,
                      response._id
                    )}
                    value={response.status}
                  >
                    <option value="">pending</option>
                    <option value="rejected">rejected</option>
                    <option value="selected">selected</option>
                  </select>
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Results;
