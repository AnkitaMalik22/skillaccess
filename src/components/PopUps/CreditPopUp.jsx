import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const CreditPopUp = ({ onCancel }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full  min-w-full h-full min-h-[100vh] bg-black fixed z-[9999] flex left-0 top-0 bg-opacity-30 ">
      <div className="bg-white shadow-md w-[350px] h-44 mx-auto self-center rounded-lg bg-opactiy-10  px-12 flex flex-col justify-center gap-4">
        <h1 className="text-center text-lg font-bold">
          You don't have enough credits
        </h1>
        <div className="w-full flex justify-between">
          <button
            className="self-center justify-center flex bg-white border border-blue-500 py-3 px-8 rounded-xl text-xs gap-2 text-blue-500"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="self-center justify-center flex bg-blue-700 border border-blue-700 py-3 px-8 rounded-xl text-xs gap-2 text-white"
            onClick={() => navigate("/collage/accounting")}
          >
            Get Credits
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreditPopUp;
