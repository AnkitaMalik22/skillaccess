import React, { useState,useEffect } from "react";
import Header from "./Header";
import { LiaStopwatchSolid } from "react-icons/lia";
import Mcq from "./Mcq";
import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
const {getTopicById} = require("../../../../redux/collage/test/testSlice");

const Review = () => {
  const{ id }= useParams();
  const dispatch = useDispatch();
const {currentTopic} = useSelector((state) => state.test);

useEffect(() => {
  dispatch(getTopicById(id));
  console.log(currentTopic, "currentTopic" , id);
}, [dispatch]);


  return (
    <div className="font-dmSans text-sm font-bold">
      <Header />

      <div className="  w-11/12 mx-auto h-[90vh] my-2 rounded-lg   bg-gray-100 ">
        <div className="flex justify-between p-4">
          <span className="flex gap-2 pl-2">
            <h2>Multiple Choice Questions</h2>
            <div className="flex gap-1 ">
              <LiaStopwatchSolid className="self-center text-gray-500 w-5 h-5" />
              <p className="text-gray-400 text-xs self-center">10 mins</p>
            </div>
          </span>
          <span className="flex">
            <input
              type="checkbox"
              name="delete"
              className="self-center bg-[#DEEBFF] border-none rounded-md"
            />
            <label for="delete" className="pl-2">
              Delete Selected
            </label>
          </span>
        </div>

        <Mcq />
      </div>
    </div>
  );
};

export default Review;
