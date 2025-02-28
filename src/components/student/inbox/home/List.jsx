import React, { useEffect, useState } from "react";
import { FaSortDown } from "react-icons/fa6";
import { PiArrowCounterClockwiseBold } from "react-icons/pi";
import { HiDotsVertical } from "react-icons/hi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
import { TfiClip } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";

const List = () => {
  const navigate = useNavigate();
  const [arr, setArr] = useState([
    { id: 1, isChecked: false },
    { id: 2, isChecked: false },
    { id: 3, isChecked: false },
    { id: 4, isChecked: false },
  ]);

  //   useEffect(() => {
  //     setArr(arr);
  //   }, []);

  const handleCheckbox = (e) => {
    const { checked, id, name } = e.target;
    // //console.log(name);
    if (name === "all") {
      let copy = arr.map((item) => {
        return { ...item, isChecked: checked };
      });
      setArr(copy);
    } else {
      let copy = arr.map((item) => {
        return item.id == id ? { ...item, isChecked: checked } : item;
      });
      // //console.log(copy);
      setArr(copy);
    }
  };

  return (
    <div className="bg-[#8F92A1] bg-opacity-5 rounded-t-xl pb-4">
      <div className="flex border-b border-gray-200 p-4 justify-between rounded-t-xl w-[99.9%] mx-auto">
        <div className="flex gap-2 self-center">
          <input
            name="all"
            onChange={(e) => handleCheckbox(e)}
            type="checkbox"
            checked={arr.filter((item) => item?.isChecked !== true).length < 1}
            className="border-none bg-[#DEEBFF] rounded self-center"
          />
          <div className="h-4  self-center mb-2">
            <FaSortDown className=" text-gray-400 h-full self-center " />
          </div>
          <PiArrowCounterClockwiseBold className="self-center text-sm  text-gray-400 ml-4" />
          <HiDotsVertical className="self-center text-sm  text-gray-400" />
        </div>
        <div className="flex gap-2 self-center">
          <p className="text-gray-400 text-sm font-bold">1-50 of 4,792</p>
          <FaChevronLeft />
          <FaChevronRight />
        </div>
      </div>
      <div className="p-4 font-medium text-gray-400">
        <h1>Today</h1>
      </div>

      {arr.map((el, i) => {
        return (
          <div className="mb-4 bg-white rounded-md flex justify-between py-4 w-[98%] mx-auto ">
            <div className="flex gap-4 ">
              {el.isChecked ? (
                <div className=" border-l-blue-700 border-2 border-white"></div>
              ) : (
                <div className="  border-2 border-white"></div>
              )}

              <input
                name="k"
                onChange={(e) => handleCheckbox(e)}
                key={i}
                type="checkbox"
                checked={el?.isChecked || false}
                id={el.id}
                className={`border-none bg-[#DEEBFF] rounded self-center`}
              />

              {el.isChecked ? (
                <TiStarFullOutline className="self-center" />
              ) : (
                <TiStarOutline className="self-center" />
              )}

              <div className="w-5 h-5 rounded-full bg-blued self-center"></div>
              <p
                className="text-sm font-medium hover:cursor-pointer"
                onClick={() => navigate("/student/inbox/mail/:view")}
              >
                Fanny Chapman
              </p>
              <p className="text-sm font-medium sm:max-w-[150px] line-clamp-1 max-h-6">
                Product Review for UI8 asdsad
              </p>
              <p className="text-sm text-gray-400">
                Hey man, I'm finalizing my presentation for tomorrow's workshop.
                I feel something{" "}
              </p>
            </div>

            <div className="flex gap-4 pr-4">
              <TfiClip className="rotate-180 text-2xl text-gray-400" />
              <p className="text-sm font-medium text-gray-400">8:56 PM</p>
            </div>
          </div>
        );
      })}
      {/* iterable */}
    </div>
  );
};

export default List;
