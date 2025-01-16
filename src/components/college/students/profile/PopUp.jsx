import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { approveStudent } from "../../../../redux/college/student/studentSlice";
import Loader from "../../../loaders/Loader";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PopUp = ({ handleSave, handleOverlay, studentId }) => {
  const dispatch = useDispatch();
  const { APPORVE_STUDENT_LOADING } = useSelector(
    (state) => state.collegeStudents
  );
  const navigate = useNavigate();

  const handleApprove = () => {
    dispatch(approveStudent({ studentId }));
    navigate('/college/students?tab=pendingStudents')
  };

  return (
    <div
      className="w-full  min-w-full h-full min-h-[100vh] bg-black absolute z-[9999] flex left-0 top-0 bg-opacity-30 "
      onClick={handleOverlay}
    >
      <div className="bg-white shadow-md h-44 mx-auto self-center rounded-md bg-opactiy-10  px-12 flex flex-col justify-center gap-4">
        <h1 className="text-center">Confirm Approve</h1>
        <div className="w-auto flex justify-center gap-4">
          <button
            className="self-center justify-center flex bg-white border border-blued py-3 px-8 rounded-xl text-sm gap-2 text-blued"
            onClick={handleOverlay}
          >
            Cancel
          </button>
          <button
            className="self-center justify-center flex bg-accent border border-blue-700 py-3 px-8 rounded-xl text-sm gap-2 text-white"
            onClick={() => handleApprove()}
          >
            {APPORVE_STUDENT_LOADING ? (
              <>
                Approving... <Loader />
              </>
            ) : (
              "Approve"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
