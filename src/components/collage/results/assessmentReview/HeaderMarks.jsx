import React from "react";

import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getTest,
  getTestResultPage,
} from "../../../../redux/collage/test/thunks/test";

const HeaderMarks = ({ response, totalQuestions }) => {
  const dispatch = useDispatch();

  const searchParams = new URLSearchParams(window.location.search);
  const assessmentId = searchParams.get("assessmentId");
  const assessment = useSelector((state) => state.test.test);
  useEffect(() => {
    dispatch(getTest(assessmentId));
    dispatch(getTestResultPage(assessmentId));
  }, [dispatch, assessmentId]);
  console.log(response);
  return (
    <div className="flex justify-between items-center bg-[#8F92A1] bg-opacity-5 p-5 md:p-8 gap-2 mb-5 md:mb-10 rounded-2xl">
      <div className="flex flex-col w-1/2">
        <div className="mb-4">
          <p className="text-lg text-[#171717] text-opacity-50 font-bold">
            Test Name
          </p>

          <h2 className="font-bold text-[#171717] text-xl first-letter:capitalize">
            {assessment?.name}
          </h2>
        </div>
        <div className="flex justify-between mb-4">
          <div className="w-1/2 ">
            <p className="text-lg text-[#171717] text-opacity-50 font-bold">
              Questions Attempted
            </p>
            <h2 className="font-bold text-[#171717] text-xl first-letter:capitalize">
              {response?.totalQuestionsAttempted || 0}{" "}
            </h2>
          </div>{" "}
          <div className="w-1/2">
            <p className="text-lg text-[#171717] text-opacity-50 font-bold">
              Correct Answers
            </p>

            <h2 className="font-bold text-[#171717] text-xl first-letter:capitalize">
              {response?.correctAnswers}
            </h2>
          </div>
        </div>
        <div className="flex justify-between ">
          <div className="w-1/2">
            <p className="text-lg text-[#171717] text-opacity-50 font-bold">
              Time Taken
            </p>

            <h2 className="font-bold text-[#171717] text-xl first-letter:capitalize">
              {response?.timeTaken < 60
                ? "<1"
                : Math.floor(response?.timeTaken / 60)}{" "}
              mins
            </h2>
          </div>
          <div className="w-1/2">
            <p className="text-lg text-[#171717] text-opacity-50 font-bold">
              Overall Result
            </p>
            <h2 className="font-bold text-[#171717] text-xl first-letter:capitalize">
              {response?.percentage?.toFixed(2)}%
            </h2>
          </div>
        </div>
      </div>
      <div className=" w-[200px] h-[200px] flex flex-row justify-center items-center gap-10 mt-22 mb-23  px-12 py-30 rounded-full shadow-md border border-[#2FD790]">
        <p className="text-[32px] font-bold text-[#2fd790]">
          {response?.totalMarks + "/" + assessment?.totalMarks}
        </p>
      </div>
    </div>
  );
};

export default HeaderMarks;
