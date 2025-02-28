import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { LuEye, LuEyeOff } from "react-icons/lu";
import toast from "react-hot-toast";
import Layout from "./Layout";
import InputField from "../components/InputField";
import { loginCollege } from "../redux/college/auth/authSlice";
import { LoginCompany } from "../redux/company/auth/companyAuthSlice";
import { loginUniversity } from "../redux/university/auth/universityAuthSlice";
import CircularLoader from "../components/CircularLoader";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    Email: "",
    Password: "",
  });
  const [type, setType] = useState("password");

  const [loading, setLoading] = useState(false);

  // Extract role from the route (e.g., "/college/login", "/company/login", etc.)
  const path = location.pathname.split("/")[1]; // Extract the first part of the URL
  const role = path || "college";

  const error = useSelector((state) => {
    if (role === "college") return state.collegeAuth.error;
    if (role === "company") return state.companyAuth.error;
    if (role === "university") return state.universityAuth.error;
    return null;
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let action;
      if (role === "college") {
        action = loginCollege;
      } else if (role === "company") {
        action = LoginCompany;
      } else if (role === "university") {
        action = loginUniversity;
      }

      const res = await dispatch(action(credentials)).unwrap();
    } catch (err) {
      toast.error("Invalid credentials!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="font-dmSans">
          <div className="card-body">
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
              <p className="border-l-4 pl-4 rounded-[4px] border-[#dc2626] w-full max-w-sm py-3 mx-auto text-sm text-[#dc2626] bg-[#fee2e2]">
                {error.message || "Oops! Invalid email or password."}
              </p>
            )}

            <div className="w-full mx-auto flex relative max-w-sm mb-2">
              <InputField
                onChange={changeHandler}
                value={credentials.Email}
                name="Email"
                type="email"
                placeholder="Email Address"
              />
            </div>
            <div className="w-full mx-auto flex relative max-w-sm mb-2">
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
            <div className="flex gap-2 px-2 w-full max-w-sm mx-auto justify-end mb-4 md:mb-8">
              <h1
                className="text-blued font-bold cursor-pointer"
                onClick={() => navigate("/forgotPassword")}
              >
                Forgot Password
              </h1>
            </div>
            <button
              className={`btn hover:bg-accent bg-accent rounded-md border-none focus:outline-none w-full max-w-sm mx-auto mb-2 shadow-sm focus:shadow-md hover:shadow-md text-white `}
              type="submit"
            >
              Login {loading && <CircularLoader />}
            </button>
            {/* <h3 className="text-lGray text-center text-bold text-xs mt-1">
              OR
            </h3>
            <button
              className="btn btn-primary rounded-md border-none  mt-2 focus:outline-none  w-full max-w-sm mb-2  mx-auto bg-[#F3F6F8] "
              type="button"
              lo
            >
              <FcGoogle className="text-lg mr-2" />
              <h3
                className="opacity-100 text-[#171717]"
                onClick={login}

                onClick={() => navigate("/collage/dashboard")}

              >
                Continue with google
              </h3>
            </button> */}
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default LoginPage;