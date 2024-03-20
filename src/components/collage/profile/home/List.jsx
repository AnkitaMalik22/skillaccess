import React from "react";
import { CgClipboard, CgAwards, CgTrending, CgFolder } from "react-icons/cg";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { TbBriefcase2 } from "react-icons/tb";

const List = ({ editable, setEditable }) => {
  const arr = [
    {
      number: 200,
      dir: "down",
      per: 30,
      name: "Total Students",
      icon: (
        <div className="w-11 h-11 flex justify-center  rounded-xl bg-[#5243AA] bg-opacity-5">
          <CgClipboard className="self-center text-2xl text-[#5243AA]" />
        </div>
      ),
    },
    {
      number: 200,
      dir: "down",
      per: 30,
      name: "Companies",
      icon: (
        <div className="w-11 h-11 flex justify-center  rounded-xl bg-[#00875A] bg-opacity-5">
          <CgAwards className="self-center text-2xl text-[#00875A]" />{" "}
        </div>
      ),
    },
    {
      number: 200,
      dir: "up",
      per: 30,
      name: "Students Placed",
      icon: (
        <div className="w-11 h-11 flex justify-center  rounded-xl bg-[#FF991F] bg-opacity-5">
          <CgTrending className="self-center text-2xl text-[#FF991F]" />
        </div>
      ),
    },
    {
      number: 200,
      dir: "down",
      per: 30,
      name: "Performance",
      icon: (
        <div className="w-11 h-11 flex justify-center  rounded-xl bg-blue-700 bg-opacity-5">
          <img src="../../images/icons/gauge.png" className=" self-center" />
        </div>
      ),
    },
    {
      number: 200,
      dir: "up",
      per: 30,
      name: "Average Package",
      icon: (
        <div className="w-11 h-11 flex justify-center  rounded-xl bg-blued bg-opacity-5">
          <TbBriefcase2 className="self-center text-2xl text-blued" />{" "}
        </div>
      ),
    },
  ];
  return (
    <div className="bg-[#8F92A1] bg-opacity-5 px-6 py-7 font-dmSans mt-8 rounded-xl">
      <div className="w-full flex justify-between">
        <h1 className="text-lg font-bold ">Achievements</h1>

        {editable && (
          <button className="self-center w-32 justify-center flex bg-blue-700  py-2 font-bold px-4 rounded-xl  text-white gap-2">
            <FaPlus className="text-lg self-center" />
            <p className="self-center"> Add New</p>
          </button>
        )}
      </div>

      {/* legend */}
      <div className=" grid-cols-4  text-center mt-6 mb-1 mx-auto  font-dmSans font-bold text-base grid">
        <div className="bg-[#0052CC] bg-opacity-5 rounded-s-lg py-2  text-left pl-14">
          <h2>Data Name</h2>
        </div>

        <div className="bg-[#0052CC] bg-opacity-5 p-2">
          <h2>Number</h2>
        </div>
        <div className="bg-[#0052CC] bg-opacity-5 p-2 ">
          <h2>Increment/Decrement</h2>
        </div>
        <div className="bg-[#0052CC] bg-opacity-5  p-2 ">
          <h2>Detail</h2>
        </div>
      </div>

      {/* list to be iterated */}
      {arr.map((el) => (
        <div className=" grid-cols-4 text-center  mx-auto  font-dmSans font-bold text-base hidden md:grid bg-white py-3 rounded-xl mb-2 ">
          {" "}
          {/* row-2 */}
          <div className={` flex pl-7`}>
            <div className="flex self-center gap-2 ">
              {el.icon}

              <span className="self-center">
                <h2 className="font-dmSans text-center  sm:text-sm text-lg font-bold opacity-60">
                  {el.name}
                </h2>
              </span>
            </div>
          </div>
          {/*  */}
          <div className="flex justify-center ">
            <div className=" self-center h-fit">
              <span>
                <h2 className="font-dmSans text-center  sm:text-sm text-lg font-bold opacity-60">
                  {el.number}
                </h2>
              </span>
            </div>
          </div>
          {/*  */}
          {/* */}
          <div className="flex justify-center ">
            <div className=" self-center h-fit">
              <span className="flex gap-2">
                <div
                  className={` flex gap-2 font-dmSans text-center  sm:text-sm text-lg font-bold text-[#00875A ] ${
                    el.dir === "down" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {el.dir === "down" ? <FaArrowDown /> : <FaArrowUp />}
                  <h1>{" " + el.per + "%"}</h1>
                </div>
              </span>
            </div>
          </div>
          {/*  */}
          {/*  */}
          <div className="flex justify-center ">
            <div className=" self-center h-fit">
              <span>
                <h2 className="font-dmSans font-normal sm:text-sm text-[#0052CC]">
                  View Details
                </h2>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
