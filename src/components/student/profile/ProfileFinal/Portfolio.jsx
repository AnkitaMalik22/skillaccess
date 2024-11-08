import React from "react";

const Portfolio = () => {
  return (
    <div className="  ">
      <span className="flex gap-2">
        <h2 className="text-2xl  font-bold  py-1  self-center">Portfolio</h2>{" "}
        <div className=" p-[.3rem] w-6 h-6 rounded-lg  bg-accent bg-opacity-80 self-center">
          <img
            src="../../../images/icons/pen.png"
            alt="pen"
            // onClick={() => setEditable(!editable)}
          />
        </div>
      </span>
      {/* wordpress  */}
      <div className=" grid grid-cols-4 text-center mt-3 bg-gray-50 rounded-lg w-full mx-auto">
        <span className="w-full  px-10 py-2 text-sm font-dmSans grid ">
          <img
            src="../../images/icons/wordPress.png"
            alt="wordPress"
            className=""
          />
        </span>
        <span className="self-center col-span-3">
          <p className="font-xs">www.yourprofile.com</p>
        </span>
      </div>
      {/* end of wordpress */}

      {/* linkedIN */}
      <div className=" grid grid-cols-4 text-center mt-3 bg-gray-50 rounded-lg w-full mx-auto">
        <span className="w-full  px-10 py-2 text-sm font-dmSans grid ">
          <img
            src="../../images/icons/LinkedIn.png"
            alt="wordPress"
            className=""
          />
        </span>
        <span className="self-center col-span-3">
          <p className="font-xs">www.yourprofile.com</p>
        </span>
      </div>
      {/* end of LinkedIn*/}

      {/* fb  */}
      <div className=" grid grid-cols-4 text-center mt-3 bg-gray-50 rounded-lg w-full mx-auto">
        <span className="w-full  px-10 py-2 text-sm font-dmSans grid ">
          <img src="../../images/icons/fb.png" alt="wordPress" className="" />
        </span>
        <span className="self-center col-span-3">
          <p className="font-xs">www.yourprofile.com</p>
        </span>
      </div>
      {/* end of fb */}

      {/* ig */}
      <div className=" grid grid-cols-4 text-center mt-3 bg-gray-50 rounded-lg w-full mx-auto">
        <span className="w-full  px-10 py-2 text-sm font-dmSans grid ">
          <img src="../../images/icons/ig.png" alt="wordPress" className="" />
        </span>
        <span className="self-center col-span-3">
          <p className="font-xs">www.yourprofile.com</p>
        </span>
      </div>
      {/* end of ig */}

      {/* yt */}
      <div className=" grid grid-cols-4 text-center mt-3 bg-gray-50 rounded-lg w-full mx-auto">
        <span className="w-full  px-10 py-2 text-sm font-dmSans grid ">
          <img src="../../images/icons/yt.png" alt="wordPress" className="" />
        </span>
        <span className="self-center col-span-3">
          <p className="font-xs">www.yourprofile.com</p>
        </span>
      </div>
      {/* end of yt */}

      {/* X */}
      <div className=" grid grid-cols-4 text-center mt-3 bg-gray-50 rounded-lg w-full mx-auto">
        <span className="w-full  px-10 py-2 text-sm font-dmSans grid ">
          <img src="../../images/icons/x.png" alt="wordPress" className="" />
        </span>
        <span className="self-center col-span-3">
          <p className="font-xs">www.yourprofile.com</p>
        </span>
      </div>
      {/* end of X */}
    </div>
  );
};

export default Portfolio;
