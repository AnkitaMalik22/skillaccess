import React, { useState } from "react";
import Header from "../../../components/college/settings/home/Header";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutCollege } from "../../../redux/college/auth/authSlice";
import { setAssessments } from "../../../redux/college/test/testSlice";
import toast from "react-hot-toast";
import LogoutPoP from "../../../components/PopUps/LogoutPoP";
import useTranslate from "../../../hooks/useTranslate";

const Settings = () => {
  //useTranslate();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const handleLogOut = async (e) => {
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
  const Navigate = useNavigate();
  return (
    <div>
      <Header />

      <div className="w-3/4 mt-16 flex-col gap-4 flex">
        {/* notis */}
        {/* <div className="flex flex-col">
          <div
            className="flex cursor-pointer justify-between px-6 py-3 bg-[#8F92A1] bg-opacity-5 rounded-2xl"
            onClick={() => Navigate("/college/settings/notifications")}
          >
            <div className="flex gap-6 items-center">
              <img
                src="../../images/icons/bellDot.png"
                alt="bell-icon"
                srcset=""
              />
              <p className="text-lg m-0 text-[#171717] font-medium">
                Notifications
              </p>
            </div>
            <div className="flex self-center">
              <FaChevronRight className="text-[#17171799] self-center text-xl" />
            </div>
          </div>
        </div> */}
        {/*  */}

        {/* security*/}
        <div className="flex flex-col">
          <div
            className="flex cursor-pointer justify-between  px-6 py-3 bg-[#8F92A1] bg-opacity-5 rounded-2xl"
            onClick={() => Navigate("/college/settings/security")}
          >
            <div className="flex gap-6 items-center">
              <img src="../../images/icons/lock.png" alt="lock-icon" />
              <p className="text-lg font-medium text-[#171717]">
                Privacy and Security
              </p>
            </div>
            <div className="flex self-center">
              <FaChevronRight className="text-[#17171799] self-center text-xl" />
            </div>
          </div>
        </div>
        {/*  */}

        {/* Login Activity*/}
        <div className="flex flex-col">
          <div
            className="flex cursor-pointer justify-between px-6 py-3 bg-[#8F92A1] bg-opacity-5 rounded-2xl"
            onClick={() => Navigate("/college/settings/activity")}
          >
            <div className="flex gap-6 items-center">
              <img src="../../images/icons/location.png" alt="location-icon" />
              <p className="text-lg font-medium text-[#171717]">
                Login Activity
              </p>
            </div>
            <div className="flex self-center">
              <FaChevronRight className="text-[#17171799] self-center text-xl" />
            </div>
          </div>
        </div>
        {/*  */}

        {/* Visibility*/}
        {/* <div className="flex flex-col">
          <div
            className="flex cursor-pointer justify-between px-6 py-3 bg-[#8F92A1] bg-opacity-5 rounded-2xl"
            onClick={() => Navigate("/college/settings/visibility")}
          >
            <div className="flex gap-6 items-center">
              <img src="../../images/icons/eye.png" alt="eye-icon" />
              <p className="text-lg font-medium text-[#171717]">Visibility</p>
            </div>
            <div className="flex self-center">
              <FaChevronRight className="text-[#17171799]  self-center text-xl" />
            </div>
          </div>
        </div> */}
        {/*  */}

        {/* Visibility*/}

        <div className="flex flex-col">
          <div
            className="flex cursor-pointer justify-between px-6 py-3 bg-[#DE350B] bg-opacity-5 rounded-2xl"
            onClick={() => setShowLogoutPopup(true)}
          >
            <div className="flex gap-6 items-center">
              <img src="../../images/icons/del.png" alt="del-icon" />
              <p className="text-lg text-[#DE350B] font-medium">Log Out</p>
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
