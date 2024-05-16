import React, { useState } from "react";
import Header from "./Header";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutCollage } from "../../../../redux/collage/auth/authSlice";
import { setAssessments } from "../../../../redux/collage/test/testSlice";
import toast from "react-hot-toast";
import LogoutPoP from "../../../PopUps/LogoutPoP";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const handleLogOut = async (e) => {
    e.preventDefault();

    try {
      const ch = await dispatch(logoutCollage());
      if (ch.meta.requestStatus === "fulfilled") {
        toast.success("Logged out successfully");
        dispatch(setAssessments());
        navigate("/");
      }
    } catch (error) {
      toast.error("logging out failed");
    }
  };
  const Navigate = useNavigate();
  return (
    <div className="w-11/12 mx-auto font-dmSans">
      <Header />

      <div className="w-full mt-16 flex-col gap-4 flex">
        {/* notis */}
        <div className="flex flex-col">
          <div
            className="flex cursor-pointer justify-between px-5 py-4 bg-lGray bg-opacity-5 rounded-2xl sm:w-1/2"
            onClick={() => Navigate("/collage/settings/notifications")}
          >
            <div className="flex gap-6 ">
              <img src="../../images/icons/bellDot.png" alt="" srcset="" />
              <p className="text-lg">Notifications</p>
            </div>
            <div className="flex self-center">
              <FaChevronRight className="text-gray-500 self-center text-2xl" />
            </div>
          </div>
        </div>
        {/*  */}

        {/* security*/}
        <div className="flex flex-col">
          <div
            className="flex cursor-pointer justify-between px-5 py-4 bg-lGray bg-opacity-5 rounded-2xl sm:w-1/2"
            onClick={() => Navigate("/collage/settings/security")}
          >
            <div className="flex gap-6 ">
              <img src="../../images/icons/lock.png" alt="" />
              <p className="text-lg">Privacy and Security</p>
            </div>
            <div className="flex self-center">
              <FaChevronRight className="text-gray-500 self-center text-2xl" />
            </div>
          </div>
        </div>
        {/*  */}

        {/* Login Activity*/}
        <div className="flex flex-col">
          <div
            className="flex cursor-pointer justify-between px-5 py-4 bg-lGray bg-opacity-5 rounded-2xl sm:w-1/2"
            onClick={() => Navigate("/collage/settings/activity")}
          >
            <div className="flex gap-6 ">
              <img src="../../images/icons/location.png" alt="" />
              <p className="text-lg">Login Activity</p>
            </div>
            <div className="flex self-center">
              <FaChevronRight className="text-gray-500 self-center text-2xl" />
            </div>
          </div>
        </div>
        {/*  */}

        {/* Visibility*/}
        <div className="flex flex-col">
          <div className="flex cursor-pointer justify-between px-5 py-4 bg-lGray bg-opacity-5 rounded-2xl sm:w-1/2"
           onClick={() => Navigate("/collage/settings/visibility")}
          >
            <div className="flex gap-6 ">
              <img src="../../images/icons/eye.png" alt="" />
              <p className="text-lg">Visibility</p>
            </div>
            <div className="flex self-center">
              <FaChevronRight className="text-gray-500 self-center text-2xl" />
            </div>
          </div>
        </div>
        {/*  */}

        {/* Visibility*/}
        
        <div className="flex flex-col">
          <div
            className="flex cursor-pointer justify-between px-5 py-4 bg-[#DE350B] bg-opacity-5 rounded-2xl sm:w-1/2"
            onClick={() => setShowLogoutPopup(true)}
          >
            <div className="flex gap-6 ">
              <img src="../../images/icons/del.png" alt="" />
              <p className="text-lg text-[#DE350B]">Log Out</p>
            </div>
            {/* <div className="flex self-center">
              <FaChevronRight className="text-gray-500 self-center text-2xl" />
            </div> */}
          </div>
        </div>
        {showLogoutPopup && (
          <LogoutPoP
            onCancel={() => setShowLogoutPopup(false)}
            onConfirm={handleLogOut}
          />
        )}
        {/*  */}
      </div>
      {/*  */}
    </div>
  );
};

export default Settings;
