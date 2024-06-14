import React, { useEffect, useState } from "react";
import Header from "../../../components/collage/settings/security/Header";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { FaArrowRightLong } from "react-icons/fa6";
import {
  getSecretQr,
  selectAuth,
  updatePassword,
} from "../../../redux/collage/auth/authSlice";
import useTranslate from "../../../hooks/useTranslate";
import QrPop from "../../../components/PopUps/QrPop";

const Security = () => {
  useTranslate();
  const { qr } = useSelector((state) => state.collageAuth);

  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => state.collageAuth);

  const navigate = useNavigate();
  const [type, setType] = useState("password");
  const [type1, setType1] = useState("password");
  const [type2, setType2] = useState("password");
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [selectedOption, setSelectedOption] = useState(
    user?.authType === "qr"
      ? "securityApp"
      : user?.authType === "otp"
      ? "textMessage"
      : "none"
  );

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    console.log(option);
    if (option === "securityApp") {
      setSelectedOption("securityApp");
      setShowQR(true);
      console.log("securityApp clicked");
      dispatch(selectAuth({ type: "qr" }));
    } else if (option === "textMessage") {
      console.log("textMessage clicked");
      dispatch(selectAuth({ type: "otp" }));
      // navigate("/collage/settings/security/secondFA");
    } else {
      console.log("none clicked");
      dispatch(selectAuth({ type: "none" }));
    }
  };

  const handleChnage = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleUpdatePassword = (password) => {
    console.log("update");

    dispatch(updatePassword(password));
  };
  // useEffect(() => {
  //   if (user.authType === "qr") {
  //     setSelectedOption("securityApp");
  //     return;
  //   }
  //   if (user.authType === "otp") {
  //     setSelectedOption("textMessage");
  //     return;
  //   }
  //   if (user.authType === "none") {
  //     setSelectedOption("none");
  //     return;
  //   }
  // }, []);
  // useEffect(() => {
  //   if (selectedOption === "securityApp") {
  //     dispatch(selectAuth({ type: "qr" }));
  //   } else if (selectedOption === "textMessage") {
  //     dispatch(selectAuth({ type: "otp" }));
  //     // navigate("/collage/settings/security/secondFA");
  //   } else {
  //     dispatch(selectAuth({ type: "none" }));
  //   }
  // }, [selectedOption]);
  // const handleVerificationClick = () => {
  //   if (selectedOption === "securityApp") {
  //     dispatch(selectAuth({ type: "qr" }));
  //   } else if (selectedOption === "textMessage") {
  //     dispatch(selectAuth({ type: "otp" }));
  //     // navigate("/collage/settings/security/secondFA");
  //   }
  // };
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    console.log("ue");
    dispatch(getSecretQr());
  }, []);
  return (
    <>
      <Header />

      <div className="flex gap-40 mt-20">
        <div className="sm:w-2/6">
          <h1 className="text-lg font-bold">Two-Factor Authentication</h1>
          <p className="text-gray-400">
            We'll ask for a security code when we need to confirm that it's you
            logging in.
          </p>
        </div>
        <div>
          {/* toggle 1 */}
          <div className="flex items-center gap-4 mb-4 ">
            <input
              type="radio"
              name="textMessage"
              id="textMessage"
              className="bg-[#DEEBFF] rounded-full border-none outline-none focus:outline-0 focus:ring-0 h-6 self-center w-6 cursor-pointer"
              checked={selectedOption === "textMessage"}
              onChange={() => handleOptionChange("textMessage")}
            />
            <div>
              <h1 className="text-lg font-bold">Text Message</h1>
              <p className="text-gray-400 whitespace-pre-wrap">
                Will send code to {"  "}******982
              </p>
            </div>
            {/* {selectedOption === "textMessage" && (
              <button
                onClick={handleVerificationClick}
                className="ml-2 px-2 py-2 bg-blue-700 text-[#fff] font-semibold rounded-[4px]"
              >
                Verify By TOTP
              </button>
            )}{" "} */}
          </div>

          {/* toggle 2 */}
          <div className="flex items-center gap-4 mb-4">
            <input
              type="radio"
              name="securityApp"
              id="securityApp"
              className="bg-[#DEEBFF] rounded-full border-none outline-none focus:outline-0 focus:ring-0 h-6 self-center w-6 cursor-pointer"
              checked={selectedOption === "securityApp"}
              onChange={() => handleOptionChange("securityApp")}
            />
            <div>
              <h1 className="text-lg font-bold">Authentication App</h1>
              <p className="text-gray-400 whitespace-pre-wrap">
                You'll get a code from your<br></br> security app.
              </p>
            </div>
            {/* {selectedOption === "securityApp" && (
              <button
                onClick={handleVerificationClick}
                className=" ml-2 px-2 py-2 text-[#fff] font-semibold rounded-[4px] bg-blue-700"
              >
                Verify By SecurityApp
              </button>
            )} */}
          </div>

          {/* toggle 3 */}
          <div className="flex items-center gap-4 mb-4">
            <input
              type="radio"
              name="none"
              id="none"
              className="bg-[#DEEBFF] rounded-full border-none outline-none focus:outline-0 focus:ring-0 h-6 self-center w-6 cursor-pointer"
              checked={selectedOption === "none"}
              onChange={() => handleOptionChange("none")}
            />
            <div>
              <h1 className="text-lg font-bold">Password</h1>
              <p className="text-gray-400 whitespace-pre-wrap">
                {/* You'll get a code from your<br></br> security app. */}
              </p>
            </div>

            {/* {selectedOption === "securityApp" && (
              <button
                onClick={handleVerificationClick}
                className=" ml-2 px-2 py-2 text-[#fff] font-semibold rounded-[4px] bg-blue-700"
              >
                Verify By SecurityApp
              </button>
            )} */}
          </div>
          <div className="">
            {selectedOption === "securityApp" && (
              <button
                className="flex gap-2 text-xs font-bold px-6 py-2 text-[#fff]  rounded-[12px] bg-blue-700"
                onClick={() => setShowQR(true)}
              >
                Show Qr Code{" "}
                <FaArrowRightLong className="self-center text-lg text-white ml-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-40 mt-10">
        <div className="sm:w-2/6">
          <h1 className="text-lg font-bold">Change Password</h1>
          <p className="text-gray-400">
            Create a new strong password that is at least 12 characters long.
          </p>
        </div>
        <div className="">
          {/* toggle 1 */}
          <div className="flex gap-2 flex-col mb-4 ">
            <h1 className="text-gray-400">Type your current password*</h1>
            <div className="flex relative">
              <input
                type={type}
                name="oldPassword"
                value={password.oldPassword}
                onChange={handleChnage}
                className="py-3 rounded-xl border-none bg-lGray bg-opacity-5 w-96 placeholder:text-sm placeholder:text-gray-400 font-medium"
                placeholder="Current password"
              />
              <button
                className="flex items-center pr-3 focus:outline-none absolute right-0 top-0 h-full "
                onClick={(e) => {
                  e.preventDefault();
                  type === "text" ? setType("password") : setType("text");
                }}
              >
                {type === "text" ? (
                  <LuEye className="text-gray-400 text-2xl" />
                ) : (
                  <LuEyeOff className="text-gray-400 text-2xl" />
                )}
              </button>
            </div>
          </div>

          {/* toggle 1 */}
          <div className="flex gap-2 flex-col mb-4">
            <h1 className="text-gray-400">Type your new password*</h1>
            <div className="flex relative">
              <input
                type={type1}
                name="newPassword"
                value={password.newPassword}
                onChange={handleChnage}
                className="py-3 rounded-xl border-none bg-lGray bg-opacity-5 w-96 placeholder:text-sm placeholder:text-gray-400 font-medium"
                placeholder="New password"
              />
              <button
                className="flex items-center pr-3 focus:outline-none absolute right-0 top-0 h-full z-10 "
                onClick={(e) => {
                  e.preventDefault();
                  type1 === "text" ? setType1("password") : setType1("text");
                }}
              >
                {type1 === "text" ? (
                  <LuEye className="text-gray-400 text-2xl" />
                ) : (
                  <LuEyeOff className="text-gray-400 text-2xl" />
                )}
              </button>
            </div>
          </div>

          {/* toggle 1 */}
          <div className="flex gap-2 flex-col mb-4">
            <h1 className="text-gray-400">Retype your new password*</h1>

            <div className="flex relative">
              <input
                type={type2}
                name="confirmPassword"
                value={password.confirmPassword}
                onChange={handleChnage}
                className="py-3 rounded-xl border-none bg-lGray bg-opacity-5 w-96 placeholder:text-sm placeholder:text-gray-400 font-medium"
                placeholder="Retype password"
              />
              <button
                className="flex items-center pr-3 focus:outline-none absolute right-0 top-0 h-full z-10 "
                onClick={(e) => {
                  e.preventDefault();
                  type2 === "text" ? setType2("password") : setType2("text");
                }}
              >
                {type2 === "text" ? (
                  <LuEye className="text-gray-400 text-2xl" />
                ) : (
                  <LuEyeOff className="text-gray-400 text-2xl" />
                )}
              </button>
            </div>
          </div>

          <button
            onClick={() => handleUpdatePassword(password)}
            className="bg-blue-600 text-white py-3 px-8 rounded-xl"
          >
            Update Password
          </button>
        </div>
        {showQR && <QrPop onCancel={() => setShowQR(false)} qr={qr} />}
      </div>
    </>
  );
};

export default Security;
