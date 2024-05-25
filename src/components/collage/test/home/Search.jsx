import React from "react";
import { FiPieChart } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";

const Search = ({ students }) => {
  return (
    <div className="flex w-[97%] mx-auto justify-between mb-2 ">
      <button className="flex self-center ml-2 rounded-lg h-10 w-10 sm:h-fit sm:w-fit gap-2">
        <FiPieChart className=" sm:h-[32px] sm:w-[32px] h-10 w-10 self-center" />
        <h2 className="text-[24px] font-bold self-center">Test</h2>
      </button>
      <div className=" rounded-xl mx-2 w-full h-[56px] flex my-2 ">
        <span className="w-fit mx-auto flex self-center h-full bg-gray-100 rounded-lg">
          <IoIosSearch className="self-center w-10 h-10 bg-gray-100 rounded-s-lg text-gray-400 py-2 " />
          <input
            type="text"
            placeholder="Search..."
            className="placeholder pl-0 border-none text-sm font-medium self-center bg-gray-100 focus:outline-none focus:ring-0 h-full rounded-e-lg sm:w-80 w-fit"
          />
        </span>
      </div>

      <div className="flex gap-2">
        {students.slice(0, 5).map((student) => {
          return (
            <div className="rounded-full xl:w-8 xl:h-8 lg:w-5 lg:h-5 self-end">
              <img
                src={student.avatar.url}
                alt=""
                srcset=""
                className="rounded-full"
              />
            </div>
          );
        })}

        {students.length - 5 > 0 && (
          <div className="rounded-full bg-gray-200 xl:w-8 xl:h-8 lg:w-5 lg:h-5 self-end text-xs font-bold flex justify-center">
            <p className="self-center text-gray-400">{students.length - 5}</p>
          </div>
        )}
        <div className="xl:w-8 xl:h-8 lg:w-2 lg:h-5"></div>
        <div className="rounded-full xl:w-8 xl:h-8 lg:w-5 lg:h-5 self-end">
          {/* <IoSettingsOutline className="text-gray-400 w-full h-full" /> */}
        </div>
      </div>
    </div>
  );
};

export default Search;
