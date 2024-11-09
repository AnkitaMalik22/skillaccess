import React, { useState } from "react";

const PopUp = ({ handleSave, handleOverlay, message, saveText }) => {
  return (
    <div
      className="w-full  min-w-full h-full min-h-[100vh] bg-black absolute z-[9999] flex left-0 top-0 bg-opacity-30 "
      onClick={handleOverlay}
    >
      <div className="bg-white shadow-md w-80 h-44 mx-auto self-center rounded-lg bg-opactiy-10  px-12 flex flex-col justify-center gap-4">
        <h1 className="text-center">{message || "Confirm upload"}</h1>
        <div className="w-full flex justify-between">
          <button
            className="self-center justify-center flex bg-white border border-blued py-3 px-8 rounded-xl text-xs gap-2 text-blued"
            onClick={handleOverlay}
          >
            Cancel
          </button>
          <button
            className="self-center justify-center flex bg-accent border border-blue-700 py-3 px-8 rounded-xl text-xs gap-2 text-white"
            onClick={handleSave}
          >
            {saveText || "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
