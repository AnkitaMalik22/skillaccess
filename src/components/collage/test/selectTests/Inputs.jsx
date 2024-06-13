import React from "react";
import { IoIosSearch } from "react-icons/io";

const Inputs = ({ questionType, setQuestionType, handleFilter, type }) => {
  return (
    <div className="flex justify-between mb-5 items-center">
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
        {type === "adaptive" && (
          <select
            name=""
            id=""
            value="MCQ"
            // onChange={(e) => setQuestionType(e.target.value)}
            className="select text-[#171717] font-bold text-sm focus:outline-none focus:ring-1 focus:ring-blued bg-gray-100 w-[250px] xl:w-[320px] h-[56px] rounded-lg self-center"
          >
            <option value="mcq">MCQ</option>
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
            <option value="findAnswer">Find Answer</option>
            <option value="essay">Essay</option>
            <option value="video">Video</option>
            <option value="compiler">Code</option>
          </select>
        )}
      </div>
    </div>
  );
};

export default Inputs;
