import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-hot-toast";
import {
  googleRegisterCollege,
  registerCollege,
} from "../../../redux/college/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Layout from "./Layout";
import CircularLoader from "../../../components/CircularLoader";
import InputField from "../../../components/InputField";
// import 'react-phone-input-2/lib/bootstrap.css'
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [phone, setPhone] = useState("+91");
  const [Credentials, setCredentials] = useState({
    Email: "",
    Password: "",

    Phone: null,
    FirstName: "",
    LastName: "",

    University: "",
  });
  const [checked, setChecked] = useState(false);
  const [type, setType] = useState("password");

  const changeHandler = (e) => {
    e.preventDefault();
    let cred = e.target.name;
    let val = e.target.value;

    // Check if the length of the value exceeds 15 characters
    if (cred === "FirstName" && val.length > 15) {
      return; // Do nothing if the length exceeds 15 characters
    }
    if (cred === "LastName" && val.length > 15) {
      return; // Do nothing if the length exceeds 15 characters
    }

    setCredentials((prev) => {
      return { ...prev, [cred]: val };
    });
  };

  //console.log(phone);

  const sel = useSelector((state) => state.collegeAuth);
  useEffect(() => {
    localStorage.removeItem("auth-token");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const { Email, Password, FirstName, LastName, University } = Credentials;
    if (phone.length !== 12) {
      toast.error("Please enter a valid phone number");
      setLoader(false);
      return;
    }

    const data = {
      Phone: phone,
      Email,
      Password,
      FirstName,
      LastName,
      CollegeName: University,
    };
    try {
      const ch = await dispatch(registerCollege(data));
      if (ch.meta.requestStatus === "fulfilled") {
        setCredentials({});
        setLoader(false);
        navigate("/college/dashboard");
      }
    } catch (error) {
      //console.log("Reject" + error);
    } finally {
      setLoader(false);
    }
  };

  // GOOGLE REGISTER

  function handleGoogleLoginSuccess(tokenResponse) {
    const accessToken = tokenResponse.access_token;

    dispatch(googleRegisterCollege(accessToken));
    // navigate("/college/dashboard");
    // .then((res) => {
    //   if (res.meta.requestStatus === "fulfilled") {
    //
    //   }
    // });
  }

  const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });

  const isCreateAccountDisabled =
    !checked ||
    !Credentials.Email ||
    !Credentials.Password ||
    !Credentials.FirstName ||
    !Credentials.LastName ||
    !Credentials.University ||
    !(phone.length > 5);

  return (
    <Layout>
      <form action="" className="w-full">
        <div className="font-dmSans">
          {/* right half */}
          <div className="card-body">
            {/* skill access group */}
            <div className="flex gap-2 justify-center mb-4 md:mb-8">
              <img src="/images/logoFinal.png" alt="logo" className="w-60" />
            </div>

            <h2 className="font-bold text-2xl text-center text-[#171717]">
              Sign Up to Skill Access
            </h2>
            <h2 className="font-normal text-center text-[#8F92A1] text-base mb-8">
              Create an account to continue!
            </h2>

            {/* name */}
            <div className="max-w-xl w-full mx-auto flex gap-1 sm:gap-5 mb-2">
              <div className="w-full mx-auto flex  relative max-w-sm ">
                {" "}
                <InputField
                  name="FirstName"
                  value={Credentials.FirstName}
                  onChange={changeHandler}
                  placeholder="First Name"
                  type="text" // You can set any type here, like text, email, etc.
                />
              </div>
              <div className="w-full mx-auto flex relative max-w-sm ">
                <InputField
                  name="LastName"
                  value={Credentials.LastName}
                  onChange={changeHandler}
                  placeholder="Last Name"
                  type="text"
                />
              </div>
            </div>

            {/* email */}
            <div className="w-full mx-auto flex relative max-w-xl mb-2">
              <InputField
                onChange={changeHandler}
                value={Credentials.Email}
                name="Email"
                type="email"
                placeholder="Email Address"
              />
            </div>

            {/* university */}
            <div className="w-full mx-auto flex relative max-w-xl mb-2">
              <InputField
                name="University"
                value={Credentials.University}
                onChange={changeHandler}
                type="text"
                placeholder="Your Institute/College Name"
              />
            </div>

            {/* dates */}
            <div className="w-full mx-auto flex rounded-2xl relative max-w-xl mb-2">
              <span className="w-full flex gap-4 ">
                <PhoneInput
                  defaultCountry="IN"
                  name="Phone"
                  value={phone}
                  onChange={setPhone}
                  type="number"
                  placeholder="Mobile Number"
                  inputStyle={{
                    width: "100%",
                    height: "48px",
                    maxWidth: "100%",
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                    border: "none",
                    paddingLeft: "70px",
                    outline: "none",
                    backgroundColor: "rgb(243 246 248 / var(--tw-bg-opacity))",
                  }}
                  containerStyle={{
                    width: "100%",
                  }}
                />
              </span>
            </div>

            {/* password */}
            <div className="w-full mx-auto flex rounded-2xl relative max-w-xl mb-2">
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

            {/* checkbox */}
            <label className=" flex items-center gap-2 cursor-pointer mb-4 mx-auto w-full max-w-xl">
              <input
                type="checkbox"
                onChange={(e) => setChecked(e.target.checked)}
                checked={checked}
                className="checkbox checkbox-primary bg-secondary opacity-20 w-6 h-6"
              />
              <span className="text-[#8F92A1] font-medium text-sm ">
                By creating an account, you agree to our{" "}
                <Link
                  className="text-blued"
                  to="/terms&policies"
                  target="_blank"
                >
                  Terms-Policies.{" "}
                </Link>
                {/* and, <Link>Notification Settings</Link> */}
              </span>
            </label>

            <button
              className={`btn hover:bg-accent bg-accent rounded-md border-none focus:outline-none w-full max-w-xl mx-auto mb-2 shadow-sm focus:shadow-md hover:shadow-md text-white ${
                isCreateAccountDisabled ? "bg-blued cursor-not-allowed" : ""
              }`}
              onClick={handleSubmit}
              disabled={isCreateAccountDisabled}
              type="submit"
            >
              Register{loader && <CircularLoader />}
            </button>
            <h3 className=" text-center text-[#8F92A1] font-bold text-sm mb-2">
              OR
            </h3>
            <button
              className="btn btn-primary rounded-md border-none  mt-2 focus:outline-none  w-full max-w-xl mb-2  mx-auto bg-[#F3F6F8] "
              // onClick={() => navigate("/college/dashboard")}
              onClick={login}
              type="button"
            >
              <FcGoogle className="text-lg mr-2" />
              <h3 className="opacity-100 text-[#171717]">
                Continue with google
              </h3>
            </button>
            <span className="text-[#8F92A1] text-center text-sm font-semibold">
              Already have an account?{" "}
              <Link to="/" className="text-blued  ">
                {" "}
                Sign In
              </Link>
            </span>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default Register;
