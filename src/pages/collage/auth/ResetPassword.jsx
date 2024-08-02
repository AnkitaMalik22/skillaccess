import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  loginCollage,
  resetPassword,
} from "../../../redux/collage/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuEye } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import Layout from "./Layout";

const ResetPassword = () => {
  const [error, setError] = useState(false);
  const { id } = useParams();
  const [type, setType] = useState("password");
  const [typeConfirm, setTypeConfirm] = useState("password");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Credentials, setCredentials] = useState({
    Password: "",
    confirmPassword: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { Password, confirmPassword } = Credentials;

    if (Password !== confirmPassword) {
      toast.error("Password does not match");
      return;
    }
    const data = {
      token: id,
      password: Password,
      confirmPassword,
    };
    try {
      const ch = await dispatch(resetPassword(data));
      if (ch.meta.requestStatus === "fulfilled") {
        toast.success("Password changed");
        setCredentials({});
        navigate("/");
      }
    } catch (error) {}
  };
  const isConfirmDisabled =
    !Credentials.confirmPassword || !Credentials.Password;
  return (
    <Layout>
      <form action="" className="w-full">
        <div className="font-dmSans">
          {/* right half */}
          <div className="card-body">
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

            <h2 className="font-bold text-2xl text-center text-[#171717] mb-8">
              Reset Password
            </h2>

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
                className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
                onClick={(e) => {
                  e.preventDefault();
                  type === "text" ? setType("password") : setType("text");
                }}
              >
                <LuEye className="text-[#8F92A1] text-2xl" />
              </button>
            </div>
            <div className="w-full mx-auto flex rounded-2xl relative max-w-sm mb-2">
              <input
                name="confirmPassword"
                onChange={changeHandler}
                value={Credentials.confirmPassword}
                type={typeConfirm}
                placeholder="Confirm Password"
                className="input border-none focus:outline-none w-full bg-[#1717170d] text-sm text-[#8F92A1] py-2.5 px-5"
              />
              <button
                className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
                onClick={(e) => {
                  e.preventDefault();
                  typeConfirm === "text"
                    ? setTypeConfirm("password")
                    : setTypeConfirm("text");
                }}
              >
                <LuEye className="text-[#8F92A1] text-2xl" />
              </button>
            </div>

            <div className="w-full max-w-xs  mx-auto flex mb-2 rounded-xl  ">
              <input
                type="checkbox"
                defaultChecked={true}
                onClick={(e) => e.preventDefault()}
                placeholder="Confirm Password"
                disabled={true}
                className={` border-none w-4 h-4 focus:outline-none  rounded-full   mx-auto  checked:bg-[#8F92A1] mt-2 mr-2  `}
              />
              <h1 className="text-[#8F92A1] self-center w-full">
                At least one capital letter
              </h1>
            </div>
            <div className="w-full max-w-xs  mx-auto flex mb-2 rounded-xl  ">
              <input
                type="checkbox"
                defaultChecked={true}
                onClick={(e) => e.preventDefault()}
                placeholder="Confirm Password"
                disabled={true}
                className="  border-none w-4 h-4 focus:outline-none  rounded-full bg-[#8F92A1]  mx-auto  checked:bg-[#8F92A1] mt-2 mr-2 hover:!bg-red-500"
              />
              <h1 className="text-[#8F92A1] self-center w-full">
                At least one lowercase letter
              </h1>
            </div>
            <div className="w-full max-w-xs  mx-auto flex mb-2 rounded-xl  ">
              <input
                type="checkbox"
                defaultChecked={true}
                onClick={(e) => e.preventDefault()}
                placeholder="Confirm Password"
                disabled={true}
                className="  border-none w-4 h-4 focus:outline-none  rounded-full bg-[#8F92A1]  mx-auto  checked:bg-[#8F92A1] mt-2 mr-2 hover:!bg-red-500"
              />
              <h1 className="text-[#8F92A1] self-center w-full">
                At least one number
              </h1>
            </div>
            <div className="w-full max-w-xs  mx-auto flex mb-8 rounded-xl  ">
              <input
                type="checkbox"
                defaultChecked={true}
                onClick={(e) => e.preventDefault()}
                placeholder="Confirm Password"
                disabled={true}
                className="  border-none w-4 h-4 focus:outline-none  rounded-full bg-[#8F92A1]  mx-auto  checked:bg-[#8F92A1] mt-2 mr-2 hover:!bg-red-500"
              />
              <h1 className="text-[#8F92A1] self-center w-full">
                Minimum character length is 8 characters
              </h1>
            </div>

            <button
              className={`btn hover:bg-[#0052CC] bg-[#0052CC] rounded-2xl border-none focus:outline-none w-full max-w-sm mx-auto mb-2 text-white ${
                isConfirmDisabled ? "bg-blued cursor-not-allowed" : ""
              }`}
              onClick={handleSubmit}
              disabled={isConfirmDisabled}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default ResetPassword;
