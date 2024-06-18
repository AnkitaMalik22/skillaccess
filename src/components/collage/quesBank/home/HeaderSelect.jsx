import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Header = ({ Q }) => {
  const navigate = useNavigate();

  return (
    <div className="flex  justify-between mb-2 mt-5">
      <div>
        <button className="flex items-center ml-2 rounded-lg  gap-2">
          <button
            className="bg-[#D9E1E7]  self-center ml-2 rounded-lg h-10 w-10 sm:h-12 sm:w-14"
            onClick={() => navigate(-1)}
          >
            <img src="../../../../images/icons/back.png" alt="" srcset="" />
          </button>

          <div className="">
            <h2 className="sm:text-xl  text-left font-bold self-center text-3xl font-dmSans  ">
              Add Questions
            </h2>
          </div>
        </button>
      </div>

      <div className="bg-gray-100 rounded-xl mx-2   h-12 flex my-2 ">
        <div className=" flex">
          <button
            className="self-center justify-center flex bg-[#0052CC] py-3 px-8 rounded-2xl text-xs gap-2 text-white"
            onClick={() => navigate(`/collage/quesBank/topic`)}
          >
            View All
            <FaArrowRightLong className="self-center text-lg text-white ml-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
