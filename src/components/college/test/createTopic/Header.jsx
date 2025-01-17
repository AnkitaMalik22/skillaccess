import React from "react";
import { FaAngleLeft, FaChevronLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../addVideo/Loader";

const Header = ({ next }) => {
  const navigate = useNavigate();
  const { test, ADD_tOPIC_LOADING } = useSelector((state) => state.test);
  return (
    <div className="flex w-full mx-auto justify-between mb-5 md:mb-10">
      {/* comp */}
      <div className="flex gap-3">
        <button
          className="bg-white border self-center rounded-md p-2 hover:shadow-md transition-shadow duration-300 hover:border-gray-500"
          onClick={() => navigate(-1)}
        >
          <FaAngleLeft className="h-5 w-5" />
        </button>
        <h2 className="text-xl md:text-[28px] font-bold self-center font-dmSans text-[#171717]">
          Create Topic
        </h2>
      </div>

      <div className="flex gap-3">
        <button
          className="bg-accent self-center text-white rounded-md h-10 w-10 sm:w-32 flex items-center justify-center"
          onClick={() => next()}
        >
          Next Step{" "}
          {!ADD_tOPIC_LOADING && (
            <FaArrowRightLong className="self-center text-lg text-white ml-4" />
          )}
          {ADD_tOPIC_LOADING && <Loader size="sm" />}
        </button>{" "}
      </div>
    </div>
  );
};

export default Header;
