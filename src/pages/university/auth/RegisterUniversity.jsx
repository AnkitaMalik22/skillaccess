import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
// import {
//   googleRegisterUniversity,
//   registerUniversity,
// } from "../../../redux/university/auth/authSlice"; // Update Redux actions
import { registerUniversity } from "../../../redux/university/auth/universityAuthSlice";
import { useDispatch } from "react-redux";
import { LuEye, LuEyeOff } from "react-icons/lu";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Layout from "./Layout";
import CircularLoader from "../../../components/CircularLoader";
import InputField from "../../../components/InputField";

const RegisterUniversity = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [phone, setPhone] = useState("+91");
  const [Credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    phone: null,
    address: "",
    // description: "",
    website: "",
  });
  const [checked, setChecked] = useState(false);
  const [type, setType] = useState("password");

  const changeHandler = (e) => {
    e.preventDefault();
    let cred = e.target.name;
    let val = e.target.value;

    setCredentials((prev) => {
      return { ...prev, [cred]: val };
    });
  };

  useEffect(() => {
    localStorage.removeItem("auth-token");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const { name, email, password, address, website } = Credentials;

    if (phone.length < 10) {
      toast.error("Please enter a valid phone number");
      setLoader(false);
      return;
    }

    const data = {
      name,
      email,
      password,
      phone,
      address,
      // description,
      website,
    };

    try {
      const response = await dispatch(registerUniversity(data));
      if (response.meta.requestStatus === "fulfilled") {
        setCredentials({});
        setLoader(false);
        navigate("/university/dashboard");
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  // // GOOGLE REGISTER
  // function handleGoogleLoginSuccess(tokenResponse) {
  //   const accessToken = tokenResponse.access_token;
  //   dispatch(googleRegisterUniversity(accessToken));
  // }

  // const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });

  const isCreateAccountDisabled =
    !checked ||
    !Credentials.name ||
    !Credentials.email ||
    !Credentials.password ||
    !Credentials.address ||
    // !Credentials.description ||
    !Credentials.website ||
    !(phone.length > 5);

  return (
    <Layout>
      <form className="w-full">
        <div className="font-dmSans">
          <div className="card-body">
            <div className="flex gap-2 justify-center mb-4 md:mb-8">
              <img src="/images/logoFinal.png" alt="logo" className="w-60" />
            </div>

            <h2 className="font-bold text-2xl text-center text-[#171717] mb-2">
              Sign Up as a University
            </h2>
            <h2 className="font-normal text-center text-[#8F92A1] text-sm mb-8">
              Create an account to manage your university on SkillAccess!
            </h2>

            {/* Name */}
            <div className="w-full mx-auto flex rounded-2xl relative max-w-xl mb-2">
              <InputField
                type="text"
                value={Credentials.name}
                name="name"
                onChange={changeHandler}
                placeholder="University Name"
              />
            </div>

            {/* Email */}
            <div className="w-full mx-auto flex rounded-2xl relative max-w-xl mb-2">
              <InputField
                type="email"
                value={Credentials.email}
                name="email"
                onChange={changeHandler}
                placeholder="University Email"
              />
            </div>

            {/* Phone */}
            <div className="w-full mx-auto flex rounded-2xl relative max-w-xl mb-2">
              <PhoneInput
                defaultCountry="IN"
                value={phone}
                onChange={setPhone}
                placeholder="Phone Number"
                inputStyle={{
                  width: "100%",
                  height: "48px",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  paddingLeft: "70px",
                  backgroundColor: "rgb(243 246 248 / var(--tw-bg-opacity))",
                }}
              />
            </div>

            {/* Address */}
            <div className="w-full mx-auto flex rounded-2xl relative max-w-xl mb-2">
              <InputField
                type="text"
                value={Credentials.address}
                name="address"
                onChange={changeHandler}
                placeholder="Address"
                className="input border-none focus:outline-none w-full bg-[#1717170d] text-sm text-[#8F92A1] py-2.5 px-5"
              />
            </div>

            {/* Description */}
            {/* <div className="w-full mx-auto flex rounded-2xl relative max-w-xl mb-2">
              <textarea
                value={Credentials.description}
                name="description"
                onChange={changeHandler}
                placeholder="University Description"
                className="input border-none focus:outline-none w-full bg-[#1717170d] text-sm text-[#8F92A1] py-2.5 px-5"
                rows="3"
              />
            </div> */}

            {/* Website */}
            <div className="w-full mx-auto flex rounded-2xl relative max-w-xl mb-2">
              <InputField
                type="text"
                value={Credentials.website}
                name="website"
                onChange={changeHandler}
                placeholder="University Website"
              />
            </div>

            {/* Password */}
            <div className="w-full mx-auto flex rounded-2xl relative max-w-xl mb-2">
              <InputField
                type={type}
                value={Credentials.password}
                name="password"
                onChange={changeHandler}
                placeholder="Password"
              />
              <button
                className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
                onClick={(e) => {
                  e.preventDefault();
                  setType((prev) => (prev === "text" ? "password" : "text"));
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

            {/* Terms Checkbox */}
            <label className="flex items-center gap-2 cursor-pointer mb-4 mx-auto w-full max-w-xl">
              <input
                type="checkbox"
                onChange={(e) => setChecked(e.target.checked)}
                checked={checked}
                className="checkbox checkbox-primary bg-secondary opacity-20 w-6 h-6"
              />
              <span className="text-[#8F92A1] font-medium text-sm">
                By creating an account, you agree to our{" "}
                <Link
                  to="/terms&policies"
                  className="text-blued"
                  target="_blank"
                >
                  Terms and Policies
                </Link>
              </span>
            </label>

            {/* Register Button */}
            <button
              className={`btn hover:bg-accent bg-accent rounded-md border-none focus:outline-none w-full max-w-xl mx-auto mb-2 shadow-sm focus:shadow-md hover:shadow-md ${
                isCreateAccountDisabled ? "bg-blued cursor-not-allowed" : ""
              }`}
              onClick={handleSubmit}
              disabled={isCreateAccountDisabled}
              type="submit"
            >
              Register {loader && <CircularLoader />}
            </button>

            {/* <h3 className="text-center text-[#8F92A1] font-medium text-sm mb-2">
              or
            </h3> */}

            {/* Google Login
            <button
              className="btn hover:bg-[#e5e5e5] bg-[#f5f5f5] rounded-2xl border-none focus:outline-none w-full max-w-xl mx-auto mb-2 text-black flex justify-center items-center gap-2"
              onClick={(e) => {
                e.preventDefault();
                login();
              }}
              type="button"
            >
              <FcGoogle className="text-2xl" />
              Register with Google
            </button> */}

            <div className="text-center mt-5">
              <span className="text-sm text-[#8F92A1]">
                Already have an account?{" "}
                <Link to="/university" className="text-blued font-semibold">
                  Login Now
                </Link>
              </span>
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default RegisterUniversity;
