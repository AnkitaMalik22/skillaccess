import React from "react";

export const Progress = () => {
  return (
    <>
      <div className="w-4/5 mx-auto flex mb-5">
        <div className="w-1/3 flex">
          <div className="w-1/3 "></div>
          <div className="relative">
            <figure className="w-3 h-3 p-3 rounded-full bg-accent z-50"></figure>
            <h2 className="absolute -bottom-10 w-44 -left-10 font-bold">
              Name Assessment
            </h2>
          </div>

          <div className="w-full bg-accent rounded-md h-1/3 self-center -ml-1 z-20"></div>
        </div>
        <div className="w-1/3 flex">
          <div className="w-full  bg-[#CCDCF5] h-1/3 self-center -ml-2"></div>
          <div className="relative">
            <figure className="w-3 h-3 p-3 rounded-full bg-[#CCDCF5] z-50"></figure>
            <h2 className="absolute -bottom-10 w-44 -left-10 font-normal">
              Select Tests
            </h2>
          </div>
          <div className="w-full bg-[#CCDCF5] h-1/3 self-center -ml-1"></div>
        </div>

        <div className="w-1/3 flex">
          <div className="w-1/3  bg-[#CCDCF5] h-1/3 self-center "></div>
          <div className="w-1/3  bg-[#CCDCF5] h-1/3 self-center "></div>
          <div className="relative">
            <figure className="w-3 h-3 p-3 rounded-full bg-[#CCDCF5] z-50"></figure>
            <h2 className="absolute -bottom-10 w-44 -left-10 font-normal">
              Review & Submit
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};
