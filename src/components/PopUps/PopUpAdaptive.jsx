import React, { useEffect, useState } from "react";
import { setTotalSelectedQuestions } from "../../redux/collage/test/testSlice";
import { useDispatch } from "react-redux";

const PopUpAdaptive = ({  handleOverlay }) => {
const dispatch = useDispatch();
const [noOfQuestions, setNoOfQuestions] = useState(0);


const handleSave = () => {
  dispatch(setTotalSelectedQuestions(noOfQuestions));


};




  return (
    <div
      className="w-full  min-w-full h-full min-h-[100vh] bg-black absolute z-[9999] flex left-0 top-0 bg-opacity-30 "
      onClick={handleOverlay}
    >
      <div className="bg-white shadow-md w-80 h-44 mx-auto self-center rounded-lg bg-opactiy-10  px-12 flex flex-col justify-center gap-4">
        <h1 className="text-center">Enter No Of Questions You want to select</h1>
        <input
          type="number"
          name="noOfQuestions"
          onChange={(e) => setNoOfQuestions(e.target.value)}
          className="w-full h-10 rounded-lg bg-gray-100 focus:outline-none border-none"
          placeholder="Enter No of Questions"
        />

        <div className="w-full flex justify-between">
          <button
            className="self-center justify-center flex bg-white border border-blue-500 py-3 px-8 rounded-xl text-xs gap-2 text-blue-500"
            onClick={handleOverlay}
          >
            Cancel
          </button>
          <button
            className="self-center justify-center flex bg-blue-700 border border-blue-700 py-3 px-8 rounded-xl text-xs gap-2 text-white"
            onClick={handleSave}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpAdaptive;
