import React from "react";
import { IoIosSearch } from "react-icons/io";

const DynamicHeader = ({
  title,
  icon,
  onIconClick,
  showSearch = true,
  onSearch,
  customRightContent,
}) => {
  return (
    <div className="flex w-full mx-auto justify-between items-center mb-6 bg-white bg-opacity-80 backdrop-blur-sm p-4 sticky top-0 z-10">
      <div className="flex gap-3">
        {icon && (
          <button
            className="bg-white border self-center rounded-md p-2 hover:shadow-md transition-shadow duration-300 hover:border-gray-500"
            onClick={onIconClick}
          >
            <img src={icon} alt="icon" />
          </button>
        )}
        <h2 className="text-xl md:text-[28px] font-bold self-center font-dmSans text-[#171717]">
          {title}
        </h2>
      </div>
      {showSearch ? (
        <div className="rounded-xl w-full sm:h-12 h-10 flex">
          <span className="w-fit mx-auto flex self-center bg-[#F8F8F9] rounded-xl px-5 py-3 gap-3">
            <IoIosSearch className="self-center w-6 h-6 bg-gray-100 rounded-s-lg text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => onSearch && onSearch(e.target.value)}
              className="placeholder p-0 border-none self-center bg-gray-100 focus:outline-none focus:ring-0 rounded-e-lg sm:w-80 w-fit"
            />
          </span>
        </div>
      ) : customRightContent ? (
        customRightContent
      ) : null}
    </div>
  );
};

export default DynamicHeader;
