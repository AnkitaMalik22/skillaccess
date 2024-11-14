import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useDispatch, useSelector } from "react-redux";
import {
  getSecretQr,
  verifyQr,
} from "../../../../redux/college/auth/authSlice";
import toast from "react-hot-toast";

const SecurityApp = () => {
  const dispatch = useDispatch();

  const { qr } = useSelector((state) => state.collegeAuth);

  const [code, setCode] = useState(null);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (!/\D/.test(code)) {
        // Using \d to match any digit
        if (code.length !== 6) {
          toast.error("invalid code");
          return;
        }
        toast.success("verifying");
        dispatch(verifyQr({ secret: qr.secret, token: code }));
      } else {
        toast.error("fail");
      }

      // Here you might submit a form, perform a search, or any other action you want
    }
  };

  const handleChange = (e) => {
    setCode(e.target.value);
  };
  return (
    <div className="bg-[#fff] min-h-screen">
      <h1 className="mx-4 border-b-2 text-3xl pt-6">
        Google Authenticator Form
      </h1>
      <h1 className="px-4  text-3xl py-6">
        Please go through following steps to register yourself
      </h1>
      <p className="px-4 ">
        1. Download the "Google Authenticator" from Play Store for Android use{" "}
        <a
          href="https://play.google.com/store/search?q=google+authenticator&ic=apps"
          className="border-blue-700 text-blue-700"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://play.google.com/store/search?q=google+authenticator&ic=apps
        </a>
        <br></br> or App Store for Apple use{" "}
        <a
          href="https://apps.apple.com/us/app/google-authenticator/id388497605"
          className="border-blue-700 text-blue-700"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://apps.apple.com/us/app/google-authenticator/id388497605
        </a>
        .
      </p>

      <p className="px-4 pt-3 ">
        2. Open google Authenticator on your phone and scan the QR code after
        clicking on + icon.
      </p>
      <div className="px-4 flex gap-8 items-center pt-10">
        <p className="font-semibold">Secretkey:</p>
        <input
          type="Number"
          value={code}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="h-6 w-[200px] placeholder-gray-400 bg-gray-200 border-none rounded-[4px] py-4"
          placeholder="Enter Secret Key"
        />
      </div>
      {/* <div className="px-4 flex gap-10 items-center pt-6">
        <p className="font-semibold">Qr Code:</p>

        <img src={qr.code} alt="" />
      </div> */}
    </div>
  );
};

export default SecurityApp;
