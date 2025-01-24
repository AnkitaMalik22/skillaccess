import React from "react";
import { IoIosSearch } from "react-icons/io";

import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const Header = ({ handleFilter }) => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full mx-auto justify-between mb-6">
      {/* comp */}
      <span className="flex gap-2 w-1/4 items-center">
        <h2 className="text-[24px] w-full  font-bold  font-dmSans">
          Jobs Posted
        </h2>
      </span>

      {/* search */}
      <div className=" rounded-xl mx-2 -ml-10  sm:h-12 h-10  flex justify-center my-2 ">
        <span className="w-fit mx-auto flex self-center">
          <IoIosSearch className="self-center w-10 h-10 bg-gray-100 rounded-s-lg text-gray-400 py-2 " />
          <input
            type="text"
            onChange={handleFilter}
            placeholder="Search..."
            className="placeholder pl-0 border-none self-center bg-gray-100 focus:outline-none focus:ring-0 rounded-e-lg sm:w-80 w-fit"
          />
        </span>
      </div>

      <button
        className="bg-accent py-2 px-3 self-center mr-2 rounded-md flex gap-2 text-white"
        onClick={() => {
          navigate("/company/pr/jobs/create");
        }}
      >
        <FaPlus className="self-center" />{" "}
        <p className="self-center text-sm font-bold">Post Job</p>
      </button>
    </div>
  );
};

export default Header;
