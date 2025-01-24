import React from "react";

export const ProgressBar = ({ progress = 1 }) => {
  // Helper to apply the active/inactive styles based on progress stage
  const getStepClass = (step) =>
    progress >= step ? "bg-accent" : "bg-[#CCDCF5]";

  return (
    <div className="w-4/5 mx-auto flex mb-5">
      {/* Step 1: Name Assessment */}
      <div className="w-1/3 flex">
        <div className="w-1/3"></div>
        <div className="relative">
          <figure
            className={`w-3 h-3 p-3 rounded-full ${getStepClass(1)} z-50 `}
          ></figure>
          <h2 className="absolute -bottom-10 w-44 -left-10">Name Assessment</h2>
        </div>
        <div
          className={`w-full h-1/3 self-center -ml-1 z-20 rounded-md ${getStepClass(
            1
          )}`}
        ></div>
      </div>

      {/* Step 2: Select Tests */}
      <div className="w-1/3 flex">
        <div
          className={`w-full h-1/3 self-center -ml-2 ${getStepClass(2)}`}
        ></div>
        <div className="relative">
          <figure
            className={`w-3 h-3 p-3 rounded-full ${getStepClass(2)} z-50`}
          ></figure>
          <h2 className="absolute -bottom-10 w-44 -left-10 font-bold">
            Select Tests
          </h2>
        </div>
        <div
          className={`w-full h-1/3 self-center -ml-1 ${getStepClass(3)}`}
        ></div>
      </div>

      {/* Step 3: Review & Submit */}
      <div className="w-1/3 flex">
        <div className={`w-1/3 h-1/3 self-center ${getStepClass(3)}`}></div>
        <div
          className={`w-1/3 h-1/3 self-center -ml-1 ${getStepClass(3)}`}
        ></div>
        <div className="relative">
          <figure
            className={`w-3 h-3 p-3 rounded-full ${getStepClass(3)} z-50`}
          ></figure>
          <h2 className="absolute -bottom-10 w-44 -left-10 font-normal">
            Review & Submit
          </h2>
        </div>
      </div>
    </div>
  );
};
