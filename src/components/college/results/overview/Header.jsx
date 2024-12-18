import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full mx-auto justify-between items-start ">
      <div className="flex gap-3">
        <button
          className="self-center object-center rounded-lg h-10 w-10 "
          onClick={() => navigate(-1)}
        >
          <FaChevronLeft className=" p-3 rounded-lg h-10 w-10 self-center bg-[#D9E1E7]" />
        </button>
      </div>
      <div className="object-fill rounded-2xl ">
        <img
          src="/images/overview.png"
          alt="overview"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Header;
