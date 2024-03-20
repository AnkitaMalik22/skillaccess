import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerCollage } from "../../../redux/collage/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { LuEye } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    setCredentials((prev) => {
      return { ...prev, [cred]: val };
    });
  };

  const sel = useSelector((state) => state.collageAuth);
  useEffect(() => {
    localStorage.removeItem("auth-token");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { Email, Password, FirstName, LastName, University, Phone } =
      Credentials;
    const data = {
      Phone,
      Email,
      Password,
      FirstName,
      LastName,

      CollegeName: University,
    };
    try {
      const ch = await dispatch(registerCollage(data));
      if (ch.meta.requestStatus === "fulfilled") {
        setCredentials({});
        navigate("/collage/dashboard");
      }
    } catch (error) {
      console.log("Reject" + error);
    }
  };
  const isCreateAccountDisabled = !checked || !Credentials.Email || !Credentials.Password || !Credentials.FirstName || !Credentials.LastName || !Credentials.University || !Credentials.Phone;
  return (
    <form action="" className="font-dmSans">
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

          <h2 className="font-bold text-2xl text-center  md:mt-10 mt-4">
            Sign Up to Skill Access
          </h2>
          <h2 className="text-sm font-normal text-center text-lGray">
            Create an account to continue!
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
            <span className="w-full flex gap-4 ">
              <input
                name="Phone"
                value={Credentials.Phone}
                onChange={changeHandler}
                type="number"
                placeholder="Mobile Number"
                className="input rounded-xl border-none  focus:outline-none input-md w-full  mx-auto bg-snow"
              />
            </span>
          </div>

          {/* password */}
          <div className="w-full max-w-xl  mx-auto flex md:mt-6 mt-4 ">
            <input
              name="Password"
              onChange={changeHandler}
              value={Credentials.Password}
              type={type}
              placeholder="Password"
              className=" rounded-s-lg border-none  focus:outline-none input-md w-full max-w-xl focus:ring-0 mx-auto bg-snow  "
            />
            <button
              className="rounded-e-lg btn-primary bg-snow text-center p-2"
              onClick={(e) => {
                e.preventDefault();
                type === "text" ? setType("password") : setType("text");
              }}
            >
              <LuEye className="text-gray-400 text-2xl" />
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
          <label className=" flex items-center gap-2 cursor-pointer mx-auto w-full max-w-xl">
            <input
              type="checkbox"
              onChange={(e) => setChecked(e.target.checked)}
              checked={checked}
              className="checkbox checkbox-primary bg-secondary opacity-20 w-6 h-6"
            />
            <span className="text-lGray font-bold text-xs">
              By creating an account, you agree to our{" "}
              <Link className="text-blue-600" to='/terms&policies' >
                Terms-Policies.{" "}
              </Link>
              {/* and, <Link>Notification Settings</Link> */}
            </span>
          </label>

          {/* register button */}
          <></>
          <button
           className={`btn hover:bg-blue-700 bg-blue-600 rounded-xl border-none md:mt-6 mt-4 focus:outline-none w-full max-w-xs mx-auto text-white ${isCreateAccountDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
           onClick={handleSubmit}
           disabled={isCreateAccountDisabled}
          >
            Create Account
          </button>
          {/* <h3 className=" text-center text-lGray text-bold text-xs mt-1">OR</h3>
          <button
            className="btn btn-primary rounded-xl border-none  mt-2 focus:outline-none  w-full max-w-xs  mx-auto bg-snow  "
            onClick={() => navigate("/collage/dashboard")}
          >
            <FcGoogle className="text-lg mr-2" />
            <h3 className="opacity-100">Continue with google</h3>
          </button> */}
          <span className="text-lGray text-center text-sm font-semibold">
            Already have an account?{" "}
            <Link to="/" className="text-blue-600 ">
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
