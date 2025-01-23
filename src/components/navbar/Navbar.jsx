import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useTranslate from "../../hooks/useTranslate";
import GoogleTranslate from "../GoogleTranslate";
import { Disclosure } from "@headlessui/react";
import { logoutCompany } from "../../redux/company/auth/companyAuthSlice";
import { logoutCollege } from "../../redux/college/auth/authSlice";
import { setAssessments } from "../../redux/college/test/testSlice";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaCoins } from "react-icons/fa";
import toast from "react-hot-toast";
import { clearCookie } from "../../util/getToken";
import { logoutUniversity } from "../../redux/university/auth/universityAuthSlice";

const Navbar = ({ userType, setOpen, open }) => {
  const dispatch = useDispatch();
  const currentLanguage = useTranslate();
  const navigate = useNavigate();

  const companyAuth = useSelector((state) => state.companyAuth);
  const universityAuth = useSelector((state) => state.universityAuth);
  const collegeAuth = useSelector((state) => state.collegeAuth);
  const userDetails =
    userType === "company"
      ? companyAuth.data
      : userType === "university"
      ? universityAuth.user
      : collegeAuth.user;

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      let result;
      switch (userType) {
        case "company":
          result = await dispatch(logoutCompany());
          if (result.meta.requestStatus === "fulfilled") {
            toast.success("Logged out successfully");
            window.location.href = "/company";
          } else {
            throw new Error("Company logout failed");
          }
          break;
        case "university":
          result = await dispatch(logoutUniversity());
          if (result.meta.requestStatus === "fulfilled") {
            clearCookie("token");
            toast.success("Logged out successfully");
            window.location.href = "/university";
          } else {
            throw new Error("University logout failed");
          }
          break;
        case "college":
          result = await dispatch(logoutCollege());
          if (result.meta.requestStatus === "fulfilled") {
            toast.success("Logged out successfully");
            dispatch(setAssessments());
            navigate("/");
          } else {
            throw new Error("College logout failed");
          }
          break;
        default:
          throw new Error("Invalid user type");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logging out failed");
    }
  };

  const getProfilePath = () => {
    switch (userType) {
      case "company":
        return "/company/pr/profile";
      case "university":
        return "/university/pr/profile";
      case "college":
        return "/college/profile";
      default:
        return "/";
    }
  };

  return (
    <nav className="navbar flex justify-between bg-white w-full z-[9999] fixed top-0 border-b-black border">
      {/* Left Side */}
      <div className="flex items-center">
        {/* Mobile Toggle Button */}
        <button
          className="btn btn-primary sm:hidden"
          onClick={() => setOpen(!open)}
        >
          hamb
        </button>

        {/* Logo */}
        <div className="ml-3">
          <img src="/images/logoFinal.png" alt="Logo" width="180px" />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <GoogleTranslate currentLanguage={currentLanguage} />

        {userType === "college" && (
          <button
            onClick={() => navigate("/college/accounting")}
            className="border border-[#D9E1E7] text-blued hover:border-blued rounded-md px-3 h-[38px] relative flex items-center"
          >
            <FaCoins />
            <h1 className="text-blued px-2">
              {collegeAuth?.balance?.credit || 0}
            </h1>
          </button>
        )}

        {/* Profile Dropdown */}
        <Disclosure as="div" className="relative">
          {({ open, close }) => (
            <>
              <Disclosure.Button className="flex items-center border border-[#D9E1E7] hover:border-blued rounded-md p-2 gap-2">
                <img
                  src={
                    userDetails?.avatar?.url ||
                    userDetails?.user?.basic?.logo ||
                    "/images/defaultUser.png"
                  }
                  alt="User Avatar"
                  className="h-5 w-5 rounded-full p-[2px] bg-blue-100"
                />
                <h2 className="text-sm font-bold">
                  Hello{" "}
                  {userDetails?.basic?.companyName ||
                    userDetails?.FirstName ||
                    userDetails?.name ||
                    ""}
                </h2>

                <RiArrowDropDownLine />
              </Disclosure.Button>

              {/* Dropdown Panel */}
              <Disclosure.Panel
                className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                onMouseLeave={() => close()}
              >
                <button
                  onClick={() => navigate(getProfilePath())}
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
      </div>
    </nav>
  );
};

export default Navbar;
