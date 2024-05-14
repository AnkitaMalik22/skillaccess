import React from "react";

const Portfolio = ({Portfolio}) => {
  return (
    <div className="px-4  ">
      {/* wordpress  */}
      {/* <div className=" grid grid-cols-4 text-center mt-3 bg-white rounded-lg w-11/12 mx-auto">
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
      </div> */}
      {/* end of wordpress */}

      {/* linkedIN */}
{    Portfolio?.map((portfolio,index)=>{
  return(
<div className=" grid grid-cols-4 text-center mt-3 bg-white rounded-lg w-11/12 mx-auto" key={index}>
        <span className="w-full  px-10 py-2 text-sm font-dmSans grid ">
          <img
            src="../../images/icons/LinkedIn.png"
            alt="wordPress"
            className=""
          />
        </span>
        <span className="self-center col-span-3">
          <p className="font-xs">{portfolio}</p>
        </span>
      </div>
  )
})  }
      {/* end of LinkedIn*/}

      
      {/* <div className=" grid grid-cols-4 text-center mt-3 bg-white rounded-lg w-11/12 mx-auto">
        <span className="w-full  px-10 py-2 text-sm font-dmSans grid ">
          <img src="../../images/icons/fb.png" alt="wordPress" className="" />
        </span>
        <span className="self-center col-span-3">
          <p className="font-xs">www.yourprofile.com</p>
        </span>
      </div> */}
      {/* end of fb */}

      {/* ig */}
      {/* <div className=" grid grid-cols-4 text-center mt-3 bg-white rounded-lg w-11/12 mx-auto">
        <span className="w-full  px-10 py-2 text-sm font-dmSans grid ">
          <img src="../../images/icons/ig.png" alt="wordPress" className="" />
        </span>
        <span className="self-center col-span-3">
          <p className="font-xs">www.yourprofile.com</p>
        </span>
      </div> */}
      {/* end of ig */}

      {/* yt */}
      {/* <div className=" grid grid-cols-4 text-center mt-3 bg-white rounded-lg w-11/12 mx-auto">
        <span className="w-full  px-10 py-2 text-sm font-dmSans grid ">
          <img src="../../images/icons/yt.png" alt="wordPress" className="" />
        </span>
        <span className="self-center col-span-3">
          <p className="font-xs">www.yourprofile.com</p>
        </span>
      </div> */}
      {/* end of yt */}

      {/* X */}
      {/* <div className=" grid grid-cols-4 text-center mt-3 bg-white rounded-lg w-11/12 mx-auto">
        <span className="w-full  px-10 py-2 text-sm font-dmSans grid ">
          <img src="../../images/icons/x.png" alt="wordPress" className="" />
        </span>
        <span className="self-center col-span-3">
          <p className="font-xs">www.yourprofile.com</p>
        </span>
      </div> */}
      {/* end of X */}
    </div>
  );
};

export default Portfolio;
