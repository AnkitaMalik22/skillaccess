import React from "react";

const List = () => {
  return (
    <div className=" grid-cols-5 rounded-lg my-4 py-2 px-6    mx-auto  font-dmSans  text-sm hidden md:grid w-[98.9%] bg-white">
      {" "}
      {/* row-2 */}
      <div className={` flex `}>
        <div className="flex self-center ">
          <div className=" min-w-[2.5rem]  h-10 self-center bg-red-600 mr-2 rounded-lg "></div>

          <h2 className="font-dmSans font-bold text-sm sm:text-lg self-center ">
            Jhon Doe
          </h2>
        </div>
      </div>
      {/*  */}
      <div className="flex justify-center mr-16 ">
        <div className=" self-center h-fit ">
          <span>
            <h2 className="font-dmSans  sm:text-lg text-gray-400 ">
              Mechanical
            </h2>
          </span>
        </div>
      </div>
      {/*  */}
      <div className="flex justify-center">
        <div className=" self-center h-fit">
          <span>
            <h2 className="font-dmSans sm:text-lg text-gray-400">II Year</h2>
          </span>
        </div>
      </div>
      {/*  */}
      {/*  */}
      <div className="flex justify-center">
        <div className=" self-center h-fit">
          <span>
            <h2 className="font-dmSans sm:text-lg text-gray-400">2022</h2>
          </span>
        </div>
      </div>
      {/*  */}
      {/*  */}
      <div className="flex justify-end mr-3">
        <span className="self-center ">
          <input type="checkbox" name="" id="" className="p-1 rounded" />
        </span>
      </div>
    </div>
  );
};

export default List;
