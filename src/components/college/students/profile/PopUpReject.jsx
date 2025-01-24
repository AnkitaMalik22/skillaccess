import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { rejectRequest } from "../../../../redux/college/student/studentSlice";
import Loader from "../../../loaders/Loader";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PopUp = ({ handleSave, handleOverlay, studentId }) => {
  const dispatch = useDispatch();
  const { REJECT_STUDENT_LOADING } = useSelector(
    (state) => state.collegeStudents
  );
  const navigate = useNavigate();

  const handleReject = () => {
    dispatch(rejectRequest(studentId));
    navigate(-1);
  };

  return (
    <div
      className="w-full  min-w-full h-full min-h-[100vh] bg-black absolute z-[9999] flex left-0 top-0 bg-opacity-30 "
      onClick={handleOverlay}
    >
      <div className="bg-white shadow-md w-80 h-44 mx-auto self-center rounded-md bg-opactiy-10  px-12 flex flex-col justify-center gap-4">
        <h1 className="text-center">Confirm Reject</h1>
        <div className="w-full flex justify-between">
          <button
            className="self-center justify-center flex bg-white border border-blued py-3 px-8 rounded-xl text-sm gap-2 text-blued"
            onClick={handleOverlay}
          >
            Cancel
          </button>
          <button
            className="self-center justify-center flex bg-accent border border-blue-700 py-3 px-8 rounded-xl text-sm gap-2 text-white"
            onClick={() => handleReject()}
          >
            {REJECT_STUDENT_LOADING ? (
              <>
                Rejecting... <Loader />
              </>
            ) : (
              "Reject"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
