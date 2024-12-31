import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LuEye } from "react-icons/lu";
import toast from "react-hot-toast";
import Layout from "./Layout";
import { resetPassword } from "../../../redux/college/auth/authSlice";

const ResetPassword = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    password: "",
    confirmPassword: "",
  });
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");

  const [passwordRequirements, setPasswordRequirements] = useState({
    hasCapital: false,
    hasLowercase: false,
    hasNumber: false,
    hasMinLength: false,
  });

  const updatePasswordRequirements = (password) => {
    setPasswordRequirements({
      hasCapital: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasMinLength: password.length >= 8,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      updatePasswordRequirements(value);
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setPasswordType((prev) => (prev === "password" ? "text" : "password"));
    } else {
      setConfirmPasswordType((prev) => (prev === "password" ? "text" : "password"));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { password, confirmPassword } = credentials;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!Object.values(passwordRequirements).every(Boolean)) {
      toast.error("Password does not meet all requirements");
      return;
    }

    try {
      const result = await dispatch(
        resetPassword({
          token: id,
          password,
          confirmPassword,
        })
      );

      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Password changed successfully");
        setCredentials({ password: "", confirmPassword: "" });
        navigate("/");
      }
    } catch (error) {
      toast.error("Failed to reset password");
    }
  };

  const isSubmitDisabled =
    !credentials.password ||
    !credentials.confirmPassword ||
    !Object.values(passwordRequirements).every(Boolean);

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
        <div className="font-dmSans">
          <div className="card-body">
          <img src="/images/logoFinal.png" alt="logo" className="w-60 mx-auto mb-8" />
            <h2 className="font-bold text-2xl text-center text-[#171717] mb-8">
              Reset Password
            </h2>

            <div className="w-full mx-auto flex rounded-2xl relative mb-2">
              <input
                name="password"
                onChange={handleChange}
                value={credentials.password}
                type={passwordType}
                placeholder="Password"
                className="input border-none focus:outline-none w-full bg-[#1717170d] text-sm text-[#8F92A1] py-2.5 px-5"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
                onClick={() => togglePasswordVisibility("password")}
              >
                <LuEye className="text-[#8F92A1] text-2xl" />
              </button>
            </div>

            <div className="w-full mx-auto flex rounded-2xl relative mb-2">
              <input
                name="confirmPassword"
                onChange={handleChange}
                value={credentials.confirmPassword}
                type={confirmPasswordType}
                placeholder="Confirm Password"
                className="input border-none focus:outline-none w-full bg-[#1717170d] text-sm text-[#8F92A1] py-2.5 px-5"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
                onClick={() => togglePasswordVisibility("confirmPassword")}
              >
                <LuEye className="text-[#8F92A1] text-2xl" />
              </button>
            </div>

            <PasswordRequirement
              text="At least one capital letter"
              met={passwordRequirements.hasCapital}
            />
            <PasswordRequirement
              text="At least one lowercase letter"
              met={passwordRequirements.hasLowercase}
            />
            <PasswordRequirement
              text="At least one number"
              met={passwordRequirements.hasNumber}
            />
            <PasswordRequirement
              text="Minimum character length is 8 characters"
              met={passwordRequirements.hasMinLength}
            />

            <button
              type="submit"
              className={`btn hover:bg-accent bg-accent rounded-2xl border-none focus:outline-none w-full max-w-sm mx-auto mb-2 text-white ${
                isSubmitDisabled ? "bg-blued cursor-not-allowed" : ""
              }`}
              disabled={isSubmitDisabled}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </Layout>
  );
};

const PasswordRequirement = ({ text, met }) => (
  <div className="w-full max-w-xs mx-auto flex mb-2 rounded-xl">
    <input
      type="checkbox"
      checked={met}
      readOnly
      className={`border-none w-4 h-4 focus:outline-none rounded-full mx-auto mt-2 mr-2 ${
        met ? "bg-green-500" : "bg-[#8F92A1]"
      }`}
    />
    <h1 className={`self-center w-full ${met ? "text-green-500" : "text-[#8F92A1]"}`}>
      {text}
    </h1>
  </div>
);

export default ResetPassword;
