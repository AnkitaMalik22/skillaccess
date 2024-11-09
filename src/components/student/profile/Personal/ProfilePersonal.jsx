import React from "react";
import { FiUpload } from "react-icons/fi";
import Header from "../common/Header";
import { useNavigate } from "react-router-dom";
import { Progress } from "../common/Progress";

const ProfilePersonal = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header next={() => navigate("/student/profile/education")} />
      <Progress level={1} />
      <div className=" flex flex-col py-4">
        <div className="flex flex-col md:flex-row pt-12 gap-4 ">
          <div className="flex flex-col w-[400px]">
            <label className="mb-4 text-lg font-bold">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              className="bg-gray-100 text-gray-400 placeholder-gray-400 rounded px-3 py-2 border-none"
            />
          </div>
          <div className="flex flex-col w-[400px] ">
            <label className="mb-4 text-lg font-bold">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              className="bg-gray-100 text-gray-400 placeholder-gray-400 rounded px-3 py-2 border-none"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row pt-12 gap-4 ">
          <div className="flex flex-col w-[400px]">
            <label className="mb-4 text-lg font-bold">Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter your phone number"
              className="bg-gray-100 text-gray-400 placeholder-gray-400 rounded px-3 py-2 border-none"
            />
          </div>
          <div className="flex flex-col w-[400px]">
            <label className="mb-4 text-lg font-bold">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              className="bg-gray-100 text-gray-400 placeholder-gray-400 rounded px-3 py-2 border-none"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row pt-12 gap-4 ">
          <div className="flex flex-col w-[400px]">
            <label className="mb-4 text-lg font-bold">Profile</label>
            <input
              type="text"
              name="profile"
              placeholder="Enter your profile"
              className="bg-gray-100 text-gray-400 placeholder-gray-400 rounded px-3 py-2 border-none"
            />
          </div>
          <div className="flex flex-col w-[400px]">
            <label className="mb-4 text-lg font-bold">Website</label>
            <input
              type="text"
              name="website"
              placeholder="Enter your website"
              className="bg-gray-100 text-blue-700 placeholder-gray-400 rounded px-3 py-2 border-none"
            />
          </div>
        </div>
        <div className="flex flex-col w-1/2 pt-12">
          <label className="mb-4 text-lg font-bold">Address</label>
          <textarea
            name="address"
            placeholder="Enter your address"
            className="bg-gray-100 text-gray-400 placeholder-gray-400 rounded px-3 py-2 border-none"
          ></textarea>
        </div>
        <div className="mt-12 mb-8">
          <h2 className="text-lg font-bold ">CV</h2>
          <p className="text-lg pt-3">resumefileanamexyz.pdf</p>
          <button className="self-center justify-center flex bg-accent py-3  rounded-xl w-48 text-white  gap-2 mt-4 ">
            <FiUpload className="self-center text-lg " /> Upload New
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfilePersonal;
