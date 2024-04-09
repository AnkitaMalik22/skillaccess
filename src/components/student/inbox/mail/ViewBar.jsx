import React from "react";
import { FaSortDown } from "react-icons/fa";
import { FiCornerUpLeft, FiCornerUpRight, FiTrash } from "react-icons/fi";
import { TiStarOutline } from "react-icons/ti";

const ViewBar = () => {
  return (
    <div className="flex w-full">
      <div className="w-full flex justify-between self-center">
        <div className="flex gap-2">
          {/* photo */}
          <div className="h-10 w-10 rounded-lg bg-blued"></div>
          {/*  */}

          <div className="flex gap-1 self-center flex-col">
            <p className="text-sm font-bold self-center">Reply</p>
            <span className="flex gap-2">
              <p className="text-sm font-bold  text-gray-400">to</p>
              <FaSortDown className="text-gray-400" />
            </span>
          </div>
        </div>

        {/* icons */}
        <div className="flex justify-between w-1/4">
          <FiTrash className="text-lg self-center text-gray-400" />
          <TiStarOutline className="text-lg self-center" />
          <FiCornerUpLeft className="text-lg self-center text-gray-400" />
          <FiCornerUpRight className="text-lg self-center text-gray-400" />

          <p className="text-xs font-bold self-center">10:30PM</p>
        </div>
      </div>
    </div>
  );
};

export default ViewBar;
