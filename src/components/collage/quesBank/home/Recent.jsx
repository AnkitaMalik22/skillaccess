import React from "react";
import { useNavigate } from "react-router-dom";

const Recent = () => {
  const arr = [2, 1, 1, 1, 1];
  const navigate = useNavigate();
  return (
    <div className="w-full mx-auto bg-[#F8F8F9] lg:px-8 lg:pt-7 pb-4 rounded-3xl">
      <span className="flex justify-between ">
        <h2 className="font-bold text-xl">Recent used questions</h2>
        <button
          className="rounded-xl bg-[#95ACFA] text-xs font-bold text-white py-2 px-3"
          onClick={() => navigate("/collage/quesBank/recent")}
        >
          View All
        </button>
      </span>

      {/* legend */}
      <div className=" grid-cols-3  text-center my-6 mx-auto  font-dmSans font-bold text-base grid">
        <div className="bg-[#0052CC] bg-opacity-5 rounded-s-lg p-2 ">
          <h2>Topic</h2>
        </div>
        <div className="bg-[#0052CC] bg-opacity-5 p-2">
          <h2>Type</h2>
        </div>
        <div className="bg-[#0052CC] bg-opacity-5 rounded-e-lg p-2">
          <h2>Actions</h2>{" "}
        </div>
      </div>

      {/* list to be iterated */}
      {arr.map(() => (
        <div className=" grid-cols-3  text-center  mx-auto  font-dmSans font-bold text-base hidden md:grid bg-white py-3 mb-3 rounded-xl">
          {" "}
          {/* row-2 */}
          <div className={` flex justify-center`}>
            <div className="flex self-center ">
              <span>
                <h2 className="font-dmSans text-center  sm:text-sm">
                  UX Study basics
                </h2>
              </span>
            </div>
          </div>
          {/*  */}
          <div className="flex justify-center ">
            <div className=" self-center h-fit">
              <span>
                <h2 className="font-dmSans font-normal sm:text-sm">
                  Multiple Choice Questions
                </h2>
              </span>
            </div>
          </div>
          {/*  */}
          <div className="flex justify-center gap-3 ">
            <div className=" self-center ">
              {" "}
              <img src="../../images/icons/clip.png" alt="" />{" "}
            </div>
            <div className=" self-center">
              <img src="../../images/icons/pencil.png" alt="" />
            </div>
            <div className=" self-center ">
              <img src="../../images/icons/cross.png" alt="" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recent;
