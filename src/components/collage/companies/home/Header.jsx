import React from "react";
import { IoIosSearch } from "react-icons/io";
import BackIcon from "../../../buttons/BackIcon";
import { PiSlidersHorizontalLight } from "react-icons/pi";
import { FiPlus, FiUpload } from "react-icons/fi";

import { useNavigate } from "react-router-dom";

const Header = ({ handleFilter }) => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full mx-auto justify-between mb-6">
      {/* comp */}
      <span className="flex gap-2">
        <button
          className="  self-center object-center  rounded-lg h-10 w-10 "
          // onClick={() => navigate('collage/companies')}
        >
          <img src="../../images/icons/sales.jpg" alt="" />
        </button>
        <h2 className="text-xl md:text-[28px] font-bold self-center font-dmSans text-[#171717]">
          Companies
        </h2>
      </span>

      {/* search */}
      <div className=" rounded-xl w-full sm:h-12 h-10 flex">
        <span className="w-fit mx-auto flex self-center bg-[#F8F8F9] rounded-xl px-5 py-3 gap-3">
          <IoIosSearch className="self-center w-6 h-6 bg-gray-100 rounded-s-lg text-gray-400 " />
          <input
            type="text"
            placeholder="Search..."
            onChange={handleFilter}
            className="placeholder p-0 border-none self-center bg-gray-100 focus:outline-none focus:ring-0 rounded-e-lg sm:w-80 w-fit"
          />
        </span>
      </div>

      <div className="flex gap-3">
        <button
          className="self-center justify-center flex bg-[#8f92a11a] px-7 py-3 rounded-2xl gap-2 text-sm text-[#171717] font-bold "
          // onClick={() => navigate("/collage/test/addMcq")}
        >
          <FiPlus className="self-center text-lg " /> Add
        </button>

        <button
          className="self-center justify-center flex bg-[#0052CC] px-5 py-3  rounded-2xl text-white  gap-2 text-md font-bold w-40"
          // onClick={() => navigate("/collage/test/addMcq")}
        >
          <FiUpload className="self-center text-lg " /> Upload New
        </button>
        <button className="bg-[#8f92a11a]  self-center  rounded-lg h-10 w-10 sm:h-12 sm:w-16 flex items-center justify-center">
          <img src="../../images/icons/Filter.png" className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
};

export default Header;
