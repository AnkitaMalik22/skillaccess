import React from "react";
import { TbFileDownload } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const List = () => {
  const Navigate = useNavigate();
  return (
    <div className="w-full">
      {/* legend */}
      <div className=" grid-cols-7  text-center w-full mx-auto mt-4 font-dmSans font-semibold text-base hidden md:grid">
        <div className="bg-[#0052cc1f] rounded-s-lg p-2 ">
          <h2>Name</h2>
        </div>
        <div className="bg-[#0052cc1f] p-2">
          <h2>Email</h2>
        </div>
        <div className="bg-[#0052cc1f] p-2">
          <h2>Profile</h2>{" "}
        </div>
        <div className="bg-[#0052cc1f] p-2">
          <h2>Designation</h2>
        </div>
        <div className="bg-[#0052cc1f] p-2">
          <h2>Role</h2>
        </div>
        <div className="bg-[#0052cc1f] p-2 ">
          <h2>Collaboration</h2>
        </div>
        <div className="bg-[#0052cc1f] p-2 rounded-e-lg">
          <h2>Experience</h2>
        </div>
      </div>

      {/* list to be iterated */}
      <div className=" grid-cols-7 rounded-lg my-2 py-2 pl-2 text-center w-full mx-auto  font-dmSans font-semibold text-base hidden md:grid bg-snow">
        {" "}
        {/* row-2 */}
        <div className={` flex `}>
          <div className="flex self-center">
            <div className=" min-w-[3rem]  h-12 self-center bg-red-600 mr-2  "></div>
            <span
              className="break-words min-w-0 pt-1 self-center hover:cursor-pointer hover:text-blued"
              onClick={() => Navigate("/collage/teams/profile")}
            >
              <h2 className="font-dmSans font-medium text-sm sm:text-base">
                name of user
              </h2>
            </span>
          </div>
        </div>
        <div className="flex justify-center ">
          <div className=" self-center h-fit">
            <span className="self-center">
              <h2 className="font-dmSans font-medium text-xs sm:text-base inline text-blue-500">
                {" "}
                example@mail.com
              </h2>
            </span>
          </div>
        </div>
        <div className="flex justify-center">
          <div className=" self-center h-fit">
            <span>
              <h2 className="font-dmSans font-medium text-sm sm:text-base">
                UI/UX Design
              </h2>
            </span>
          </div>
        </div>
        <div className="flex justify-center">
          <div className=" self-center h-fit">
            <span>
              <h2 className="font-dmSans font-medium text-sm sm:text-base">
                Assistant Professor
              </h2>
            </span>
          </div>
        </div>
        <div className="flex justify-center">
          <div className=" self-center h-fit">
            <span>
              <h2 className="font-dmSans font-medium text-sm sm:text-base">
                Handling profiles
              </h2>
            </span>
          </div>
        </div>
        <div className="flex justify-center">
          <div className=" self-center h-fit">
            <span>
              <img src="../../pic.png" alt="" />
            </span>
          </div>
        </div>
        <div className="flex justify-center">
          <div className=" self-center h-fit">
            <span>
              <h2 className="font-dmSans font-medium text-sm sm:text-base">
                2.5 Years
              </h2>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
