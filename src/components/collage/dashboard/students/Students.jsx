import React, { useState } from "react";

import { FaSearch } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa6";
import { PiSlidersHorizontalLight } from "react-icons/pi";
import { TbFileDownload } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import BackIcon from "../../../buttons/BackIcon";
import { IoIosSearch } from "react-icons/io";

const Students = () => {
  const [students, setStudents] = useState([1, 2, 3, 4, 5, 6, , 9, 6]);
  const navigate = useNavigate();
  const [items, setItems] = useState(true);
  return (
    <div className="w-11/12 mx-auto">
      <div className="flex w-full mx-auto justify-between mb-4">
        <button
          className="  self-center  rounded-lg h-10 w-10 "
          onClick={() => navigate(-1)}
        >
          <BackIcon />
        </button>
        <div className=" rounded-xl mx-2 w-full sm:h-12 h-10 flex my-2 ">
          <span className="w-fit mx-auto flex self-center">
            <IoIosSearch className="self-center w-10 h-10 bg-gray-100 rounded-s-lg text-gray-400 py-2 " />
            <input
              type="text"
              placeholder="Search..."
              className="placeholder pl-0 border-none self-center bg-gray-100 focus:outline-none focus:ring-0 rounded-e-lg sm:w-80 w-fit"
            />
          </span>
        </div>

        <button className="bg-gray-100  self-center  rounded-lg h-10 w-10 sm:h-12 sm:w-16">
          <PiSlidersHorizontalLight className="mx-auto  h-6 w-6" />
        </button>
      </div>

      {/* legend */}
      <div className=" grid-cols-6  text-center  mx-auto  font-dmSans font-semibold text-base hidden md:grid">
        <div className="bg-[#0052cc1f] rounded-s-lg p-2 ">
          <h2>Name of the Student</h2>
        </div>
        <div className="bg-[#0052cc1f] p-2">
          <h2>Education</h2>
        </div>
        <div className="bg-[#0052cc1f] p-2">
          <h2>Placed In</h2>{" "}
        </div>
        <div className="bg-[#0052cc1f] p-2">
          <h2>Scored</h2>
        </div>
        <div className="bg-[#0052cc1f] p-2">
          <h2>Performance</h2>
        </div>
        <div className="bg-[#0052cc1f] p-2 rounded-e-lg">
          <h2>Resume</h2>
        </div>
      </div>

      {/* list to be iterated */}
      <div className=" grid-cols-6 rounded-lg my-2 py-2 pl-2 text-center  mx-auto  font-dmSans font-semibold text-base hidden md:grid bg-gray-200">
        {" "}
        {/* row-2 */}
        <div className={` flex `}>
          <div className="flex self-center">
            <div className=" min-w-[3rem]  h-12 self-center bg-red-600 mr-2  "></div>
            <span className="break-words min-w-0 pt-1 ">
              <h2 className="font-dmSans font-semibold text-sm sm:text-base  ">
                Role
              </h2>
              <h2 className="font-dmSans font-medium text-xs break-words text-gray-400">
                {" "}
                CompanyName
              </h2>
            </span>
          </div>
        </div>
        <div className="flex justify-center ">
          <div className=" self-center h-fit">
            <span>
              <h2 className="font-dmSans font-semibold text-sm sm:text-base text-gray-400">
                Year
              </h2>
              <h2 className="font-dmSans font-base text-xs sm:text-xs inline text-blue-500">
                {" "}
                Degree
              </h2>
            </span>
          </div>
        </div>
        <div className="flex justify-center">
          <div className=" self-center h-fit">
            <span>
              <h2 className="font-dmSans font-semibold text-sm sm:text-base">
                Designation
              </h2>
              <h2 className="font-dmSans font-medium text-xs sm:text-xs inline">
                {" "}
                City in{" "}
                <h3 className="inline break-words text-gray-400">Country</h3>
              </h2>
            </span>
          </div>
        </div>
        <div className="flex justify-center">
          <span className="self-center ">
            <h2 className="font-dmSans font-semibold text-sm sm:text-base text-green-500   ">
              300/<h2 className="inline text-black">500</h2>
            </h2>
          </span>
        </div>
        <div className="flex justify-center">
          <div className=" self-center">
            <span>
              <div className="min-w-[4rem] bg-gray-300 rounded-lg h-2 mx-auto">
                <div className="w-3/4 bg-green-600 h-full rounded-lg"></div>
              </div>
              <h2 className="font-dmSans font-bold text-xs sm:text-xs ">
                {" "}
                Good
              </h2>
            </span>
          </div>
        </div>
        <div className="flex justify-center " >
          <span className="flex justify-center h-fit self-center gap-2 cursor-pointer"
           onClick={()=>{
          navigate('profile');}
        }>
            <h2 className="font-dmSans text-xs font-bold text-white bg-blued p-2 rounded-lg">
              View CV
            </h2>

            <h2 className="font-dmSans font-semibold text-sm sm:text-base self-center">
              <TbFileDownload className="text-gray-400 h-6 w-6" />
            </h2>
          </span>
        </div>{" "}
      </div>

      {/* smaller screen legend */}
      <div className=" grid-cols-3  text-center w-[98%] mx-auto  font-dmSans font-semibold sm:text-base text-xs md:hidden grid">
        <div
          className={`${items ? "" : "hidden"} bg-[#0052cc1f] rounded-s-lg p-2`}
        >
          <h2>Name of the Student</h2>
        </div>
        <div className={`${items ? "" : "hidden"} bg-[#0052cc1f]  p-2`}>
          <h2>Education</h2>
        </div>
        <div
          className={`${
            items ? "" : "hidden"
          } bg-[#0052cc1f] rounded-e-lg p-2 flex justify-between`}
        >
          <h2>Placed In</h2>{" "}
          <button className="ml-2" onClick={() => setItems(!items)}>
            O
          </button>
        </div>
        <div
          className={`${
            !items ? "" : "hidden"
          } bg-[#0052cc1f] rounded-s-lg p-2`}
        >
          <h2>Scored</h2>
        </div>
        <div className={`${!items ? "" : "hidden"} bg-[#0052cc1f]  p-2`}>
          <h2>Performance</h2>
        </div>
        <div
          className={`${
            !items ? "" : "hidden"
          } bg-[#0052cc1f] rounded-e-lg p-2 flex justify-between`}
        >
          <h2>Resume</h2>{" "}
          <button className="" onClick={() => setItems(!items)}>
            O
          </button>
        </div>
      </div>

      {/* small screen list to be iterated */}
      <div className=" grid-cols-3  bg-gray-200 rounded-lg my-2 py-2 pl-2 text-center w-[98%] mx-auto  font-dmSans font-semibold sm:text-base text-xs md:hidden grid">
        {/* row-2 */}

        <div className={` ${items ? "" : "hidden"} `}>
          <div className="flex">
            <div className=" min-w-[2.5rem] h-8 self-center bg-red-600 mr-2"></div>
            <span className="">
              <h2 className="font-dmSans text-xs sm:text-base break-words">
                Samir Sethiya
              </h2>
              <h2 className="font-dmSans font-medium text-xs sm:text-xs inline break-words">
                {" "}
                Indoore
              </h2>
            </span>
          </div>
        </div>

        <div className={` ${items ? "" : "hidden"} `}>
          <div>
            <span className="">
              <h2 className="font-dmSans font- text-xs sm:text-base break-words text-gray-400 ">
                2nd year
              </h2>
              <h2 className="font-dmSans font-semibold text-xs sm:text-xs inline break-words text-blue-500">
                {" "}
                B.Sc
              </h2>
            </span>
          </div>
        </div>

        <div className={` ${items ? "" : "hidden"} `}>
          <span className="">
            <h2 className="font-dmSans font- text-xs sm:text-base break-words ">
              Designationengineer
            </h2>
            <h2 className="font-dmSans font-medium text-xs sm:text-xs inline break-words">
              {" "}
              Pune <p className="text-gray-400 inline">in India</p>
            </h2>
          </span>
        </div>

        <div className={` ${!items ? "" : "hidden"}  flex pl-2`}>
          <div className="flex justify-center h-fit self-center">
            <span className="flex justify-center ">
              <h2 className="font-dmSans font-semibold text-xs  sm:text-base text-green-500  w-fit ">
                300/<h2 className="inline text-black">500</h2>
              </h2>
            </span>
          </div>
        </div>

        <div className={` ${!items ? "" : "hidden"} flex justify-center`}>
          <div className=" self-center">
            <span>
              <div className="min-w-[4rem] bg-gray-300 rounded-lg h-2 mx-auto">
                <div className="w-3/4 bg-green-600 h-full rounded-lg"></div>
              </div>
              <h2 className="font-dmSans font-bold text-xs sm:text-xs ">
                {" "}
                Good
              </h2>
            </span>
          </div>
        </div>

        <div className={` ${!items ? "" : "hidden"} `}>
          <span className="flex justify-center h-fit self-center gap-2">
            <h2 className="font-dmSans text-xs font-semibold text-white bg-blued p-2 rounded-lg">
              View CV
            </h2>

            <h2 className="font-dmSans font-semibold text-sm sm:text-base self-center">
              <TbFileDownload className="text-gray-400 h-5 w-5" />
            </h2>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Students;
