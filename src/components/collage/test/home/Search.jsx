import React from "react";
import { FiPieChart } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";

const Search = () => {
  return (
    <div className="flex w-[97%] mx-auto justify-between mb-2 ">
      <button className="flex self-center ml-2 rounded-lg h-10 w-10 sm:h-20 sm:w-20 gap-2">
        <FiPieChart className=" sm:h-16 sm:w-16 h-10 w-10 self-center" />
        <h2 className="text-xl font-bold self-center">Test</h2>
      </button>
      <div className=" rounded-xl mx-2 w-full sm:h-12 h-10 flex my-2 ">
        <span className="w-fit mx-auto flex self-center">
          <IoIosSearch className="self-center w-10 h-10 bg-gray-100 rounded-s-lg text-gray-400 py-2 " />
          <input
            type="text"
            placeholder="Search"
            className="placeholder pl-0 border-none self-center bg-gray-100 focus:outline-none focus:ring-0 rounded-e-lg sm:w-80 w-fit"
          />
        </span>
      </div>

      <div className="flex gap-2">
        <div className="rounded-full bg-blue-500 w-8 h-8 self-end"></div>
        <div className="rounded-full bg-blue-500 w-8 h-8 self-end"></div>
        <div className="rounded-full bg-blue-500 w-8 h-8 self-end"></div>
        <div className="rounded-full bg-blue-500 w-8 h-8 self-end"></div>
        <div className="rounded-full bg-blue-500 w-8 h-8 self-end"></div>
        <div className="rounded-full bg-blue-500 w-8 h-8 self-end"></div>
        <div className="rounded-full bg-blue-500 w-8 h-8 self-end"></div>
        <div className="rounded-full bg-gray-200 w-8 h-8 self-end text-xs font-bold flex justify-center">
          <p className="self-center text-gray-400">+99</p>
        </div>
        <div className="w-8 h-8"></div>
        <div className="rounded-full w-8 h-8 self-end">
          {/* <IoSettingsOutline className="text-gray-400 w-full h-full" /> */}
        </div>
      </div>
    </div>
  );
};

export default Search;
