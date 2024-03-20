import { useSelect } from "@mui/base";
import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { getAllTests } from "../../../../redux/collage/test/testSlice";

const List = () => {
  // const arr = [2, 1, 1, 1, 1];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const assessments = useSelector((state) => state.test.assessments);
  const beginner = useSelector((state) => state.test.assessments.beginner);

  // asessments ={beginner: Array(2), intermediate: Array(0), advanced: Array(0)} write in one array

  let arr = assessments.beginner.concat(
    assessments.intermediate,
    assessments.advanced
  );

  let totalStudentsAppeared = 0;
  let totalStudentsSelected = 0;
  let overallPerformance = 0;

  useEffect(() => {
    // dispatch(getCollege());
    dispatch(getAllTests());
  }, [dispatch]);

  return (
    <div className="w-full mx-auto">
      {/* legend */}
      <div className=" grid-cols-5  text-center  mx-auto  font-dmSans font-bold text-base hidden md:grid">
        <div className="bg-[#0052CC] bg-opacity-5 rounded-s-lg p-2 ">
          <h2>Test Name</h2>
        </div>
        <div className="bg-[#0052CC] bg-opacity-5 p-2">
          <h2>Total Students Appeared</h2>
        </div>
        <div className="bg-[#0052CC] bg-opacity-5 p-2">
          <h2>Total Students Selected</h2>{" "}
        </div>
        <div className="bg-[#0052CC]  bg-opacity-5 p-2">
          <h2>Overall Performance</h2>
        </div>
        <div className="bg-[#0052CC] bg-opacity-5 p-2 rounded-e-lg">
          <h2>Details</h2>
        </div>
      </div>

      {/* list to be iterated */}
      {arr.map((assessment) => (
        <div className=" grid-cols-5 rounded-lg my-4 py-2 pl-2 text-center  mx-auto  font-dmSans  text-sm hidden md:grid w-11/12">
          {" "}
          {/* row-2 */}
          <div className={` flex `}>
            <div className="flex self-center">
              <span>
                <h2 className="font-dmSans  sm:text-sm">{assessment.name}</h2>

                {/* <h2 className="font-dmSans  sm:text-sm"> */}
              </span>
            </div>
          </div>
          {/*  */}
          <div className="flex justify-center ">
            <div className=" self-center h-fit">
              <span>
                <h2 className="font-dmSans  sm:text-sm">
                  {assessment.studentResponses.length}
                </h2>
              </span>
            </div>
          </div>
          {/*  */}
          <div className="flex justify-center">
            <div className=" self-center h-fit">
              <span>
                <h2 className="font-dmSans  sm:text-sm">{0}</h2>
              </span>
            </div>
          </div>
          {/*  */}
          <div className="flex justify-center">
            <div className=" self-center">
              <span className="flex gap-2">
                <div className="min-w-[6rem] bg-opacity-5 rounded-lg h-3 mx-auto bg-green-600">
                  <div className={`w-3/5 bg-green-700 h-full rounded-lg`}></div>
                </div>
                <h2 className="font-dmSans font-bold text-xs sm:text-xs ">
                  {" "}
                  70%
                </h2>
              </span>
            </div>
          </div>
          {/*  */}
          <div className="flex justify-end mr-3">
            <span
              className="self-center hover:cursor-pointer "
              onClick={() =>
                navigate(
                  `/collage/results/overview?level=beginner&assessment=${assessment._id}`
                )
              }
            >
              <h2 className="font-dmSans  text-sm sm:text-base text-blue-500 ">
                View Details
              </h2>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
