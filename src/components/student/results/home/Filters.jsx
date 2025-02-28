import React from "react";
import { FaAngleLeft, FaChevronLeft, FaPlus, FaSearch } from "react-icons/fa";
import { FiPlus, FiUpload } from "react-icons/fi";
import { PiSlidersHorizontalLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const Filter = () => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full mx-auto justify-between mb-2 font-dmSans">
      <span className="flex gap-12">
        <div className="flex gap-0">
          <button
            className=" self-center ml-2 rounded-md h-10 w-10 sm:h-12 "
            onClick={() => navigate(-1)}
          >
            <img src="/images/icons/list.png" alt="" />
          </button>
          <h2 className="font-extrabold text-lg self-center">
            Performance Review
          </h2>
        </div>

        <div className="bg-gray-100 rounded-xl mx-2  sm:h-12 h-10 flex my-2 px-4 w-fit">
          <FaSearch className="self-center w-5 h-5 ml-1 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="input border-none self-center bg-gray-100 focus:outline-none input-md sm:w-96 max-w-md mx-auto  "
          />
        </div>
      </span>

      <span className="flex gap-2">
        <button className="bg-gray-100  self-center  rounded-md h-10 w-10 sm:h-12 sm:w-16">
          <PiSlidersHorizontalLight className="mx-auto  h-6 w-6" />
        </button>
      </span>
    </div>
  );
};

export default Filter;
