import React from "react";
import { useDispatch } from "react-redux";
import {
  getTest,
  selectStudentTest,
} from "../../../../redux/college/test/thunks/test";
import { getStudentCV } from "../../../../redux/college/student/studentSlice";
import Pagination from "../../../Pagination";

const Results = ({ assessmentResult, id, pagination }) => {
  const dispatch = useDispatch();
  const handleStatusChange = (testId, responseId) => async (event) => {
    const status = event.target.value;
    await dispatch(selectStudentTest({ testId, responseId, status }));
    dispatch(getStudentCV({ studentId: id, page: pagination?.currentPage }));
    // dispatch(getTestResultPage(testId));
  };
  // //console.log(assessmentResult);
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
    <div className="w-full px-6 py-4 space-y-4">
      {/* Header */}
      <div className="grid grid-cols-5  font-dmSans font-bold text-base bg-[#0052cc0d] px-2  rounded-xl">
        <div className="px-4 py-3">Name of test</div>
        <div className="px-4 py-3">Date</div>
        <div className="px-4 py-3">Topics</div>
        <div className="px-4 py-3">Score</div>
        <div className="px-4 py-3">Status</div>
      </div>

      {/* Content */}
      {assessmentResult?.length > 0 ? (
        <div className="space-y-2">
          {assessmentResult
            ?.filter((assessment) => assessment?.assessmentId?._id)
            .map((response, index) => (
              <div
                className="grid grid-cols-5 bg-white rounded-md border border-gray-200 text-sm"
                key={index}
              >
                <div className="px-4 py-3 truncate">
                  {response?.assessmentId?.name}
                </div>

                <div className="px-4 py-3 text-gray-600">
                  {formatDate(response?.createdAt)}
                </div>

                <div className="px-4 py-3 text-gray-600 truncate">
                  {response?.topics?.map((topic) => topic.Heading).join(", ")}
                </div>

                <div className="px-4 py-3">
                  <span
                    className={`font-medium ${
                      response.percentage >= 70
                        ? "text-green-600"
                        : response.percentage >= 40
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {response.percentage?.toFixed(2)}%
                  </span>
                </div>

                <div className="px-4 py-3">
                  <span
                    className={`
                  inline-flex px-2.5 py-1 rounded-full text-sm font-medium
                  ${
                    response?.status === "selected"
                      ? "bg-green-100 text-green-800"
                      : response?.status === "rejected"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }
                `}
                  >
                    {response?.status || "pending"}
                  </span>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="h-[100px] flex items-center justify-center text-gray-500 font-medium text-lg">
          No Result Found
        </div>
      )}

      {/* Pagination */}
      <div className="pt-4">
        <Pagination
          currentPage={pagination?.currentPage}
          onPageChange={(page) => {
            dispatch(getStudentCV({ studentId: id, page }));
          }}
          totalPages={pagination?.totalPages}
        />
      </div>
    </div>
  );
};

export default Results;
