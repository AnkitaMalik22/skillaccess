import React from "react";
import { useNavigate } from "react-router-dom";
import { FiBell, FiSettings } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import useTranslate from "../../hooks/useTranslate";
import GoogleTranslate from "../GoogleTranslate";
import { Disclosure } from "@headlessui/react";
import toast from "react-hot-toast";
import { clearCookie } from "../../util/getToken";

const UniversityNavbar = (props) => {
  const dispatch = useDispatch();
  const currentLanguage = useTranslate();
  const navigate = useNavigate();
  const { data: userDetails } = useSelector((state) => state.universityAuth);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      clearCookie("uni-token");
      navigate("/university");
    } catch (error) {
      toast.error("logging out failed");
    }
  };

  return (
    <nav className="navbar flex justify-between bg-white w-full z-[9999] fixed top-0 border-b-black border">
      {/* Left Side */}
      <div className="flex items-center">
        {/* Mobile Toggle Button */}
        <button
          className="btn btn-primary sm:hidden"
          onClick={() => props.setOpen(!props.open)}
        >
          hamb
        </button>

        {/* Logo */}
        <div className="ml-3">
          <img src="/images/logoFinal.png" alt="Company Logo" width="180px" />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Notification Button */}
        {/* <button className="relative border-2 border-[#D9E1E7] text-[#D9E1E7] rounded-md px-2 p-1">
          <FiBell className="text-lg" />
          <div className="absolute top-1 right-2 h-2 w-2 bg-lightBlue rounded-full"></div>
        </button> */}

        {/* Profile Dropdown */}
        <Disclosure as="div" className="relative">
          {({ open, close }) => (
            <>
              <Disclosure.Button className="flex items-center border border-[#D9E1E7] rounded-md p-2 gap-2">
                {/* <img
                                    src={
                                        userDetails?.avatar?.url ||
                                        userDetails?.user?.basic.logo ||
                                        "/images/defaultUser.png"
                                    }
                                    alt="User Avatar"
                                    className="h-5 w-5"
                                /> */}
                <h2 className="text-sm font-bold">
                  Hello
                  {/* Hello {userDetails?.basic?.companyName} */}
                </h2>
                <FiSettings className="text-lg text-accent" /> {/* Gear icon */}
              </Disclosure.Button>

              {/* Dropdown Panel */}
              <Disclosure.Panel
                className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                onMouseLeave={() => close()}
              >
                <button
                  onClick={() => navigate("/university/pr/profile")}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-accent hover:bg-opacity-60 rounded-md hover:text-white"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-accent hover:bg-opacity-60 rounded-md hover:text-white"
                >
                  Logout
                </button>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <div className="w-44"></div>
        {/* Language Selector */}
      </div>

      <GoogleTranslate currentLanguage={currentLanguage} />
    </nav>
  );
};

export default UniversityNavbar;
