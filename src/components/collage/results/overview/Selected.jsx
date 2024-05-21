import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getselectedStudents } from "../../../../redux/collage/test/thunks/test";
const Selected = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("assessment");

  const getProgressBarColor = (percentage) => {
    if (percentage === 0) {
      return ""; // Return empty string for transparent
    } else if (percentage > 0 && percentage < 33.33) {
      return "bg-red-600"; // Red color
    } else if (percentage >= 33.33 && percentage < 66.66) {
      return "bg-blue-600"; // Blue color
    } else {
      return "bg-green-600"; // Green color
    }
  };
  const getProgressBarWidth = (percentage) => {
    if (percentage === 0) {
      return 0; // Width is 0 when percentage is 0
    } else if (percentage < 33.33) {
      return 40; // 2/5 width
    } else if (percentage < 66.66) {
      return 60; // 3/5 width
    } else {
      return 100; // Full width
    }
  };
  console.log(id);
  useEffect(() => {
    dispatch(getselectedStudents(id));
  }, []);
  const { selectedStudents } = useSelector((state) => state.test);
  console.log(selectedStudents);
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
      {selectedStudents?.map((student, index) => (
        <div className=" grid-cols-5 rounded-lg my-4 py-2 pl-2   mx-auto  font-dmSans  text-sm hidden md:grid w-11/12">
          {" "}
          {/* row-2 */}
          <div className={` flex `}>
            <div className="flex self-center">
              <div className=" min-w-[3rem]  h-12 self-center  mr-2  ">
                <img src="../../images/user.jpg" alt="" />
              </div>
              <span className="break-words min-w-0 pt-1 self-center">
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
                  1st March - 8th March
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
                    className={`h-full rounded-lg ${getProgressBarColor(
                      student?.percentage
                    )}`}
                    style={{ width: `${student?.percentage}%` }}
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
    </div>
  );
};

export default Selected;
