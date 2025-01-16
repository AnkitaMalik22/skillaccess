import React, { useEffect } from "react";
import Header from "./Header";
import Left from "./Left";
import View from "./View";
import { useParams } from "react-router-dom";
import Compose from "./Compose";
import { PiArrowCounterClockwiseBold } from "react-icons/pi";
import { FaSortDown } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
import { FiCornerUpLeft, FiCornerUpRight } from "react-icons/fi";
import { BsArrowsAngleExpand } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import ViewBar from "./ViewBar";
import ComposeBar from "./ComposeBar";

const Mail = () => {
  let { type } = useParams();

  return (
    <>
      <Header />

      <div className="bg-lGray bg-opacity-5  p-4 rounded-md ">
        <div className="w-full bg-white flex mb-2 rounded-xl">
          <div className="w-1/4 h-[4.5rem] flex justify-between px-2">
            <select
              name=""
              id=""
              className="w-full self-center select text-sm font-bold"
            >
              <option value="Primary">Primary</option>
            </select>
            <PiArrowCounterClockwiseBold className="self-center text-sm  text-gray-400 ml-4" />
          </div>
          <div className="w-1 bg-opacity-10 bg-blued rounded  h-14 my-auto"></div>

          <div className="w-3/4 h-[4.5rem] flex px-3">
            {type === ":view" ? (
              <>
                <ViewBar />
              </>
            ) : (
              <>
                <ComposeBar />
              </>
            )}
          </div>
        </div>
        <div className="h-[70vh] w-full flex gap-4">
          <div className="w-1/4 bg-white p-2 overflow-y-scroll rounded-md">
            <Left />
            <Left />
            <Left />
          </div>
          <div className="w-3/4 bg-white rounded-md">
            {type === ":view" ? <View /> : <Compose />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Mail;
