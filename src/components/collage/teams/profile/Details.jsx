import React, { useEffect } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { CgPinAlt } from "react-icons/cg";
import { BsPhone } from "react-icons/bs";
import { PiLinkSimple } from "react-icons/pi";
import { useState } from "react";
import { CgMenuCake } from "react-icons/cg";
// import { useSelector, useDispatch } from "react-redux";

const Details = ({}) => {
  const [teacher, setteacher] = useState({
    teacherName: "Example teacher",

    Email: "example@teacher.com",
    Bday: "03 September 2000",
  });

  return (
    <section className="bg-gray-50 rounded-xl px-6 font-dmSans">
      {/* first section */}
      <div className=" flex justify-between border-b  bg-gray-50 rounded-t-lg py-4">
        {/* profile photo */}
        <div className="flex gap-2 px-3 py-1 mt-2">
          <div className="flex">
            <div className="w-14 h-14 bg-blued self-center rounded-lg relative">
              {" "}
              <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full  bg-green-600 border-2 border-white "></div>
            </div>
          </div>

          <div className="ml-1   self-center ">
            <h2 className=" font-bold mt-2 ">
              {teacher.teacherName || "Example Collage"}
            </h2>
            <h2 className="text-sm  mt-1 pb-2">UPME00006369</h2>
          </div>
        </div>

        <div className="self-center text-gray-400 mr-2">
          <button className="py-3 text-white rounded-2xl text-xs  bg-[#0052CC] font-bold flex gap-2 px-4">
            <p>Connect</p>
          </button>
        </div>
      </div>

      {/* second section */}

      <div className="px-6  py-4 bg-gray-50 font-dmSans  text-sm font-medium grid grid-cols-4">
        <div className="flex gap-2 ">
          <div className="w-10 h-10 rounded-lg bg-gray-200 bg-opacity-50 flex justify-center">
            <MdOutlineEmail className="self-center text-2xl" />
          </div>
          {teacher.Email ? (
            <p className="self-center opacity-60">{teacher.Email}</p>
          ) : (
            <p className=" font-medium self-center">No Email Available</p>
          )}
          {/* <p className="font-medium self-center">
          </p> */}
        </div>

        <div className="flex gap-2 w-full ">
          <div className="w-10 h-10 rounded-lg bg-gray-200 bg-opacity-50 flex justify-center px-2">
            <BsPhone className="self-center text-2xl" />
          </div>
          <div className="w-full">
            {" "}
            <p className="self-center opacity-60 ">
              011 - 250 847 26, 011 - 456 398 26
            </p>
          </div>
        </div>

        <div className="flex gap-2 font-dmSans ">
          <div className="w-10 h-10 rounded-lg bg-gray-200 bg-opacity-50 flex justify-center">
            {" "}
            <CgMenuCake className="self-center text-2xl" />
          </div>
          <p className=" self-center opacity-60">{teacher.Bday}</p>
        </div>

        <div className="flex gap-2 font-dmSans ">
          <div className="w-10 h-10 rounded-lg bg-gray-200 bg-opacity-50 flex justify-center">
            {" "}
            <PiLinkSimple className="self-center text-2xl" />
          </div>
          <p className="text-blue-700 self-center">http://www.vetindia.in/</p>
        </div>
      </div>

      <div className="grid grid-cols-4 pb-4">
        <div className="pl-6 flex gap-2  w-full self-center">
          <div className="w-10 h-10 px-2 rounded-lg bg-gray-200 bg-opacity-50 flex justify-center self-center">
            {" "}
            <CgPinAlt className="self-center text-3xl" />
          </div>
          <p className="break-words max-w-[316px] text-sm  font-dmSans font-medium mt-2 opacity-60">
            G - 55-56, Street No.-1, Palam Extension, Near Sector - 7
          </p>
        </div>
        <div className="flex gap-2 ml-2 font-dmSans w-full self-center">
          <div className="w-10 h-10 rounded-lg bg-gray-200 bg-opacity-50 flex justify-center p-2">
            {" "}
            <img src="../../images/icons/calendar.png" alt="" />
          </div>
          <p className="opacity-60 self-center">2.5 years experience</p>
        </div>
      </div>
    </section>
  );
};

export default Details;
