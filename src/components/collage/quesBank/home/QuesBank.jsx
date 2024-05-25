import React from "react";
import Header from "./Header";
import Topic from "./Topic";
import Recent from "./Recent";
import BookMark from "./BookMark";

const QuesBank = () => {
  return (
    <div className="w-11/12 mx-auto py-5 md:py-10">
      <div className="mb-9">
        <Header />
      </div>
      <Topic />

      <div className="flex justify-between  mt-8">
        <div className=" w-[60%]">
          <Recent />
        </div>
        <div className="w-[38%]">
          <BookMark />
        </div>
      </div>
    </div>
  );
};

export default QuesBank;
