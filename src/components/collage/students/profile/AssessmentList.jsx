import React, { useEffect } from "react";
import { CgUnavailable } from "react-icons/cg";
import calculateDaysAndWeeks from "../../../../util/daysAndWeeks";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getRecentStudentTests,
  removeFromRecent,
} from "../../../../redux/collage/test/thunks/test";
const AssessmentList = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { studentRecentassessment } = useSelector((state) => state.test);
  useEffect(() => {
    dispatch(getRecentStudentTests(id));
  }, []);
  console.log(studentRecentassessment);
  return (
    <div className="w-11/12 mt-2 rounded-lg bg-white min-h-[99%] mx-auto">
      <h2 className="text-base  font-bold text-center py-3 ">
        Recent Assessments Completed
      </h2>
      <div className="p-3 ">
        {studentRecentassessment?.map((assessment) => {
          return (
            <div className="flex flex-col md:gap-8">
              <div className="flex gap-3 items-center">
                <div className="min-w-[2.5rem] h-10  self-center rounded-lg">
                  <img
                    src="../../../images/teams.png"
                    alt=" user-icon"
                    className=" rounded-lg w-11 h-11"
                  />
                </div>
                <div>
                  <h2 className="text-xs  font-bold text-[#171717] ">
                    {assessment.assessment.name}
                  </h2>
                  <h2 className="text-xs  font-normal">
                    {assessment.assessment.description}
                  </h2>
                </div>
              </div>
              <div className="flex  mb-5 gap-2 justify-between">
                <div className="flex gap-2">
                  <button
                    className="rounded-lg bg-[#8F92A1] bg-opacity-5 p-2 text-base font-dmSans font-base"
                    onClick={() => {
                      navigate(
                        `/collage/results/overview?level=${assessment.assessment.level}&assessment=${assessment.assessment._id}`
                      );
                    }}
                  >
                    View
                  </button>
                  <button
                    className="rounded-lg p-3  bg-[#8F92A1] bg-opacity-5 self-center"
                    onClick={() =>
                      dispatch(removeFromRecent(assessment.assessment._id))
                    }
                  >
                    <CgUnavailable className="text-[#8F92A1] text-lg" />
                  </button>
                </div>

                <p className="text-xs  font-normal text-[#8F92A1]">
                  {calculateDaysAndWeeks(assessment.assessment.endDate)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AssessmentList;
