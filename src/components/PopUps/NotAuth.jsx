import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const NotAuth = ({ onCancel, onConfirm }) => {
  const navigate = useNavigate();
  // useEffect(() => {
  //     navigate("/");
  // }, []);

  const {USER_LOADING} = useSelector((state) => state.collageAuth);
  
const handleGoHome = () => {
    navigate("/");
  }



  return (
    !USER_LOADING && (
      <div className="w-full  min-w-full h-full min-h-[100vh] bg-black absolute z-[9999] flex left-0 top-0 bg-opacity-30 ">
      <div className="bg-white shadow-md w-80 h-44 mx-auto self-center rounded-lg bg-opactiy-10  px-12 flex flex-col justify-center gap-4">
        <h1 className="text-center font-medium"> Oops! You are logged out</h1>
        {/* <div className="w-full flex justify-between"> */}
        <p className="text-center">
          Login to continue
        </p>
          <button
            className="self-center justify-center flex bg-blue-700 border border-blue-700 py-3 px-8 rounded-xl text-xs gap-2 text-white"
            onClick={() => handleGoHome()}
          >
            Login
          </button>
        {/* </div> */}
      </div>
    </div>
    )
  );
};

export default NotAuth;
