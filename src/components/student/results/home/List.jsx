import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { getAllTests } from "../../../../redux/college/test/thunks/test";

const List = () => {
  const arr = [{ name: "ytasd", studentResponses: [], _id: "asd" }];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const assessments = useSelector((state) => state.test.assessments);
  const beginner = useSelector((state) => state.test.assessments.beginner);

  // asessments ={beginner: Array(2), intermediate: Array(0), advanced: Array(0)} write in one array

  // let arr = assessments.beginner.concat(
  //   assessments.intermediate,
  //   assessments.advanced
  // );

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
      <div className=" grid-cols-6  text-center  mx-auto  font-dmSans font-bold text-base hidden md:grid">
        <div className="bg-accent bg-opacity-5 rounded-s-lg p-2 ">
          <h2>Assessment Name</h2>
        </div>
        <div className="bg-accent bg-opacity-5 p-2">
          <h2>Your Score</h2>
        </div>
        <div className="bg-accent bg-opacity-5 p-2">
          <h2>Performance</h2>{" "}
        </div>
        <div className="bg-accent  bg-opacity-5 p-2">
          <h2>Profile</h2>
        </div>
        <div className="bg-accent bg-opacity-5 rounded-s-lg p-2 ">
          <h2>Status</h2>
        </div>
        <div className="bg-accent bg-opacity-5 p-2 rounded-e-lg">
          <h2>Details</h2>
        </div>
      </div>

      {/* list to be iterated */}
      {arr.map((assessment) => (
        <div className=" grid-cols-6 rounded-md my-4 py-2 pl-2 text-center  mx-auto  font-dmSans  text-sm hidden md:grid w-full">
          {" "}
          {/* row-2 */}
          <div className={` flex justify-center `}>
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
          {/*  */}
          <div className="flex justify-center">
            <div className=" self-center">
              <span className="flex gap-2">
                <div className="min-w-[6rem] bg-opacity-5 rounded-md h-3 mx-auto bg-green-600">
                  <div className={`w-3/5 bg-green-700 h-full rounded-md`}></div>
                </div>
                <h2 className="font-dmSans font-bold text-sm sm:text-sm ">
                  {" "}
                  70%
                </h2>
              </span>
            </div>
          </div>
          {/*  */}
          <div className="flex justify-center">
            <div className=" self-center h-fit">
              <span>
                <h2 className="font-dmSans  sm:text-sm">UI/UX Designer</h2>
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <div className=" w-fit self-center h-fit">
              <span className="w-fit">
                <h2 className="font-dmSans w-fit font-bold text-green-600 text-center sm:text-sm">
                  Selected
                </h2>
              </span>
            </div>
          </div>
          <div className="flex justify-center mr-3">
            <span
              className="self-center hover:cursor-pointer "
              onClick={() =>
                navigate(
                  `/student/results/overview?level=beginner&assessment=${assessment._id}`
                )
              }
            >
              <h2 className="font-dmSans  text-sm sm:text-base text-blued ">
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
