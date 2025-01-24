import React from "react";
import { BsArrowsAngleExpand } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";

const ComposeBar = () => {
  return (
    <div className="w-full flex">
      <div className="flex justify-between w-full px-2 self-center">
        <div className="flex">
          {" "}
          <p className="font-bold self-center">New Mail</p>
        </div>

        <div className="flex gap-5 text-gray-400">
          <BsArrowsAngleExpand className="self-center" />
          <RxCross1 className="self-center" />
        </div>
      </div>
    </div>
  );
};

export default ComposeBar;
