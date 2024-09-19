import React from "react";
import { FiPieChart } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";

const Header = ({ students }) => {
  return (
    <div className="flex w-full mx-auto justify-between mb-6 gap-2">
      {/* comp */}
      <span className="flex gap-2">
        <button
          className="  self-center object-center  rounded-lg h-10 w-10 "
          // onClick={() => navigate('collage/companies')}
        >
          <FiPieChart className=" sm:h-[32px] sm:w-[32px] h-10 w-10 self-center" />
        </button>
        <h2 className="text-xl md:text-[28px] font-bold self-center font-dmSans text-[#171717]">
          Test
        </h2>
      </span>

      {/* search */}
      <div className=" rounded-xl w-full sm:h-12 h-10 flex">
        <span className="w-fit mx-auto flex self-center bg-[#F8F8F9] rounded-xl px-5 py-3 gap-3">
          <IoIosSearch className="self-center w-6 h-6 bg-gray-100 rounded-s-lg text-gray-400 " />
          <input
            type="text"
            placeholder="Search..."
            // onChange={handleFilter}
            className="placeholder p-0 border-none self-center bg-gray-100 focus:outline-none focus:ring-0 rounded-e-lg sm:w-80 w-fit"
          />
        </span>
      </div>

      <div className="flex gap-2 items-center">
        {students.slice(0, 5).map((student) => {
          return (
            <div className="rounded-full xl:w-8 xl:h-8 lg:w-5 lg:h-5 self-end">
              <img
                src={student?.avatar?.url}
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
      </div>
    </div>
  );
};

export default Header;
