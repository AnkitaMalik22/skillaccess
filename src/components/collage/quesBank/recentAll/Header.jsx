import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between mb-2 mt-5">
      <div>
        <button className="flex self-center  rounded-lg  gap-2">
          <button onClick={() => navigate(-1)} className="mt-2 mr-3">
            <FaChevronLeft className=" p-3 rounded-lg h-10 w-10 self-center bg-gray-200" />
          </button>

          <div className="self-center flex ">
            <h2 className="sm:text-xl mt-2 text-left font-bold self-center text-3xl font-dmSans ">
              Recent used Questions
            </h2>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Header;
