import React from "react";
import toast from "react-hot-toast";

import { Link } from "react-router-dom";
import {
  forgotPassword,
  loginCollage,
} from "../../../redux/collage/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

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

  const sel = useSelector((state) => state.collageAuth);
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
          {/* right half */}
          <div className="card-body items-center">
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
              Forgot password
            </h2>
            <h2 className="font-medium text-center text-[#8F92A1] text-xl mb-8 max-w-xl">
              Enter the email address associated with your account, and we'll
              send you a link to reset your password.
            </h2>

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
            {/* {error && (
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
                Invalid Email
              </h1>
            </div>
          )} */}
            <button
              className={`btn hover:bg-accent bg-accent rounded-2xl border-none focus:outline-none w-full max-w-sm mx-auto mb-2 text-white ${
                isSenddisable ? " bg-[#99baeb] cursor-not-allowed" : ""
              }`}
              onClick={handleSubmit}
              disabled={isSenddisable}
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
