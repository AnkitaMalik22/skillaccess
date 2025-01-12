import React from "react";

const Selected = () => {
  const arr = [2, 1, 1, 1, 1];
  return (
    <div className="w-full mx-auto">
      {/* legend */}
      <div className=" grid-cols-5  text-center  mx-auto  font-dmSans font-bold text-base hidden md:grid">
        <div className="bg-accent bg-opacity-5 rounded-s-lg p-2 ">
          <h2>Name and Profile</h2>
        </div>
        <div className="bg-accent bg-opacity-5 p-2">
          <h2>Date</h2>
        </div>
        <div className="bg-accent bg-opacity-5 p-2">
          <h2>Status</h2>{" "}
        </div>
        <div className="bg-accent  bg-opacity-5 p-2">
          <h2>Assessment Performance(Mcq &Code)</h2>
        </div>
        <div className="bg-accent bg-opacity-5 p-2 rounded-e-lg">
          <h2>Review</h2>
        </div>
      </div>

      {/* list to be iterated */}
      {arr.map(() => (
        <div className=" grid-cols-5 rounded-md my-4 py-2 pl-2   mx-auto  font-dmSans  text-sm hidden md:grid w-11/12">
          {" "}
          {/* row-2 */}
          {/* <div className={` flex `}>
            <div className="flex self-center">
              <div className=" min-w-[3rem]  h-12 self-center bg-red-600 mr-2  "></div>
              <span className="break-words min-w-0 pt-1 ">
                <h2 className="font-dmSans font-semibold text-sm sm:text-base  ">
                  Role
                </h2>
                <h2 className="font-dmSans font-medium text-sm break-words text-gray-400">
                  {" "}
                  CompanyName
                </h2>
              </span>
            </div>
          </div> */}
          {/*  */}
          {/* <div className="flex justify-center mr-16 ">
            <div className=" self-center h-fit ">
              <span>
                <h2 className="font-dmSans  sm:text-sm ">1 Year</h2>
              </span>
            </div>
          </div> */}
          {/*  */}
          {/* <div className="flex justify-center">
            <div className=" self-center h-fit">
              <span>
                <h2 className="font-dmSans  sm:text-sm">Senior</h2>
              </span>
            </div>
          </div> */}
          {/*  */}
          {/* <div className="flex justify-center">
            <div className=" self-center">
              <span className="flex gap-2">
                <div className="min-w-[6rem] bg-opacity-5 rounded-md h-3 mx-auto bg-green-600">
                  <div className={`w-3/5 bg-green-700 h-full rounded-md`}></div>
                </div>
                <h2 className="font-dmSans font-bold text-sm sm:text-sm ">
                  {" "}
                  70%
                </h2>
              </span>
            </div>
          </div> */}
          {/*  */}
          {/* <div className="flex justify-end mr-3">
            <span className="self-center ">
              <h2 className="font-dmSans  text-sm sm:text-base text-blued   ">
                Assessment Review
              </h2>
            </span>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default Selected;
