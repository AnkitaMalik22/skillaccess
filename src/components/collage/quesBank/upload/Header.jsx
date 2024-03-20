import React from "react";
import { PiSlidersHorizontalLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import BackIcon from "../../../buttons/BackIcon";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full mx-auto justify-between mb-2 font-dmSans">
      <button
        className="  self-center  rounded-lg h-10 w-10 "
        onClick={() => navigate(-1)}
      >
        <BackIcon />
      </button>

      <button className="bg-[#0052CC] text-white font-bold  self-center   text-sm 3xl:text-base rounded-lg py-3 px-6">
        Upload New
      </button>
    </div>
  );
};

export default Header;
