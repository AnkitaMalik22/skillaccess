import React from "react";
import { FaAngleLeft, FaChevronLeft, FaPlus, FaSearch } from "react-icons/fa";
import { PiSlidersHorizontalLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex w-[95%] mx-auto justify-between mb-2 font-dmSans">
      <span className="flex gap-4">
        <button
          className="bg-gray-200  self-center ml-2 rounded-md h-10 w-10 sm:h-12 sm:w-16"
          onClick={() => navigate(-1)}
        >
          <FaAngleLeft className="mx-auto sm:h-6 sm:w-6 h-4 w-4" />
        </button>
        <h2 className="text-xl font-bold self-center">
          UX UI Designer, Google
        </h2>
      </span>
    </div>
  );
};

export default Header;
