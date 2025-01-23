import React from "react";
import { FaChevronLeft } from "react-icons/fa";
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
          className="self-center object-center rounded-md h-10 w-10 "
          onClick={handlePrev}
        >
          <FaChevronLeft className=" p-3 rounded-md h-10 w-10 self-center bg-[#D9E1E7]" />
        </button>
        <h2 className="text-xl md:text-[28px] font-bold self-center font-dmSans text-[#171717]">
          {title || "Create Assessment"}
        </h2>
      </div>

      {!hideNext && (
        <div className="flex gap-3">
          <button
            className="bg-accent self-center text-white rounded-md h-10 w-10 sm:w-32 flex items-center justify-center"
            onClick={() => handleNext()}
          >
            Next
            <FaArrowRightLong className="self-center text-lg text-white ml-4" />
          </button>{" "}
        </div>
      )}
      {children}
    </div>
  );
};

export default HeaderCompany;
