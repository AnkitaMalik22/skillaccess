import React from "react";

import { FaSearch } from "react-icons/fa";

import { IoIosSearch } from "react-icons/io";

const Inputs = ({ questionType, setQuestionType,handleFilter }) => {
  return (
    <div className=" mx-auto  my-2 rounded-lg sm:flex justify-between">
      {" "}
      <div className=" rounded-xl  w-full sm:h-12 h-10 flex my-2 ">
        <span className="w-fit  flex self-center">
          <IoIosSearch className="self-center w-10 h-10 bg-gray-100 rounded-s-lg text-gray-400 py-2 " />

          <input
            type="text"
            placeholder="Search..."
            name="search"

            onChange={handleFilter}
            className="placeholder pl-0 border-none self-center bg-gray-100 focus:outline-none focus:ring-0 rounded-e-lg sm:w-80 w-fit"
          />
        </span>
      </div>
      <div className="flex gap-1 w-full justify-end">
        {/* <select
          name=""
          id=""
          className="focus:outline-none select focus:ring-1 focus:ring-blued bg-gray-100 sm:w-1/3 w-1/2  rounded-lg self-center text-gray-400"
        >
          <option value="">Topic</option>
        </select> */}

        <select
          name=""
          id=""
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
          className="select text-gray-400 focus:outline-none focus:ring-1 focus:ring-blued bg-gray-100 sm:w-1/3   w-1/2 rounded-lg self-center"
        >
          <option value="">Question Type</option>

          <option value="mcq">MCQ</option>

          <option value="findAnswer">find Answer</option>

          <option value="essay">essay</option>

          <option value="video">video</option>
          <option value="compiler">code</option>
        </select>
      </div>
    </div>
  );
};

export default Inputs;
