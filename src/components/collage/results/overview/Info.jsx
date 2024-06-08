import React from "react";
import { useEffect } from "react";
import { getTest } from "../../../../redux/collage/test/testSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Info = ({ user, assessment }) => {
  return (
    <div className="flex justify-between bg-[#8F92A1]   bg-opacity-5 p-5 items-center">
      <div className="flex  gap-5 items-center">
        <div className="flex object-cover rounded-xl  self-center p-2 bg-white md:h-20 md:w-20 h-16 w-16">
          <img
            src={user?.avatar?.public_url || "../../images/companyLogo.png"}
            alt="college logo"
            className="self-center"
          />
        </div>

        <div className="font-dmSans">
          <h2 className="text-lg font-bold text-[#171717]">
            {assessment?.name}
          </h2>

          <h2 className="text-[#7D7D7D] text-xs ">Available Jobs</h2>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-10 text-center font-dmSans">
        <div className="self-center">
          <h2 className="text-xs font-bold text-[#8E91A0] mb-1">Time Period</h2>

          <h2 className="text-sm font-bold text-[#171717]">
            {assessment?.totalTime} mins
          </h2>
        </div>

        <div className="self-center">
          <h2 className="text-xs font-bold text-[#8E91A0] mb-1">Timeline</h2>
          <h2 className="text-sm font-bold text-[#171717]">16 sep - 20 sep</h2>
        </div>

        <div className="self-center">
          <h2 className="text-xs font-bold text-[#8E91A0] mb-1">
            Students Appeared
          </h2>

          <h2 className="text-sm font-bold text-[#171717]">
            {assessment?.studentResponses?.length}
          </h2>
        </div>

        <div className="self-center">
          <h2 className="text-xs font-bold text-[#8E91A0] mb-1">Attempts</h2>

          <h2 className="text-sm font-bold text-[#171717]">
            {assessment?.totalAttempts}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Info;
