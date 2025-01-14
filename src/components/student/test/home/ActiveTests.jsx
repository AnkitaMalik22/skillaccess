import React from "react";
import { BsGeoAlt } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { FaLocationArrow } from "react-icons/fa";
import { PiPencilSimpleLine } from "react-icons/pi";

const ActiveTests = (props) => {
  const navigate = useNavigate();
  return (
    <div className="w-96 h-auto bg-[#f8f8f9] my-3 text-start font-bold text-black rounded-2xl  font-dmSans p-5">
      <div className="logo flex ">
        <div className="w-24 h-24 flex items-center ">
          <img src="/images/companyLogo.png" alt="" className=" rounded-2xl " />
        </div>
        <h2 className="mb-2 ml-2 line-clamp-2 break-words self-center">
          Office Assistant / Social Media Assistant Google
        </h2>
      </div>

      <div className="flex flex-row items-start justify-between">
        <span className="self-center">Google</span>
        <span className="text-gray-400 font-medium text-sm font-dmSans  self-center">
          {" "}
          4 days ago
        </span>

        <div className="flex flex-row items-start justify-between h-full my-2">
          <button className="bg-[#c6e1d9] text-[#00875a] rounded-2xl text-sm font-bold flex gap-2 px-7 py-1 ">
            Remote
          </button>
          <button className="bg-[#c6d7f0] text-blued  rounded-2xl text-sm font-bold flex gap-2 px-7 py-1 ml-2">
            Full Time
          </button>
        </div>
      </div>
      <div className="location flex flex-row items-start my-3 ">
        <BsGeoAlt className="w-6  h-6 mr-3 " />
        <h2 className="text-gray-400 font-medium text-base font-dmSans sm:mb-2">
          Greater Bengaluru, Bengaluru Area
        </h2>
      </div>

      <h2 className="my-6  line-clamp-2 break-words self-center">
        Google Analytics
      </h2>
      <p className="text-[#e38c77] text-sm">Due on 05/12/22</p>

      {/* <p className="font-normal text-gray-400  line-clamp-4 sm:mb-2 mb-1 h-1/2">
        {"description"}
      </p> */}
      <div className="flex flex-row items-start justify-between my-3">
        <h2 className="text-gray-400 font-bold text-sm sm:mb-2 tracking-wider">
          ATTEMPTS
        </h2>
        <h2 className="  text-base font-dmSans sm:mb-2 font-bold">1/4</h2>
      </div>
      <div className="grid grid-cols-4 w-full px-2 gap-2 mb-4">
        <div
          className={`${
            props.progress === 1
              ? "bg-red-500"
              : props.progress === 2
              ? "bg-blued"
              : props.progress === 3
              ? "bg-amber-500"
              : "bg-green-500"
          } w-full h-1 rounded`}
        ></div>
        <div
          className={`${
            props.progress === 1
              ? "bg-gray-200"
              : props.progress === 2
              ? "bg-blued"
              : props.progress === 3
              ? "bg-amber-500"
              : "bg-green-500"
          } w-full h-1 rounded`}
        ></div>
        <div
          className={`${
            props.progress === 1
              ? "bg-gray-200"
              : props.progress === 2
              ? "bg-gray-200"
              : props.progress === 3
              ? "bg-amber-500"
              : "bg-green-500"
          } w-full h-1 rounded`}
        ></div>
        <div
          className={`${
            props.progress === 1
              ? "bg-gray-200"
              : props.progress === 2
              ? "bg-gray-200"
              : props.progress === 3
              ? "bg-gray-200"
              : "bg-green-500"
          } w-full h-1 rounded`}
        ></div>
      </div>

      <h2 className=" line-clamp-2 break-words self-center text-[#888888] text-xl">
        Status
      </h2>

      <div className="flex flex-row items-start justify-between my-3">
        <button className="bg-[#f9e5cd] text-[#fe9d2a] rounded-2xl text-sm font-bold flex gap-2 px-7 py-2 ">
          Pending
        </button>

        <button
          className="bg-blue-500 text-white rounded-2xl text-sm font-bold flex gap-2 px-7 py-2 "
          onClick={() => navigate("/student/test/1")}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default ActiveTests;
