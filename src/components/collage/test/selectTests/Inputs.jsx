import React from "react";

import { FaSearch } from "react-icons/fa";

import { IoIosSearch } from "react-icons/io";
// import { useSearchParams } from "react-router-dom";

const Inputs = ({ questionType, setQuestionType, handleFilter, type }) => {
  // const [searchParams, setSearchParams] = useSearchParams();

  // const type = searchParams.get("level");

  console.log("type ", type);

  return (
    <div className="flex justify-between mb-4">
      {" "}
      <div className=" rounded-xl w-full flex bg-gray-100 px-2">
        <IoIosSearch className="self-center w-10 h-10 bg-gray-100 rounded-s-lg text-gray-400 py-2" />

        <input
          type="text"
          placeholder="Search..."
          name="search"
          onChange={handleFilter}
          className="placeholder border-none self-center bg-gray-100 focus:outline-none focus:ring-0 rounded-e-lg sm:w-80 w-fit"
        />
      </div>
      <div className="flex gap-1 w-full justify-end">
        {/* <select
          name=""
          id=""
          className="focus:outline-none select focus:ring-1 focus:ring-blued bg-gray-100 sm:w-1/3 w-1/2  rounded-lg self-center text-gray-400"
        >
          <option value="">Topic</option>
        </select> */}

        {type === "adaptive" && (
          <select
            name=""
            id=""
            value="MCQ"
            // onChange={(e) => setQuestionType(e.target.value)}
            className="select text-[#171717] font-bold text-sm focus:outline-none focus:ring-1 focus:ring-blued bg-gray-100 w-[250px] xl:w-[320px] h-[56px] rounded-lg self-center"
          >
            {/* <option value="">Question Type</option> */}

            <option value="mcq">MCQ</option>

            {/* <option value="findAnswer">find Answer</option>

          <option value="essay">essay</option>

          <option value="video">video</option>
          <option value="compiler">code</option> */}
          </select>
        )}

        {type !== "adaptive" && (
          <select
            name=""
            id=""
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
            className="select text-[#171717]  font-bold text-sm focus:outline-none focus:ring-1 focus:ring-blued bg-gray-100 w-[250px] xl:w-[320px] h-[56px] rounded-lg self-center"
          >
            <option value="">Question Type</option>

            <option value="mcq">MCQ</option>

            <option value="findAnswer">find Answer</option>

            <option value="essay">essay</option>

            <option value="video">video</option>
            <option value="compiler">code</option>
          </select>
        )}
      </div>
    </div>
  );
};

export default Inputs;
