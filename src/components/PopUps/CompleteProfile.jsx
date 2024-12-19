import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
const CompleteProfile = ({ onCancel }) => {
  return (
    <div className="w-full  min-w-full h-screen  min-h-[100vh] bg-black absolute z-[9999] flex left-0 top-0 bg-opacity-30 ">
      <div className="bg-white shadow-md w-[780px] h-96 mx-auto self-center   rounded-lg bg-opactiy-10  px-12 flex flex-col justify-center gap-4 relative">
        <p className="text-[28px] font-bold flex justify-center mt-6 text-blued  ">
          Complete your profile first
        </p>
        <div className="w-full flex gap-4 mb-6">
          <div className="w-[40%] -mt-4">
            <img src="/images/profile-data.png" alt="profile-data" />
          </div>
          <div className="w-[52%]">
            <p className="font-medium text-xl text-[#7f7f7f]">
              To start your journey with us, fill in your profile details first
              to have seemless experience
            </p>
            <button className="bg-accent mt-14 w-full rounded-[16px] text-[12px] text-[#fff] py-3">
              Continue
            </button>
          </div>
        </div>
        <button
          className="h-6 w-6 text-[#2e3e4b] absolute right-4 top-6"
          onClick={onCancel}
        >
          <RxCross2 />
        </button>
      </div>
    </div>
  );
};

export default CompleteProfile;
