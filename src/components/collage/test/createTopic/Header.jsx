import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../addVideo/Loader";

const Header = ({ next }) => {
  const navigate = useNavigate();
  const { test, ADD_tOPIC_LOADING } = useSelector((state) => state.test);
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
          className="bg-[#0052CC] self-center text-white rounded-lg h-10 w-10 sm:w-32 flex items-center justify-center"
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
