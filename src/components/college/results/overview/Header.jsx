import React from "react";
import { FaAngleLeft, FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full mx-auto justify-between items-start ">
      <div className="flex gap-3">
        <button
          className="bg-white border self-center rounded-md p-2 hover:shadow-md transition-shadow duration-300 hover:border-gray-500"
          onClick={() => navigate(-1)}
        >
          <FaAngleLeft className="h-5 w-5" />
        </button>
      </div>
      <div className="object-fill rounded-2xl ">
        <img src="/images/overview.png" alt="overview" className="w-full" />
      </div>
    </div>
  );
};

export default Header;
