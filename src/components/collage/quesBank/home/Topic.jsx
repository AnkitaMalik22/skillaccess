import React from "react";
import Folder from "./icon/Folder";
import { useNavigate } from "react-router-dom";

const Topic = () => {
  const navigate = useNavigate();
  return (
    <div className=" w-full bg-[#F8F8F9] rounded-3xl py-8 px-12 ">
      <span className="flex justify-between mb-7">
        <h2 className="font-bold text-xl">Choose a Topic</h2>
        <button
          className="rounded-xl bg-[#95ACFA] text-xs font-bold text-white py-2 px-3"
          onClick={() => navigate("/collage/quesBank/topic")}
        >
          View All
        </button>
      </span>

      <div className="flex flex-wrap 3xl:gap-10 gap-3">
        <div className="3xl:w-72 w-[24%] h-64 bg-white rounded-3xl  ">
          <figure className="h-[155.5px] w-full object-cover">
            <img src="../../images/Rectangle.png" alt="" />
          </figure>
          <h2 className="text-lg font-bold ml-4 mt-4"> UI/UX Designer</h2>
          <div className="ml-4 mt-4 flex gap-2">
            <Folder />
            <p className="text-[#95ACFA] text-sm">25 Files</p>
          </div>
        </div>
        <div className="3xl:w-72 w-[24%] h-64 bg-white rounded-3xl  ">
          <figure className="h-[155.5px] w-full object-cover">
            <img src="../../images/FrontEnd.png" alt="" />
          </figure>
          <h2 className="text-lg font-bold ml-4 mt-4"> Front End Code</h2>
          <div className="ml-4 mt-4 flex gap-2">
            <Folder />
            <p className="text-[#95ACFA] text-sm">40 Files</p>
          </div>
        </div>
        <div className="3xl:w-72 w-[24%] h-64 bg-white rounded-3xl  ">
          <figure className="h-[155.5px] w-full object-cover">
            <img src="../../images/HR.png" alt="" />
          </figure>
          <h2 className="text-lg font-bold ml-4 mt-4"> Human Resources</h2>
          <div className="ml-4 mt-4 flex gap-2">
            <Folder />
            <p className="text-[#95ACFA] text-sm">25 Files</p>
          </div>
        </div>
        <div className="3xl:w-72 w-[24%] h-64 bg-white rounded-3xl  ">
          <figure className="h-[155.5px] w-full object-cover">
            <img src="../../images/Marketing.png" alt="" />
          </figure>
          <h2 className="text-lg font-bold ml-4 mt-4"> Digital Marketing</h2>
          <div className="ml-4 mt-4 flex gap-2">
            <Folder />
            <p className="text-[#95ACFA] text-sm">25 Files</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic;
