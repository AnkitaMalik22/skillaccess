import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuEye, LuEyeOff } from "react-icons/lu";

import toast from "react-hot-toast";

import CircularLoader from "../../../components/CircularLoader";
import Layout from "../../college/auth/Layout";
import {
  LoginCompany,
  selectCompanyData,
  selectLoginState,
} from "../../../redux/company/auth/companyAuthSlice";
import InputField from "../../../components/InputField";

const LoginCompanyPage = () => {
  const { error, loading } = useSelector(selectLoginState);
  const user = useSelector(selectCompanyData);
  const [type, setType] = useState("password");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Credentials, setCredentials] = useState({
    Email: "",
    Password: "",
    confirmPassword: "",
  });

  const changeHandler = (e) => {
    let cred = e.target.name;
    let val = e.target.value;
    setCredentials((prev) => {
      return { ...prev, [cred]: val };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { Email, Password, confirmPassword } = Credentials;
    const data = {
      Email,
      Password,
      confirmPassword,
    };
    try {
      const res = await dispatch(LoginCompany(data));
      if (LoginCompany.fulfilled.match(res)) {
        toast.success("logged in successfully");
        if (res.status === "pending") {
          navigate("/company/approval");
        } else {
          navigate("/company/pr/dashboard");
        }
      } else if (LoginCompany.rejected.match(res)) {
        // console.log(resultAction);
      } else {
      }
    } catch (err) {
      console.log(err);
      toast.error("Invalid Email or Password");
    }
  };

  const isLoginDisabled = !Credentials.Email || !Credentials.Password;

  return (
    <Layout>
      <form action="" className="w-full">
        <div className="font-dmSans">
          {/* right half */}
          <div className="card-body ">
            {/* skill access group */}
            <div className="flex gap-2 justify-center mb-4 md:mb-8">
              <img src="/images/logoFinal.png" alt="logo" className="w-60" />
            </div>

            <h2 className="font-bold text-2xl text-center text-[#171717] mb-2">
              Getting Started
            </h2>
            <h2 className="font-bold text-center text-[#8F92A1] text-xl mb-8">
              Welcome back!
            </h2>

            {error && (
              <p className=" border-l-4 pl-4  rounded-[4px] border-[#dc2626] w-full max-w-sm py-3  mx-auto text-sm text-[#dc2626] bg-[#fee2e2]">
                Oops! It seems like your email or password is incorrect. Please
                double-check and try again.
              </p>
            )}
            <form
              className="w-full flex flex-col items-center"
              onSubmit={handleSubmit}
            >
              <div className="w-full mx-auto flex rounded-2xl relative max-w-sm mb-2">
                <InputField
                  onChange={changeHandler}
                  value={Credentials.Email}
                  name="Email"
                  type="email"
                  placeholder="Email Address"
                />
              </div>
              <div className="w-full mx-auto flex rounded-2xl relative max-w-sm mb-2">
                <InputField
                  name="Password"
                  onChange={changeHandler}
                  value={Credentials.Password}
                  type={type}
                  placeholder="Password"
                />
                <button
                  className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none "
                  onClick={(e) => {
                    e.preventDefault();
                    type === "text" ? setType("password") : setType("text");
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

              <div
                className=" flex gap-2  px-2  w-full max-w-sm  mx-auto justify-end cursor-pointer mb-4 md:mb-8"
                onClick={() => navigate("/forgotPassword")}
              >
                <h1 className="text-blue-700 font-bold">Forgot Password</h1>
              </div>

              <button
                className={`btn hover:bg-accent bg-accent rounded-md border-none focus:outline-none w-full max-w-xl mx-auto mb-2 shadow-sm focus:shadow-md hover:shadow-md text-white ${
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

export default LoginCompanyPage;
