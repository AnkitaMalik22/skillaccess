import React from "react";
import {
  FaAngleLeft,
  FaChevronDown,
  FaPlus,
  FaSearch,
  FaSortDown,
} from "react-icons/fa";
import { PiSlidersHorizontalLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const Header = ({handleFilter}) => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full mx-auto justify-between mb-2 font-dmSans">
      <div className="bg-gray-200 rounded-xl mx-2  sm:h-12 h-10 flex my-2 px-4 w-fit">
        <FaSearch className="self-center w-5 h-5 ml-1 text-gray-400" />
        <input
          type="text"
          // placeholder="Search student, stream, class, email…"
          placeholder="Search student , email..."
          onChange={handleFilter}
          className="input border-none self-center bg-gray-200 focus:outline-none input-md sm:w-96 max-w-md mx-auto placeholder-gray-400 "
        />
        <FaSortDown className="self-center pb-1 text-gray-400" />
      </div>

      {/* <button className=" self-center mr-2 rounded-lg h-10 w-10 sm:h-12 sm:w-16">
        <PiSlidersHorizontalLight className="mx-auto sm:h-8 sm:w-8 h-6 w-6" />
      </button> */}
    </div>
  );
};

export default Header;
