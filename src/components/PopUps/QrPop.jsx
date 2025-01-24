import React from "react";

const QrPop = ({ onCancel, onConfirm, qr }) => {
  return (
    <div
      className="w-full  min-w-full h-full min-h-[100vh] bg-black absolute z-[9999] flex left-0 top-0 bg-opacity-30 "
      onClick={onCancel}
    >
      <div className="bg-white shadow-md w-[454px] h-[530px] mx-auto self-center rounded-md bg-opactiy-10  px-12 flex flex-col justify-center gap-4">
        <p className="text-center text-[24px] font-bold">
          Scan QR code for verification
        </p>
        <img src={qr?.code} alt="" />
      </div>
    </div>
  );
};

export default QrPop;
