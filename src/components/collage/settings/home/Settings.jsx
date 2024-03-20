import React from "react";
import Header from "./Header";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutCollage } from "../../../../redux/collage/auth/authSlice";
import { setAssessments } from "../../../../redux/collage/test/testSlice";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async (e) => {
    e.preventDefault();

    try {
      const ch = await dispatch(logoutCollage());
      if (ch.meta.requestStatus === "fulfilled") {
        dispatch(setAssessments());
        navigate("/");
      }
    } catch (error) {
      window.alert("logging out failed");
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
            className="flex justify-between px-5 py-4 bg-lGray bg-opacity-5 rounded-2xl sm:w-1/2"
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
            className="flex justify-between px-5 py-4 bg-lGray bg-opacity-5 rounded-2xl sm:w-1/2"
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
            className="flex justify-between px-5 py-4 bg-lGray bg-opacity-5 rounded-2xl sm:w-1/2"
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
          <div className="flex justify-between px-5 py-4 bg-lGray bg-opacity-5 rounded-2xl sm:w-1/2">
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
            className="flex justify-between px-5 py-4 bg-[#DE350B] bg-opacity-5 rounded-2xl sm:w-1/2"
            onClick={handleLogOut}
          >
            <div className="flex gap-6 ">
              <img src="../../images/icons/del.png" alt="" />
              <p className="text-lg text-[#DE350B]">Log Out</p>
            </div>
            <div className="flex self-center">
              <FaChevronRight className="text-gray-500 self-center text-2xl" />
            </div>
          </div>
        </div>
        {/*  */}
      </div>
      {/*  */}
    </div>
  );
};

export default Settings;
