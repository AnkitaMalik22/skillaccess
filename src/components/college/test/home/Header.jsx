import React from "react";
import { MdOutlineAssessment } from "react-icons/md";

const Header = ({ students }) => {
  return (
    <div className="flex w-full mx-auto justify-between mb-6 gap-2">
      {/* comp */}
      <span className="flex gap-2">
        <button className="bg-white border self-center rounded-md p-2 hover:shadow-md transition-shadow duration-300 hover:border-gray-500">
          <MdOutlineAssessment className=" h-8 w-8" />
        </button>
        <h2 className="text-xl md:text-[28px] font-bold self-center font-dmSans text-[#171717]">
          Assessment
        </h2>
      </span>

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
          <div className="rounded-full bg-gray-200 xl:w-8 xl:h-8 lg:w-5 lg:h-5 self-end text-sm font-bold flex justify-center">
            <p className="self-center text-gray-400">{students.length - 5}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
