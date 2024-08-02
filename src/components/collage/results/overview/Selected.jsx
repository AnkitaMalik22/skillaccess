import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getselectedStudents } from "../../../../redux/collage/test/thunks/test";
import Skeleton from "../../../loaders/Skeleton";
const Selected = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("assessment");

  // //console.log(id);
  useEffect(() => {
    dispatch(getselectedStudents(id));
  }, []);
  const { selectedStudents, SELECTED_STUDENTS_LOADING } = useSelector(
    (state) => state.test
  );

  let percentageData = [];
  let colors = [];

  if (selectedStudents?.length > 0) {
    percentageData = selectedStudents.map((item) => item.percentage);

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
  const covertToDateFormat = (date) => {
    const d = new Date(date);
    return d.toDateString();
  };

  return (
    <div className="w-full mx-auto">
      {/* legend */}
      <div className=" grid-cols-5  text-center  mx-auto  font-dmSans font-bold text-base hidden md:grid">
        <div className="bg-[#0052CC] bg-opacity-5 rounded-s-lg p-2 ">
          <h2>Name and Profile</h2>
        </div>
        <div className="bg-[#0052CC] bg-opacity-5 p-2">
          <h2>Date</h2>
        </div>
        <div className="bg-[#0052CC] bg-opacity-5 p-2">
          <h2>Status</h2>{" "}
        </div>
        <div className="bg-[#0052CC]  bg-opacity-5 p-2">
          <h2>Assessment Performance(Mcq &Code)</h2>
        </div>
        <div className="bg-[#0052CC] bg-opacity-5 p-2 rounded-e-lg">
          <h2>Review</h2>
        </div>
      </div>

      {/* list to be iterated */}
      {SELECTED_STUDENTS_LOADING && <Skeleton />}
      {!SELECTED_STUDENTS_LOADING &&
        selectedStudents?.map((student, index) => (
          <div className=" grid-cols-5 rounded-lg my-4 py-2 pl-2   mx-auto  font-dmSans  text-sm hidden md:grid w-11/12">
            {" "}
            {/* row-2 */}
            <div className={` flex `}>
              <div className="flex self-center">
                <div className=" min-w-[3rem]  h-12 self-center  mr-2  ">
                  <img src="../../images/user.jpg" alt="" />
                </div>
                <span className="break-words min-w-24 pt-1 self-center">
                  <h2 className="font-dmSans font-semibold text-sm sm:text-base  ">
                    {student?.studentId?.FirstName}
                  </h2>
                </span>
              </div>
            </div>
            {/*  */}
            <div className="flex justify-center mr-16 ">
              <div className=" self-center h-fit ">
                <span>
                  <h2 className="font-dmSans  sm:text-sm ">
                    {covertToDateFormat(student?.completedAt)}
                  </h2>
                </span>
              </div>
            </div>
            {/*  */}
            <div className="flex justify-center">
              <div className=" self-center h-fit">
                <span>{student.status}</span>
              </div>
            </div>
            {/*  */}
            <div className="flex justify-center">
              <div className=" self-center">
                <span className="flex gap-2">
                  <div className="min-w-[6rem] bg-opacity-5 rounded-lg h-3 mx-auto bg-green-600">
                    <div
                      className={`h-full rounded-lg`}
                      style={{
                        width: `${student?.percentage}%`,
                        backgroundColor: colors[index],
                      }}
                    ></div>
                  </div>
                  <h2 className="font-dmSans font-bold text-xs sm:text-xs ">
                    {" "}
                    {student?.percentage?.toFixed(2)}%
                  </h2>
                </span>
              </div>
            </div>
            {/*  */}
            <div className="flex justify-end mr-3">
              <span
                className="self-center cursor-pointer"
                onClick={() =>
                  navigate(
                    `/collage/results/assessmentReview?studentId=${student.studentId._id}&assessmentId=${student.assessmentId}&responseId=${student._id}`
                  )
                }
              >
                <h2 className="font-dmSans  text-sm sm:text-base text-blue-500 ">
                  Assessment Review
                </h2>
              </span>
            </div>
          </div>
        ))}

      {!SELECTED_STUDENTS_LOADING &&
        selectedStudents &&
        selectedStudents?.length === 0 && (
          <div className="flex justify-center items-center h-96">
            <h2 className="font-dmSans text-lg text-gray-500">
              No students have selected for this assessment
            </h2>
          </div>
        )}
    </div>
  );
};

export default Selected;
