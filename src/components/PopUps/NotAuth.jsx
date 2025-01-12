import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";

const NotAuth = ({ onCancel, onConfirm }) => {
  const navigate = useNavigate();
  // useEffect(() => {
  //     navigate("/");
  // }, []);

  const { USER_LOADING, isLoggedIn } = useSelector(
    (state) => state.collegeAuth
  );

  const handleGoHome = () => {
    navigate("/");
  };

  return !isLoggedIn ? (
    <div className="w-full  min-w-full h-full min-h-[100vh] bg-black absolute z-[9999] flex left-0 top-0 bg-opacity-30 ">
      <div className="bg-white shadow-md w-80 h-44 mx-auto self-center rounded-md bg-opactiy-10  px-12 flex flex-col justify-center gap-4">
        <h1 className="text-center font-medium"> Oops! You are logged out</h1>
        {/* <div className="w-full flex justify-between"> */}
        <p className="text-center">Login to continue</p>
        <button
          className="self-center justify-center flex bg-accent border border-blue-700 py-3 px-8 rounded-xl text-sm gap-2 text-white"
          onClick={() => handleGoHome()}
        >
          Login
        </button>
        {/* </div> */}
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default NotAuth;
