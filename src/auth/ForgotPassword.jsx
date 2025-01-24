import React from "react";
import toast from "react-hot-toast";

import { Link } from "react-router-dom";
import { forgotPassword, loginCollege } from "../redux/college/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../pages/college/auth/Layout";
import InputField from "../components/InputField";

const ForgotPassword = () => {
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Credentials, setCredentials] = useState({
    Email: "",
  });
  const [checked, setChecked] = useState(false);

  const changeHandler = (e) => {
    let cred = e.target.name;
    let val = e.target.value;
    setCredentials((prev) => {
      return { ...prev, [cred]: val };
    });
  };

  const sel = useSelector((state) => state.collegeAuth);
  useEffect(() => {
    // //console.log(sel);
  }, []);
  const isSenddisable = !Credentials.Email;
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { Email } = Credentials;
    const data = {
      email: Email,
    };
    try {
      dispatch(forgotPassword(data)).then((ch) => {
        if (ch.meta.requestStatus === "fulfilled") {
          toast.success("Password reset link has been sent to your email.");
        } else {
          setError(true);
          toast.error("Invalid Email");
        }
      });
      setCredentials({ Email: "" });
    } catch (error) {
      setError(true);

      //console.log(error);
    }
  };
  return (
    <Layout>
      <form action="" className="w-full">
        <div className="font-dmSans">
          <div className="card-body items-center">
            <div className="flex gap-2 justify-center mb-4 md:mb-8">
              <img src="/images/logoFinal.png" alt="logo" className="w-60" />
            </div>

            <h2 className="font-bold text-2xl text-center text-[#171717] mb-2">
              Forgot password
            </h2>
            <h2 className="font-medium  text-[#8F92A1] text-base mb-8 text-justify">
              Reset link will be sent to the email you registered with.
            </h2>

            <div className="w-full mx-auto flex relative max-w-sm mb-2">
              <InputField
                onChange={changeHandler}
                value={Credentials.Email}
                name="Email"
                type="email"
                placeholder="Email Address"
              />
            </div>

            <button
              className={`btn hover:bg-accent bg-accent rounded-md border-none focus:outline-none w-full max-w-sm mx-auto mb-2 shadow-sm focus:shadow-md hover:shadow-md text-white `}
              onClick={handleSubmit}
            >
              Send Link
            </button>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default ForgotPassword;
