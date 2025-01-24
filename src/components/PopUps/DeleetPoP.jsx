import React, { useState } from "react";
import { useDispatch } from "react-redux";

const DeletePoP = ({ handleDelete, handleCancel }) => {
  const dispatch = useDispatch();

  return (
    <div className="w-full  min-w-full h-full min-h-[100vh] bg-black absolute z-[9999] flex left-0 top-0 bg-opacity-30 ">
      <div className="bg-white shadow-md w-80 h-44 mx-auto self-center rounded-md bg-opactiy-10  px-12 flex flex-col justify-center gap-4">
        <h1 className="text-center">Confirm Delete</h1>
        <div className="w-full flex justify-between">
          <button
            className="self-center justify-center flex bg-white border border-blued py-3 px-8 rounded-xl text-sm gap-2 text-blued"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="self-center justify-center flex bg-accent border border-blue-700 py-3 px-8 rounded-xl text-sm gap-2 text-white"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePoP;
