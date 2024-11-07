import React from "react";
import { IoIosSearch } from "react-icons/io";
import BackIcon from "../../../buttons/BackIcon";
import { PiSlidersHorizontalLight } from "react-icons/pi";
import { FiPlus, FiUpload } from "react-icons/fi";

import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full mx-auto justify-between mb-6">
      {/* comp */}
      <span className="flex gap-2">
        <button
          className="  self-center object-center  rounded-lg h-10 w-10 "
          onClick={() => navigate(-1)}
        >
          <img src="../../images/icons/sales.jpg" alt="" />
        </button>
        <h2 className="text-[28px] leading-[36px] font-bold self-center font-dmSans">
          Companies
        </h2>
      </span>

      {/* search */}
      <div className=" rounded-xl mx-2 w-full sm:h-12 h-10 flex my-2 ">
        <span className="w-fit mx-auto flex self-center">
          <IoIosSearch className="self-center w-10 h-10 bg-gray-100 rounded-s-lg text-gray-400 py-2 " />
          <input
            type="text"
            placeholder="Search"
            className="placeholder pl-0 border-none self-center bg-gray-100 focus:outline-none focus:ring-0 rounded-e-lg sm:w-80 w-fit"
          />
        </span>
      </div>

      <span className="flex gap-2">
        {/* <button
          className="self-center justify-center flex bg-[#F8F8F9] py-3  rounded-xl w-32  gap-2 "
          // onClick={() => navigate("/collage/test/addMcq")}
        >
          <FiPlus className="self-center text-lg " /> Add
        </button> */}

        {/* <button
          className="self-center justify-center flex bg-accent py-3  rounded-xl w-48 text-white  gap-2 "
          // onClick={() => navigate("/collage/test/addMcq")}
        >
          <FiUpload className="self-center text-lg " /> Upload Questions
        </button> */}
        <button className="bg-gray-100  self-center  rounded-lg h-10 w-10 sm:h-12 sm:w-16">
          <PiSlidersHorizontalLight className="mx-auto  h-6 w-6" />
        </button>
      </span>
    </div>
  );
};

export default Header;
