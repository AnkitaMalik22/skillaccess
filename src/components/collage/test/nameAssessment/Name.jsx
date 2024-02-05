import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Progress } from "./Progress";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllTests,
  setTest,
} from "../../../../redux/features/test/testSlice";

const Name = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTests());
  }, []);

  const getTests = () => {
    dispatch(getAllTests());
    console.log("hello tests");
  };

  return (
    <div className="font-dmSans text-sm font-bold">
      <Header />
      <Progress />

      {/* larger screens */}
      <div className="  w-11/12 mx-auto h-[90vh] my-2 rounded-lg tracking-wide justify-between  ">
        <input
          type="text"
          className="w-full bg-gray-100 h-10 p-2 mt-12 rounded-lg focus:outline-0 focus:ring-blued focus:ring-1 border-none placeholder-gray-400"
          placeholder="Name your assessment.........."
          onChange={(e) =>
            dispatch(
              setTest({
                testName: e.target.value,
              })
            )
          }
        />

        <hr className="w-full my-5" />

        <label for="type" className="font-normal text-blue-500 ">
          Select the assessment type
        </label>
        <select
          name="type"
          id=""
          className="w-full select bg-gray-100 h-10 p-2 mt-4 focus:outline-none border-none text-gray-400 rounded-lg focus:ring-blued focus:ring-1"
          onChange={(e) =>
            dispatch(
              setTest({
                testType: e.target.value,
              })
            )
          }
        >
          <option value="Beginer" className="text-gray-400">
            Beginer level
          </option>
          <option value=" Intermediate" className="text-gray-400">
            Intermediate level
          </option>
          <option value="Advanced" className="text-gray-400">
            Advanced level
          </option>
        </select>
      </div>
    </div>
  );
};

export default Name;
