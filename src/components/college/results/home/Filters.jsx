import React from "react";
import { FaAngleLeft, FaChevronLeft, FaPlus, FaSearch } from "react-icons/fa";
import { FiPlus, FiUpload } from "react-icons/fi";
import { PiSlidersHorizontalLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const Filter = ({ handleFilter }) => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full mx-auto justify-between mb-2 font-dmSans">
      <span className="flex gap-4">
        <button
          className=" self-center ml-2 rounded-md h-10 w-10 sm:h-12 sm:w-16"
          onClick={() => navigate(-1)}
        >
          <img src="/images/icons/list.png" alt="" />
        </button>
      </span>
      <div className="bg-gray-100 rounded-xl -ml-24 sm:h-12 h-10 flex my-2 px-4 w-fit">
        <FaSearch className="self-center w-5 h-5 ml-1 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          onChange={handleFilter}
          className="input border-none self-center bg-gray-100 focus:outline-none input-md sm:w-96 max-w-md mx-auto  "
        />
      </div>
      {/* 
      <span className="flex gap-2">
        <button className="bg-gray-100  self-center  rounded-md h-10 w-10 sm:h-12 sm:w-16">
          <img
            src="/images/icons/Filter.png"
            alt=""
            srcset=""
            className="mx-auto"
          />
        </button>
      </span> */}
    </div>
  );
};

export default Filter;
