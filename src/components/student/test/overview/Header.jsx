import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { PiSlidersHorizontalLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between mb-2 font-dmSans mt-4 ">
      <span className="flex gap-4">
        <button
          className="bg-[#D9E1E7]   ml-2 rounded-lg h-10 w-10 sm:h-12 sm:w-16"
          onClick={() => navigate(-1)}
        >
          <FaChevronLeft className="mx-auto  h-4 w-4 font-light" />
        </button>
        <div className="object-fill rounded-2xl ">
          <img
            src="../../images/overview.png"
            alt="overview"
            className="w-full"
          />
        </div>
      </span>
    </div>
  );
};

export default Header;
