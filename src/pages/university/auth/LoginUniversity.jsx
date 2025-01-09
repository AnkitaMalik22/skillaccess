import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LuEye, LuEyeOff } from "react-icons/lu";

import toast from "react-hot-toast";
import CircularLoader from "../../../components/CircularLoader";
import Layout from "../../university/auth/Layout";
import {
  loginUniversity,
  selectLoginState,
  selectUniversityData,
} from "../../../redux/university/auth/universityAuthSlice";
import InputField from "../../../components/InputField";
const UniversityLoginPage = () => {
  const { error, loading } = useSelector(selectLoginState);
  const user = useSelector(selectUniversityData);
  const [type, setType] = useState("password");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    Email: "",
    Password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { Email, Password } = credentials;
    const data = { Email, Password };

    try {
      const res = await dispatch(loginUniversity(data)).unwrap();
    } catch (err) {
      console.log(err);
      toast.error(err.message || "An error occurred during login.");
      // toast.error("An error occurred during login.");
    }
  };

  const isLoginDisabled = !credentials.Email || !credentials.Password;

  return (
    <Layout>
      <form action="" className="w-full">
        <div className="font-dmSans">
          <div className="card-body">
            {/* Logo Section */}
            <div className="flex gap-2 justify-center mb-4 md:mb-8">
              <img src="/images/logoFinal.png" alt="logo" className="w-60" />
            </div>

            {/* Heading Section */}
            <h2 className="font-bold text-2xl text-center text-[#171717] mb-2">
              Getting Started
            </h2>
            <h2 className="font-bold text-center text-[#8F92A1] text-xl mb-8">
              Welcome back!
            </h2>

            {/* Error Display */}
            {error && (
              <p className="border-l-4 pl-4 rounded-[4px] border-[#dc2626] w-full max-w-sm py-3 mx-auto text-sm text-[#dc2626] bg-[#fee2e2]">
                Oops! It seems like your email or password is incorrect. Please
                double-check and try again.
              </p>
            )}

            {/* Login Form */}
            <form
              className="w-full flex flex-col items-center"
              onSubmit={handleSubmit}
            >
              {/* Email Input */}
              <div className="w-full mx-auto flex  relative max-w-sm mb-2">
                <InputField
                  onChange={changeHandler}
                  value={credentials.Email}
                  name="Email"
                  type="email"
                  placeholder="Email Address"
                />
              </div>

              {/* Password Input */}
              <div className="w-full mx-auto flex rounded-2xl relative max-w-sm mb-2">
                <InputField
                  name="Password"
                  onChange={changeHandler}
                  value={credentials.Password}
                  type={type}
                  placeholder="Password"
                />
                <button
                  className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
                  onClick={(e) => {
                    e.preventDefault();
                    setType((prevType) =>
                      prevType === "text" ? "password" : "text"
                    );
                  }}
                  type="button"
                >
                  {type === "text" ? (
                    <LuEye className="text-gray-400 text-2xl" />
                  ) : (
                    <LuEyeOff className="text-gray-400 text-2xl" />
                  )}
                </button>
              </div>

              {/* Forgot Password */}
              <div className="flex gap-2 px-2 w-full max-w-sm mx-auto justify-end  mb-4 md:mb-8">
                <h1
                  className="text-blue-700 font-bold cursor-pointer"
                  onClick={() => navigate("/forgotPassword")}
                >
                  Forgot Password
                </h1>
              </div>

              {/* Login Button */}
              <button
                className={`btn hover:bg-accent bg-accent rounded-md border-none focus:outline-none w-full max-w-xl mx-auto mb-2 shadow-sm focus:shadow-md hover:shadow-md ${
                  isLoginDisabled ? "bg-[#99baeb] cursor-not-allowed" : ""
                }`}
                type="submit"
                onClick={handleSubmit}
                disabled={isLoginDisabled}
              >
                Login {loading && <CircularLoader />}
              </button>
            </form>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default UniversityLoginPage;
