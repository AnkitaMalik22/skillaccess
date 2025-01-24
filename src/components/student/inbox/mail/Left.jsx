import React from "react";
import { TfiClip } from "react-icons/tfi";

const Left = () => {
  return (
    <div className={`rounded-md hover:bg-accent hover:bg-opacity-5 p-3`}>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div className="w-10 h-10 rounded-md bg-gray-300 self-center"></div>
          <div className="self-center">
            <p className="leading-[16px] text-sm font-medium text-gray-400">
              Barbara Buchanan
            </p>
            <p className="leading-[16px] text-sm font-medium mt-2">
              {" "}
              UX Research for Product
            </p>
          </div>
        </div>
        <p className="leading-[16px] text-sm font-medium text-gray-400">
          10:48 PM
        </p>
      </div>

      <div className="flex gap-4 mt-2">
        <div className="w-10 flex justify-center self-center">
          <TfiClip className="rotate-180 text-xl font-extrabold text-gray-400 ml-1" />
        </div>
        <p className=" text-sm text-gray-400 line-clamp-2">
          Hey man, I'm finalizing my presentation for tomorrow's worksh
        </p>
      </div>
    </div>
  );
};

export default Left;
