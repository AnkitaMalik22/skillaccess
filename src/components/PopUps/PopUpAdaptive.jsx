import React, { useEffect, useState } from "react";
import { setTotalSelectedQuestions } from "../../redux/college/test/testSlice";
import { useDispatch } from "react-redux";

const PopUpAdaptive = ({
  handleOverlay,
  section,
  handleSave,
  setTotalQ,
  addSection,
  selectManual,
  manual,
}) => {
  const dispatch = useDispatch();
  const [noOfQuestions, setNoOfQuestions] = useState(0);

  const handleSubmit = async () => {
    // //console.log("noOfQuestions", noOfQuestions, section);
    await dispatch(setTotalSelectedQuestions(noOfQuestions));
    await handleSave(section);
    await handleOverlay();
  };

  return (
    <div
      className="w-full  min-w-full h-full min-h-[100vh] bg-black absolute z-[9999] flex left-0 top-0 bg-opacity-30 "
      // onClick={handleOverlay}
    >
      <div className="bg-white shadow-md w-96 h-56 mx-auto self-center rounded-md bg-opactiy-10  px-12 flex flex-col justify-center gap-4">
        <h1 className="text-center">
          Enter No Of Questions You want to select
        </h1>

        <input
          type="number"
          name="noOfQuestions"
          onChange={(e) => setTotalQ(Math.max(1, e.target.value))}
          className="w-full h-10 rounded-md bg-gray-100 focus:outline-none border-none"
          placeholder="Enter No of Questions (n)"
          min="1"
        />

        <div className="w-full flex justify-between">
          <button
            className="self-center justify-center flex bg-white border border-blued py-3 px-8 rounded-xl text-sm gap-2 text-blued"
            onClick={handleOverlay}
          >
            Cancel
          </button>
          <button
            className="self-center justify-center flex bg-accent border border-blue-700 py-3 px-8 rounded-xl text-sm gap-2 text-white"
            onClick={() => {
              addSection(section);
              handleOverlay();
            }}
          >
            Select
          </button>
          {manual && (
            <button
              className="self-center justify-center flex bg-accent border border-blue-700 py-3 px-8 rounded-xl text-sm gap-2 text-white"
              onClick={selectManual}
            >
              Select Manually
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopUpAdaptive;
