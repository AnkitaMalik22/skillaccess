import React from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import {
  googleLoginCollage,
  loginCollage,
} from "../../../redux/collage/auth/authSlice";
import { useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import Layout from "./Layout";
import Loader from "../../../Loader";
import CircularLoader from "../../../components/CircularLoader";

const Login = () => {
  // cosnt[(error, setError)] = useState();

  const { Error, logoutError } = useSelector((state) => state.collageAuth);
  const [loader, setLoader] = useState(false);

  const [type, setType] = useState("password");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Credentials, setCredentials] = useState({
    Email: "",
    Password: "",
    confirmPassword: "",
  });
  // const [checked, setChecked] = useState(false);

  const changeHandler = (e) => {
    let cred = e.target.name;
    let val = e.target.value;
    setCredentials((prev) => {
      return { ...prev, [cred]: val };
    });
  };

  const sel = useSelector((state) => state.collageAuth);
  useEffect(() => {
    // console.log(sel);
  }, []);

  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();

    const { Email, Password, confirmPassword } = Credentials;
    const data = {
      Email,
      Password,
      confirmPassword,
    };
    try {
      const ch = await dispatch(loginCollage(data));
      if (ch.meta.requestStatus === "fulfilled") {
        toast.success("Logged in successfully");
        setCredentials({});
        navigate("/collage/dashboard");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  // const handleCheckboxChange = () => {
  //   setChecked(!checked); // Toggle checkbox status
  // };
  const isLoginDisabled =
    // !checked ||
    !Credentials.Email || !Credentials.Password;
  // GOOGlE LOGIN

  function handleGoogleLoginSuccess(tokenResponse) {
    const accessToken = tokenResponse.access_token;

    dispatch(googleLoginCollage(accessToken));
  }

  const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Layout>
      <form action="" className="w-full">
        <div className="font-dmSans">
          {/* right half */}
          <div className="card-body ">
            {/* skill access group */}
            <div className="flex gap-2 justify-center mb-4 md:mb-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="43"
                height="32"
                viewBox="0 0 43 32"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16.4993 8.00009L16.4993 8.00012L12.4997 11.9997L21.4997 21.0006L30.4997 11.9997L26.4929 8.0001H16.4993V8.00009ZM21.4997 32.0004L21.499 31.9997L0.5 10.9998L12.5033 0H30.4997L42.5003 10.9998L21.5004 31.9997L21.4997 32.0004Z"
                  fill="#0052CC"
                />
              </svg>
              <h1 className="font-bold text-[22px]">Skill Access</h1>
            </div>

            <h2 className="font-bold text-2xl text-center text-[#171717] mb-2">
              Getting Started
            </h2>
            <h2 className="font-bold text-center text-[#8F92A1] text-xl mb-8">
              Welcome back!
            </h2>
            {logoutError && (
              <p className=" border-l-4 pl-4  rounded-[4px] border-[#dc2626] w-full max-w-sm py-3  mx-auto text-sm text-[#dc2626] bg-[#fee2e2]">
                Oops!You're logged out. Please login again.
              </p>
            )}

            {Error.length > 0 && (
              <p className=" border-l-4 pl-4  rounded-[4px] border-[#dc2626] w-full max-w-sm py-3  mx-auto text-sm text-[#dc2626] bg-[#fee2e2]">
                Oops! It seems like your email or password is incorrect. Please
                double-check and try again.
              </p>
            )}
            <div className="w-full mx-auto flex rounded-2xl relative max-w-sm mb-2">
              <input
                onChange={changeHandler}
                value={Credentials.Email}
                name="Email"
                type="email"
                placeholder="Email Address"
                className="input border-none focus:outline-none w-full bg-[#1717170d] text-sm text-[#8F92A1] py-2.5 px-5"
              />
            </div>
            <div className="w-full mx-auto flex rounded-2xl relative max-w-sm mb-2">
              <input
                name="Password"
                onChange={changeHandler}
                value={Credentials.Password}
                type={type}
                placeholder="Password"
                className="input border-none focus:outline-none w-full bg-[#1717170d] text-sm text-[#8F92A1] py-2.5 px-5"
              />
              <button
                className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none "
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

            <div
              className=" flex gap-2  px-2  w-full max-w-sm  mx-auto justify-end cursor-pointer mb-4 md:mb-8"
              onClick={() => navigate("/forgotPassword")}
            >
              <h1 className="text-blue-700 font-bold">Forgot Password</h1>
            </div>

            <button
              className={`btn hover:bg-[#0052CC] bg-[#0052CC] rounded-2xl border-none focus:outline-none w-full max-w-sm mx-auto mb-2 text-white ${
                isLoginDisabled ? "bg-[#99baeb] cursor-not-allowed" : ""
              }`}
              onClick={handleSubmit}
              disabled={isLoginDisabled}
            >
              Login {loader && <CircularLoader />}
            </button>
            <h3 className="text-lGray text-center text-bold text-xs mb-2">
              OR
            </h3>
            <button
              className="btn btn-primary rounded-xl border-none  mt-2 focus:outline-none  w-full max-w-sm mb-2  mx-auto bg-[#F3F6F8] "
              // onClick={() => navigate("/collage/dashboard")}
              onClick={login}
              type="button"
              lo
            >
              <FcGoogle className="text-lg mr-2" />
              <h3
                className="opacity-100 text-[#171717]"
                // onClick={login}
              >
                Continue with google
              </h3>
            </button>
            <span className="text-[#8F92A1] text-center text-sm font-semibold">
              Don't have an account?{" "}
              <Link to="/register" className=" text-[#0052CC]">
                {" "}
                Sign Up
              </Link>
            </span>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default Login;
