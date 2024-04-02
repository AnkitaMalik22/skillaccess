import React from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuEye } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { googleLoginStudent, loginStudent } from "../../../redux/student/auth/studentAuthSlice";

const Login = () => {
  // cosnt[(error, setError)] = useState();

  const { Error, logoutError } = useSelector((state) => state.collageAuth);
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

  const sel = useSelector((state) => state.studentAuth);
  useEffect(() => {
    // console.log(sel);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { Email, Password, confirmPassword } = Credentials;
    const data = {
      Email,
      Password,
      confirmPassword,
    };
    try {
      const ch = await dispatch(loginStudent(data));
      if (ch.meta.requestStatus === "fulfilled") {
        toast.success("Logged in successfully");
        setCredentials({});
      }
    } catch (error) {
      console.log(error);
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

    dispatch(googleLoginStudent(accessToken));

    navigate("/student/dashboard");
  }

  const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });
  const [showPassword, setShowPassword] = useState(false);
  return (
    <form action="" className="font-dmSans">
      <div className=" bg-base-100 shadow-xl h-full min-h-[100vh]  font-dmSans grid grid-cols-5 ">
        <figure className="w-full h-full bg-login bg-no-repeat bg-cover bg-center !hidden  lg:!block col-span-2 ">
          {/* <img src="./images/loginBg.jpg" alt="" className="w-full h-full" /> */}
        </figure>

        {/* right half */}
        <div className="card-body my-auto !mt-20 sm:mt-0 col-span-3">
          {/* skill access group */}
          <div className="flex gap-2 justify-center">
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

          <h2 className="font-bold text-2xl text-center  md:mt-6 mt-4">
            Getting Started
          </h2>
          <h2 className="text-sm font-normal text-center text-lGray">
            Create an account to continue
          </h2>
          {logoutError && (
            <p className=" border-l-4 pl-4  rounded-[4px] border-[#dc2626] w-full max-w-xs py-3  mx-auto text-sm text-[#dc2626] bg-[#fee2e2]">
              Oops!You're logged out. Please login again.
            </p>
          )}

          {Error.length > 0 && (
            <p className=" border-l-4 pl-4  rounded-[4px] border-[#dc2626] w-full max-w-xs py-3  mx-auto text-sm text-[#dc2626] bg-[#fee2e2]">
              Oops! It seems like your email or password is incorrect. Please
              double-check and try again.
            </p>
          )}

          <input
            onChange={changeHandler}
            value={Credentials.Email}
            name="Email"
            type="email"
            placeholder="Email Address"
            className="input rounded-xl border-none  md:mt-6 mt-4 focus:outline-none input-md w-full max-w-xs  mx-auto bg-snow "
          />
          <div className="w-full max-w-xs  mx-auto flex md:mt-6 mt-4 rounded-xl  bg-snow relative">
            <input
              name="Password"
              onChange={changeHandler}
              value={Credentials.Password}
              type={type}
              placeholder="Password"
              className="input  border-none  focus:outline-none input-md w-full max-w-xs  bg-snow  mx-auto "
            />
            {/* <button
              className="btn !shadow-none bg-snow border-none"
              onClick={(e) => {
                e.preventDefault();
                type === "text" ? setType("password") : setType("text");
              }}
            >
              <LuEye className="text-gray-400 text-2xl" />
            </button> */}
               <button
                  className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
                  onClick={(e) => {
                    e.preventDefault();
                    type === "text" ? setType("password") : setType("text");
                  }}
            >
              <LuEye className="text-gray-400 text-2xl" />
            </button>
          
          </div>

          <div
            className=" flex gap-2  px-2 lg:mt-6 md:mt-6 mt-4   w-full max-w-xs  mx-auto justify-end cursor-pointer"
            onClick={() => navigate("/forgotPassword")}
          >
            <h1 className="text-blue-700 font-bold">Forgot Password</h1>
          </div>

          {/* {Error.length > 0 &&
            Error.map((error) => (
              <div className="w-full max-w-xs  mx-auto flex md:mt-6 mt-4 rounded-xl  ">
                <input
                  type="checkbox"
                  defaultChecked={true}
                  onClick={(e) => e.preventDefault()}
                  placeholder="Confirm Password"
                  disabled={true}
                  className="  border-none w-4 h-4 focus:outline-none  rounded-full bg-gray-400  mx-auto  checked:bg-gray-400 mt-2 mr-2 hover:!bg-red-500"
                />
                <h1 className="text-gray-400 self-center w-full">
                  {error.message}
                </h1>
              </div>
            ))} */}

       <div className=" flex gap-2  p-2 lg:mt-6 md:mt-6 mt-4   w-full max-w-xs  mx-auto ">
            {" "}
            <hr className="w-1/12 border-2 border-lGray opacity-20" />
            <hr className="w-1/12 border-2 border-lGray opacity-20" />
            <hr className="w-1/12 border-2 border-lGray opacity-20" />
            <hr className="w-1/12 border-2 border-lGray opacity-20" />
            <hr className="w-1/12 border-2 border-lGray opacity-20" />
            <hr className="w-1/12 border-2 border-lGray opacity-20" />
            <hr className="w-1/12 border-2 border-lGray opacity-20" />
            <hr className="w-1/12 border-2 border-lGray opacity-20" />
            <hr className="w-1/12 border-2 border-lGray opacity-20" />
            <hr className="w-1/12 border-2 border-lGray opacity-20" />
          </div>
   {/* 
          <label className=" flex  gap-2 cursor-pointer mx-auto w-full max-w-xs">
            <input
              type="checkbox"
              checked={checked}
              className="checkbox checkbox-primary bg-secondary opacity-20 w-6 h-6"
              onChange={handleCheckboxChange}
            />
            <span className="text-lGray">
              By creating an account, you agree to our{" "}
              <Link className="text-blue-600" to="/terms&policies">
                {" "}
                Terms-Policies.
              </Link>
            </span>
          </label> */}
 
          <button
         className={`btn hover:bg-blue-700 bg-blue-600 rounded-xl border-none md:mt-6 mt-4 focus:outline-none w-full max-w-xs mx-auto text-white ${
          isLoginDisabled ? "bg-blued cursor-not-allowed" : ""
        }`}
            onClick={handleSubmit}
            disabled={isLoginDisabled}
          >
            Login
          </button>
          <h3 className="text-lGray text-center text-bold text-xs mt-1">OR</h3>
          <button
            className="btn btn-primary rounded-xl border-none  mt-2 focus:outline-none  w-full max-w-xs  mx-auto bg-snow  "
            // onClick={() => navigate("/collage/dashboard")}
            onClick={login}
            type="button"
          >
            <FcGoogle className="text-lg mr-2" />
            <h3
              className="opacity-100"
              // onClick={login}
            >
              Continue with google
            </h3>
          </button>
          <span className="text-lGray text-center text-sm font-semibold">
            Don't have an account?{" "}
            <Link to="/register" className=" text-blue-600">
              {" "}
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </form>
  );
};

export default Login;
