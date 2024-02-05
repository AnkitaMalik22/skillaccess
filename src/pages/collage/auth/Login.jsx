import React from "react";
import { Link } from "react-router-dom";
import { loginCollage } from "../../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Credentials, setCredentials] = useState({
    Email: "",
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
    // console.log(sel);
  }, []);

  const handleSubmit = async (e) => {
 
    e.preventDefault();

    const { Email, Password ,confirmPassword} =
      Credentials;
    const data = {
      Email,
      Password,
      confirmPassword
    };
    try {
      const ch = await dispatch(loginCollage(data));
      if (ch.meta.requestStatus === "fulfilled") {
  
        setCredentials({});
        navigate("/collage/dashboard");
      }
 
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form>
      <div className="card card-side bg-base-100 shadow-xl h-full lg:h-[900px]  font-dmSans   ">
        <figure className="w-1/2 h-full bg-login bg-no-repeat bg-cover bg-center !hidden  lg:!flex !flex-row "></figure>

        {/* right half */}
        <div className="card-body my-auto !mt-20 sm:mt-0">
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

          <input
           onChange={changeHandler}
           value={Credentials.Email}
           name="Email"
           type="email"
            placeholder="Email Address"
            className="input rounded-xl border-none  md:mt-6 mt-4 focus:outline-none input-md w-full max-w-xs  mx-auto bg-snow "
          />
          <div className="w-full max-w-xs  mx-auto flex md:mt-6 mt-4 ">
            <input
            name="Password"
            onChange={changeHandler}
            value={Credentials.Password}
            type="password"
              placeholder="Password"
              className="input rounded-xl border-none  focus:outline-none input-md w-full max-w-xs  mx-auto bg-snow  "
            />
            <button className="btn btn-primary bg-snow">S</button>
          </div>
          <div className="w-full max-w-xs  mx-auto flex md:mt-6 mt-4 ">
            <input
              name="confirmPassword"
              onChange={changeHandler}
              value={Credentials.confirmPassword}
              type="password"
              placeholder="Confirm Password"
              className="input rounded-xl border-none  focus:outline-none input-md w-full max-w-xs  mx-auto bg-snow  "
            />
            <button className="btn btn-primary bg-snow">S</button>
          </div>

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

          <label className=" flex gap-2 cursor-pointer mx-auto w-full max-w-xs">
            <input
              type="checkbox"
              checked="false"
              className="checkbox checkbox-primary bg-secondary opacity-20 w-6 h-6"
            />
            <span className="text-lGray">
              By creating an account, you agree to our{" "}
              <Link to="/"> Term and Conditions</Link>
            </span>
          </label>

          <button className="btn btn-accent rounded-xl border-none  md:mt-6 mt-4 focus:outline-none  w-full max-w-xs  mx-auto bg-secondary text-white"
          onClick={handleSubmit}
          >
           Login
          </button>
          <h3 className="text-lGray text-center text-bold text-xs mt-1">OR</h3>
          <button className="btn btn-primary rounded-xl border-none  mt-2 focus:outline-none  w-full max-w-xs  mx-auto bg-snow  ">
            <h3 className="opacity-100">Continue with google</h3>
          </button>
          <span className="text-lGray text-center">
            Already have an account?{" "}
            <Link to="/" className="text-secondary">
              {" "}
              SignIn
            </Link>
          </span>
        </div>
      </div>
    </form>
  );
};

export default Login;
