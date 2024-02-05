import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { googleRegisterCollage, registerCollage } from "../../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {useGoogleLogin} from '@react-oauth/google';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Credentials, setCredentials] = useState({
    Email: "",
    Password: "",
    From: "",
    To: "",
    FirstName: "",
    LastName: "",
    Major: "",
    University: "",
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

    const { Email, Password, FirstName, LastName, Major, University } =
      Credentials;
    const data = {
      Email,
      Password,
      FirstName,
      LastName,
      Major,
      CollegeName: University,
    };
    try {
      const ch = await dispatch(registerCollage(data));
      if (ch.meta.requestStatus === "fulfilled") {
   
        setCredentials({});
        navigate("/collage/dashboard");
      }
 
    } catch (error) {
      console.log(error);
    }
  };

  function handleGoogleLoginSuccess(tokenResponse) {

    const accessToken = tokenResponse.access_token;

    dispatch(googleRegisterCollage(accessToken));

}

  const login = useGoogleLogin({onSuccess: handleGoogleLoginSuccess});
  return (
    <form action="" className="">
      <div className=" bg-base-100 shadow-xl h-full   font-dmSans grid grid-cols-5 ">
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
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.4993 8.00009L16.4993 8.00012L12.4997 11.9997L21.4997 21.0006L30.4997 11.9997L26.4929 8.0001H16.4993V8.00009ZM21.4997 32.0004L21.499 31.9997L0.5 10.9998L12.5033 0H30.4997L42.5003 10.9998L21.5004 31.9997L21.4997 32.0004Z"
                fill="#0052CC"
              />
            </svg>
            <h1 className="font-bold text-[22px]">Skill Access</h1>
          </div>

          <h2 className="font-bold text-2xl text-center  md:mt-6 mt-4">
            Sign Up to Skill Access
          </h2>
          <h2 className="text-sm font-normal text-center text-lGray">
            Create an account to continue
          </h2>

          {/* name */}
          <span className="max-w-xl w-full mx-auto flex gap-1">
            <input
              type="text"
              value={Credentials.FirstName}
              name="FirstName"
              onChange={changeHandler}
              placeholder="First Name"
              className="input rounded-xl border-none  md:mt-6 mt-4 focus:outline-none input-md w-1/2 max-w-xl  mx-auto bg-snow "
            />
            <input
              value={Credentials.LastName}
              onChange={changeHandler}
              name="LastName"
              type="text"
              placeholder="Last Name"
              className="input rounded-xl border-none  md:mt-6 mt-4 focus:outline-none input-md w-1/2 max-w-xl  mx-auto bg-snow "
            />
          </span>

          {/* email */}
          <input
            onChange={changeHandler}
            value={Credentials.Email}
            name="Email"
            type="email"
            placeholder="Email Address"
            className="input rounded-xl border-none  md:mt-6 mt-4 focus:outline-none input-md w-full max-w-xl  mx-auto bg-snow "
          />

          {/* university */}
          <input
            name="University"
            value={Credentials.University}
            onChange={changeHandler}
            type="text"
            placeholder="Your Institute/University"
            className="input rounded-xl border-none  md:mt-6 mt-4 focus:outline-none input-md w-full max-w-xl  mx-auto bg-snow "
          />

          {/* dates */}
          <div className="w-full max-w-xl  mx-auto flex md:mt-6 mt-4 ">
            {/* major */}
            <input
              name="Major"
              value={Credentials.Major}
              onChange={changeHandler}
              type="text"
              placeholder="Major"
              className="input rounded-xl border-none  focus:outline-none input-md w-1/2  mx-auto bg-snow  "
            />
            <span className="w-1/2 flex gap-4 ml-2">
              <input
                name="From"
                value={Credentials.From}
                onChange={changeHandler}
                type="date"
                placeholder="From"
                className="input rounded-xl border-none  focus:outline-none input-md w-1/2  mx-auto bg-snow  "
              />

              <input
                name="To"
                value={Credentials.To}
                onChange={changeHandler}
                type="date"
                placeholder="To"
                className="input rounded-xl border-none  focus:outline-none input-md w-1/2  mx-auto bg-snow  "
              />
            </span>
          </div>

          {/* password */}
          <div className="w-full max-w-xl  mx-auto flex md:mt-6 mt-4 ">
            <input
              name="Password"
              onChange={changeHandler}
              value={Credentials.Password}
              type="password"
              placeholder="Password"
              className=" rounded-s-lg border-none  focus:outline-none input-md w-full max-w-xl  mx-auto bg-snow  "
            />
            <button className="rounded-e-lg btn-primary bg-snow text-center p-2">
              0
            </button>
          </div>

          {/* dashed seperator line */}
          <div className=" grid grid-cols-12 gap-2  p-2 lg:mt-6 md:mt-6 mt-4   w-full max-w-xl  mx-auto ">
            {" "}
            <hr className="col span-1 border-2 border-lGray opacity-20" />
            <hr className="col span-1 border-2 border-lGray opacity-20" />
            <hr className="col span-1 border-2 border-lGray opacity-20" />
            <hr className="col span-1 border-2 border-lGray opacity-20" />
            <hr className="col span-1 border-2 border-lGray opacity-20" />
            <hr className="col span-1 border-2 border-lGray opacity-20" />
            <hr className="col span-1 border-2 border-lGray opacity-20" />
            <hr className="col span-1 border-2 border-lGray opacity-20" />
            <hr className="col span-1 border-2 border-lGray opacity-20" />
            <hr className="col span-1 border-2 border-lGray opacity-20" />
            <hr className="col span-1 border-2 border-lGray opacity-20" />
            <hr className="col span-1 border-2 border-lGray opacity-20" />
          </div>

          {/* checkbox */}
          <label className=" flex gap-2 cursor-pointer mx-auto w-full max-w-xl">
            <input
              type="checkbox"
              onChange={(e) => setChecked(!checked)}
              checked={checked}
              className="checkbox checkbox-primary bg-secondary opacity-20 w-6 h-6"
            />
            <span className="text-lGray">
              By creating an account, you agree to our{" "}
              <Link to="/"> Term and Conditions</Link>
            </span>
          </label>

          {/* register button */}
          <></>
          <button
            className="btn btn-accent rounded-xl border-none  md:mt-6 mt-4 focus:outline-none  w-full max-w-xs  mx-auto bg-secondary text-white"
            onClick={handleSubmit}
          >
            Register
          </button>
          <h3 className="text-lGray text-center text-bold text-xs mt-1">OR</h3>
          <button className="btn btn-primary rounded-xl border-none  mt-2 focus:outline-none  w-full max-w-xs  mx-auto bg-snow  ">
            <h3 className="opacity-100"
              onClick={login}
            >Continue with google</h3>
          </button>
          <span className="text-lGray text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-secondary">
              {" "}
              SignIn
            </Link>
          </span>
        </div>
      </div>
    </form>
  );
};

export default Register;
