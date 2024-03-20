import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { getStudentResponse } from "../../../../redux/collage/test/testSlice";

const Appeared = ({ assessment }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const arr = [2, 1, 1, 1, 1];
  // let arr = assessment.studentResponses.map((responseId) => {
  //   // console.log(student);
  //   dispatch(getStudentResponse(responseId))
  //   return student;
  // }
  // );

  // const responses= assessment.studentResponses.forEach((responseId)=>{
  // dispatch(getStudentResponse(responseId))
  //   })

  //   console.log(response)

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
      {arr.map((student) => (
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
                  {student.FirstName}
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
              <span>
                <select
                  name=""
                  id=""
                  className="font-dmSans border-none focus:border-none bg-transparent focus:ring-0 sm:text-sm"
                >
                  <option>pending</option>
                  <option>rejected</option>
                  <option>selected</option>
                </select>
              </span>
            </div>
          </div>
          {/*  */}
          <div className="flex justify-center">
            <div className=" self-center">
              <span className="flex gap-2">
                <div className="min-w-[6rem] bg-opacity-5 rounded-lg h-3 mx-auto bg-green-600">
                  <div
                    className={`w-3/5 bg-[#DE350B] bg-opacity-70 h-full rounded-lg`}
                  ></div>
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
              className="self-center cursor-pointer"
              onClick={() => navigate("/collage/results/assessmentReview/0")}
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

export default Appeared;
