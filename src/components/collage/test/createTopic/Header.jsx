import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Header = ({ next }) => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full mx-auto justify-between mb-6">
      {/* comp */}
      <div className="flex gap-3">
        <button
          className="self-center object-center rounded-lg h-10 w-10 "
          onClick={() => navigate(-1)}
        >
          <FaChevronLeft className=" p-3 rounded-lg h-10 w-10 self-center bg-gray-200" />
        </button>
        <h2 className="text-xl md:text-[28px] font-bold self-center font-dmSans text-[#171717]">
          Create Topic
        </h2>
      </div>

      <div className="flex gap-3">
        <button
          className="bg-[#8f92a11a]  self-center  rounded-lg h-10 w-10 sm:h-12 sm:w-16 flex items-center justify-center"
          onClick={() => next()}
        >
          Next Step{" "}
          <FaArrowRightLong className="self-center text-lg text-white ml-4" />
        </button>
      </div>
    </div>
  );
};

export default Header;
