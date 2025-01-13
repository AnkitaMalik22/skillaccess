import React, { useRef } from "react";
import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileInfo } from "./ProfileInfo";
import { useCollegeProfile } from "../../../hooks/useCollegeProfile";
import Loader from "../../loaders/Loader";
import InputField from "../../InputField";

const Header = () => {
  const {
    college,
    setCollege,
    avatar,
    editable,
    setEditable,
    loading,
    handleUpdate,
    handleAvatarChange,
    isUni,
  } = useCollegeProfile();

  return (
    <>
      <div className="flex justify-between border-b bg-snow rounded-md py-2 px-3">
        <div className="flex gap-3 ">
          <ProfileAvatar
            editable={editable}
            avatar={avatar}
            college={college}
            handleAvatarChange={handleAvatarChange}
          />
          <div className="">
            <h2 className="3xl:text-[28px] text-[20px] font-extrabold py-1">
              {editable ? (
                <InputField
                  type="text"
                  value={isUni ? college?.name : college?.CollegeName}
                  onChange={(e) =>
                    setCollege({
                      ...college,
                      [isUni ? "name" : "CollegeName"]: e.target.value,
                    })
                  }
                  className="bg-transparent border-none focus:outline-none w-full min-w-[30vw] text-[20px] font-extrabold"
                />
              ) : (
                <p className="text-[20px] font-extrabold py-1">
                  {isUni ? college?.name : college?.CollegeName}
                </p>
              )}
            </h2>
            <h2 className="text-sm text-gray-400 pb-2">
              {isUni ? college?._id : college?._id}
            </h2>
          </div>
        </div>
        {editable ? (
          <div className="self-center flex gap-2">
            <button
              className="py-2 text-white rounded-md bg-red-500 font-bold flex gap-2 px-4"
              onClick={() => setEditable(false)}
            >
              Cancel
            </button>
            <button
              className="py-2 text-white rounded-md bg-accent font-bold flex gap-2 px-4 "
              disabled={loading}
              onClick={handleUpdate}
            >
              {loading ? <Loader /> : "Save"}
            </button>
          </div>
        ) : (
          <button
            className="self-center mr-2 py-2 text-white rounded-md bg-accent font-bold flex gap-2 px-4 "
            disabled={loading}
            onClick={() => {
              localStorage.setItem("editable", "true");
              setEditable(true);
            }}
          >
            {loading ? <Loader /> : <img src="/images/icons/pen.png" alt="" />}
            <p>Edit Profile</p>
          </button>
        )}
      </div>
      <div className="border-b px-6 py-8 bg-gray-50 font-dmSans">
        <h1 className="text-lg font-bold">Overview</h1>
        {editable ? (
          <textarea
            className="mt-2 bg-transparent border-none focus:outline-none w-full max-w-[80vw]"
            value={isUni ? college?.description : college?.Description}
            onChange={(e) =>
              setCollege({
                ...college,
                [isUni ? "description" : "Description"]: e.target.value,
              })
            }
            placeholder="Add Description"
          />
        ) : (
          <p className="text-sm font-medium mt-2 leading-loose text-gray-500">
            {isUni ? college?.description : college?.Description}
          </p>
        )}
      </div>
      <ProfileInfo
        college={college}
        editable={editable}
        setCollege={setCollege}
        isUni={isUni}
      />
    </>
  );
};

export default Header;
