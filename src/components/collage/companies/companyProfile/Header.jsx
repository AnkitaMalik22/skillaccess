import React from "react";
import { FaAngleLeft, FaChevronLeft, FaPlus, FaSearch } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { PiSlidersHorizontalLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const Header = ({ CompanyName, handleFilter }) => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full mx-auto justify-between mb-6">
      {/* comp */}
      <span className="flex gap-3">
        <button
          className="bg-[#D9E1E7]  self-center object-center  rounded-lg p-3"
          onClick={() => navigate(-1)}
        >
          <FaAngleLeft className="mx-auto sm:h-6 sm:w-6 h-4 w-4" />
        </button>

        <h2 className="text-xl md:text-[28px] font-bold self-center font-dmSans text-[#171717]">
          {CompanyName}
        </h2>
      </span>

      {/* search */}
      <div className="rounded-xl w-full sm:h-12 h-10 flex">
        <div className="w-fit mx-auto flex self-center bg-[#F8F8F9] rounded-xl px-5 py-3 gap-3">
          <IoIosSearch className="self-center w-6 h-6 bg-gray-100 rounded-s-lg text-gray-400 " />
          <input
            type="text"
            placeholder="Search..."
            onChange={handleFilter}
            className="placeholder p-0 border-none self-center bg-gray-100 focus:outline-none focus:ring-0 rounded-e-lg sm:w-80 w-fit"
          />
        </div>
      </div>

      <div className="flex gap-3 bg-[#F8F8F9] p-3 rounded-lg">
        <PiSlidersHorizontalLight className="mx-auto sm:h-8 sm:w-8 h-6 w-6" />
      </div>
    </div>
  );
};

export default Header;
