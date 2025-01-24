import React, { useState } from "react";
import Header from "../../../components/college/settings/home/Header";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutCollege } from "../../../redux/college/auth/authSlice";
import { setAssessments } from "../../../redux/college/test/testSlice";
import toast from "react-hot-toast";
import LogoutPoP from "../../../components/PopUps/LogoutPoP";
import { CiLock } from "react-icons/ci";
import { IoIosLogIn } from "react-icons/io";

const Settings = () => {
  // useTranslate();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleLogOut = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(logoutCollege());
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Logged out successfully");
        dispatch(setAssessments());
        navigate("/");
      }
    } catch (error) {
      toast.error("Logging out failed");
    }
  };

  const settingOptions = [
    {
      title: "Privacy and Security",
      icon: <CiLock />,
      onClick: () => navigate("/college/settings/security"),
      bgColor: "bg-[#8F92A1] bg-opacity-5",
    },
    {
      title: "Login Activity",
      icon: <IoIosLogIn />,
      onClick: () => navigate("/college/settings/activity"),
      bgColor: "bg-[#8F92A1] bg-opacity-5",
    },
  ];

  return (
    <div>
      <Header />
      <div className="w-3/4 mt-16 flex flex-col gap-6">
        {settingOptions.map((option, index) => (
          <div
            key={index}
            className={`flex justify-between items-center p-5 rounded-2xl border border-transparent shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md cursor-pointer ${option.bgColor}`}
            onClick={option.onClick}
          >
            <div className="flex gap-4 items-center">
              {option.icon}
              <p
                className={`text-lg font-medium ${
                  option.textColor || "text-[#171717]"
                }`}
              >
                {option.title}
              </p>
            </div>
            {option.title !== "Log Out" && (
              <FaChevronRight className="text-gray-500 text-xl" />
            )}
          </div>
        ))}

        {showLogoutPopup && (
          <LogoutPoP
            onCancel={() => setShowLogoutPopup(false)}
            onConfirm={handleLogOut}
          />
        )}
      </div>
    </div>
  );
};

export default Settings;
