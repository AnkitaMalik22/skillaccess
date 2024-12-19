import React from "react";
import { useEffect } from "react";
import { getTest } from "../../../../redux/college/test/testSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Info = ({ user, assessment }) => {
  return (
    <div className="flex justify-between bg-[#8F92A1]   bg-opacity-5 p-5">
      <div className="flex  gap-7">
        <div className="w-14  flex object-cover rounded-xl  self-center  p-2 h-16 bg-white">
          <img
            src={user?.avatar?.public_url || "/images/companyLogo.png"}
            alt="college logo"
            className="self-center"
          />
        </div>

        <div className="font-dmSans">
          <h2 className="text-lg font-bold mb-1">
            {assessment?.name || "SDSAD"}
          </h2>

          <h2 className="text-xs mb-2">gOODLE iNC.</h2>
          <h2 className="text-[#7D7D7D] text-xs">Available Jobs</h2>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-14 text-center font-dmSans">
        <div className="self-center">
          <h2 className="text-xs font-bold text-gray-400 mb-2">YOUR SCORE</h2>

          <h2 className="text-sm font-bold ">-</h2>
        </div>

        <div className="self-center">
          <h2 className="text-xs font-bold text-gray-400 mb-2">
            AVERAGE SCORE
          </h2>
          <h2 className="text-sm font-bold ">-</h2>
        </div>

        <div className="self-center">
          <h2 className="text-xs font-bold text-gray-400 mb-2">STATUS</h2>

          <h2 className="text-sm font-bold text-amber-500 ">Under Review</h2>
        </div>

        <div className="self-center">
          <h2 className="text-xs font-bold text-gray-400 mb-2">TIME</h2>

          <h2 className="text-sm font-bold ">2hrs</h2>
        </div>
        <div className="self-center">
          <h2 className="text-xs font-bold text-gray-400 mb-2">DUE DATE</h2>

          <h2 className="text-sm font-bold ">-</h2>
        </div>
      </div>
    </div>
  );
};

export default Info;
