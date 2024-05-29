import React from "react";
import { IoIosSearch } from "react-icons/io";
import { PiSlidersHorizontalLight } from "react-icons/pi";
import BackIcon from "../../../buttons/BackIcon";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";

const Header = ({ handleFilter }) => {
  const navigate = useNavigate();
  return (
    // <div className="flex w-full mx-auto justify-between mb-2">
    //   <button
    //     className="  self-center  rounded-lg h-10 w-10 "
    //     onClick={() => navigate(-1)}
    //   >
    //     <BackIcon />
    //   </button>
    //   <div className=" rounded-xl mx-2 w-full sm:h-12 h-10 flex my-2 ">
    //     <span className="w-fit mx-auto flex self-center">
    //       <IoIosSearch className="self-center w-10 h-10 bg-gray-100 rounded-s-lg text-gray-400 py-2 " />
    //       <input
    //         type="text"
    //         placeholder="Search..."
    //         name="search"
    //         onChange={handleFilter}
    //         className="placeholder pl-0 border-none self-center bg-gray-100 focus:outline-none focus:ring-0 rounded-e-lg sm:w-80 w-fit"
    //       />
    //     </span>
    //   </div>

    //   <button className="bg-gray-100  self-center  rounded-lg h-10 w-10 sm:h-12 sm:w-16">
    //     <PiSlidersHorizontalLight className="mx-auto  h-6 w-6" />
    //   </button>
    // </div>

    <div className="flex w-full mx-auto justify-between mb-6">
      {/* comp */}
      <div className="flex gap-3">
        <button
          className="self-center object-center rounded-lg h-10 w-10 "
          onClick={() => navigate(-1)}
        >
          <FaChevronLeft className=" p-3 rounded-lg h-10 w-10 self-center bg-gray-200" />
        </button>
      </div>

      {/* search */}
      <div className=" rounded-xl w-full sm:h-12 h-10 flex">
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

      <div className="flex gap-3 bg-[#D9E1E7">
        <PiSlidersHorizontalLight className="mx-auto  h-6 w-6" />
      </div>
    </div>
  );
};

export default Header;
