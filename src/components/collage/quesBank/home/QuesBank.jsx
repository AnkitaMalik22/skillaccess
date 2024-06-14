import React from "react";
import Header from "./Header";
import Topic from "./Topic";
import Recent from "./Recent";
import BookMark from "./BookMark";

const QuesBank = () => {
  return (
    <div>
      <div className="mb-9">
        <Header />
      </div>
      <>
        <Topic />
      </>
      <div className="flex justify-between md:flex-nowrap flex-wrap  mt-8 gap-3 md:gap-9">
        <div className=" w-3/5">
          <Recent />
        </div>
        <div className="w-2/5">
          <BookMark />
        </div>
      </div>
    </div>
  );
};

export default QuesBank;
