import React from "react";

const Loader = () => {
  return (
    <div className="w-full min-h-[100vh] flex justify-center bg-white">
      <div className="flex-col gap-4 w-full flex items-center justify-center self-center">
        <div className="w-28 h-28 border-8 text-lightBlue text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blued rounded-full">
          <img src="../../logo.png" alt="" className="animate-ping" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
