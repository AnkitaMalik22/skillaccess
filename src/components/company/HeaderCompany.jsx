import React from "react";
import { FaAngleLeft, FaAngleRight, FaChevronLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const HeaderCompany = ({
  handleNext,
  handlePrev,
  title,
  hideNext,
  children,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full mx-auto justify-between mb-5 items-center">
      <div className="flex gap-3">
        <button
          className="bg-white border self-center rounded-md p-2 hover:shadow-md transition-shadow duration-300 hover:border-gray-500"
          onClick={handlePrev}
        >
          <FaAngleLeft className="h-5 w-5" />
        </button>
        <h2 className="text-xl md:text-[28px] font-bold self-center font-dmSans text-[#171717]">
          {title || "Create Assessment"}
        </h2>
      </div>

      {!hideNext && (
        <div className="flex gap-3">
          <button
            className="bg-white border self-center rounded-md p-2 hover:shadow-md transition-shadow duration-300 hover:border-gray-500"
            onClick={() => handleNext()}
          >
            Next
            <FaAngleRight className="h-5 w-5" />
          </button>{" "}
        </div>
      )}
      {children}
    </div>
  );
};

export default HeaderCompany;
