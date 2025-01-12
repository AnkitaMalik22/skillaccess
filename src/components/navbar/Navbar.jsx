import React from "react";
import { useNavigate } from "react-router-dom";
import { FiBell, FiSettings } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { FaCoins } from "react-icons/fa";
import useTranslate from "../../hooks/useTranslate";
import GoogleTranslate from "../GoogleTranslate";
import { Disclosure } from "@headlessui/react";
import { logoutCollege } from "../../redux/college/auth/authSlice";
import { setAssessments } from "../../redux/college/test/testSlice";
import toast from "react-hot-toast";

const Navbar = (props) => {
  const currentLanguage = useTranslate();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goToProfile = () => {
    // Function to navigate to profile page
    navigate("/college/profile"); // Use navigate function to navigate to desired URL
  };
  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const ch = await dispatch(logoutCollege());
      if (ch.meta.requestStatus === "fulfilled") {
        toast.success("Logged out successfully");
        dispatch(setAssessments());
        navigate("/");
      }
    } catch (error) {
      toast.error("logging out failed");
    }
  };
  const userDetails = useSelector((state) => state.collegeAuth);

  return (
    <nav className="navbar flex justify-between bg-white w-full z-[9999] fixed top-0 border-b-black border">
      {/* left */}
      <div>
        {/* mobile only */}
        <button
          className="btn btn-primary sm:hidden  "
          onClick={() => props.setOpen(!props.open)}
        >
          hamb
        </button>

        <div className="ml-3">
          {" "}
          <img src="/images/logoFinal.png" alt="" width="180px" />
        </div>
      </div>

      {/* right */}
      <div className="flex gap-4">
        <button
          onClick={() => {
            navigate("/college/accounting");
          }}
          className="border border-[#D9E1E7] text-blued  rounded-md px-3 p-1 relative flex items-center"
        >
          <FaCoins />
          <h1 className="text-blued  px-2">
            {userDetails?.balance?.credit ? userDetails?.balance?.credit : 0}
          </h1>
        </button>

        <GoogleTranslate currentLanguage={currentLanguage} />

        {/* Profile Dropdown */}
        <Disclosure as="div" className="relative">
          {({ open, close }) => (
            <>
              <Disclosure.Button className="flex items-center border border-[#D9E1E7] rounded-md p-2 gap-2">
                <img
                  src={
                    userDetails?.user?.avatar?.url || "/images/defaultUser.jpg"
                  }
                  alt="User Avatar"
                  className="h-5 w-5"
                />
                <h2 className="text-sm font-bold">
                  Hello {userDetails?.user?.FirstName}
                </h2>
                <FiSettings className="text-lg text-accent" /> {/* Gear icon */}
              </Disclosure.Button>

              {/* Dropdown Panel */}
              <Disclosure.Panel
                className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                onMouseLeave={() => close()}
              >
                <button
                  onClick={goToProfile}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:bg-opacity-60 rounded-md "
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded-md "
                >
                  Logout
                </button>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <div className="w-52"></div>
      </div>
    </nav>
  );
};

export default Navbar;
