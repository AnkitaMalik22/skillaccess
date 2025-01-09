import React from "react";
import Header from "../common/Header";
import { Progress } from "../common/Progress";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiUpload } from "react-icons/fi";
import { LuClock3 } from "react-icons/lu";
import { CgPinAlt } from "react-icons/cg";

const ProfileEducation = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header next={() => navigate("/student/profile/skills")} />
      <Progress level={2} />

      <div className="font-dmSans">
        {/* user header */}

        <section className="px-3 ">
          <div className="flex justify-between">
            {/* profile pic and details */}
            <div className="flex gap-2 py-1 mt-2">
              <div className="min-w-[2.5rem] h-10 bg-amber-500 self-center rounded-md"></div>
              <div className="ml-1 mt-1">
                <h2 className="  font-bold  py-1 ">ABC college</h2>
                <h2 className="font-normal  text-sm pb-2">
                  Bachelor in yapology
                </h2>
              </div>
            </div>

            {/* Location and date */}
            <span className="flex gap-12">
              {/*  */}
              <div className="self-center text-gray-400 mr-2 font-medium">
                <span className="flex gap-1 ">
                  {" "}
                  <LuClock3 className="self-center " />{" "}
                  <p className="self-center text-sm font-medium">
                    August 12 2014 to July 8 2018
                  </p>
                </span>
              </div>

              <div className="self-center text-gray-400 mr-2">
                <span className="flex gap-1">
                  {" "}
                  <CgPinAlt className="self-center text-lg font-bold" />{" "}
                  <p className="self-center text-sm">Bhopal India</p>
                </span>
              </div>
              {/*  */}
            </span>
            {/* End of location and date */}
          </div>
          {/*  */}
          <p className="text-sm font-dmSans">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            ipsa quam vel quidem, perferendis ipsam. Deserunt cumque doloribus
            explicabo, distinctio tempore accusantium optio facilis non vitae
            ullam animi dolorum impedit?
          </p>
        </section>
        {/* end of user header */}

        {/*  Acheivements*/}
        <section className="px-3 text-sm font-bold mt-5">
          <h2>Acheivements (1)</h2>
          <div className="flex flex-wrap mt-4 border-b-2 pb-5">
            <img
              src="/images/cert.png"
              alt=""
              className="w-60 h-40 object-cover rounded-md"
            />
          </div>
        </section>
        {/* End of  Acheivements */}
      </div>

      <div className="flex flex-col w-[400px]">
        <label className="mb-4 text-lg font-bold">School</label>
        <input
          type="text"
          name="firstName"
          placeholder="Enter your school name"
          className="bg-gray-200 bg-opacity-70   text-[#171717] placeholder-[#171717] rounded px-3 py-2 border-none"
        />
      </div>
      <div className="flex flex-col w-1/2 pt-12">
        <label className="mb-4 text-lg font-bold">Description</label>
        <textarea
          name="address"
          placeholder="Enter description"
          className="bg-gray-200 bg-opacity-70   text-[#171717] placeholder-[#171717] rounded px-3 py-2 border-none"
        ></textarea>
      </div>
      <div className="flex flex-col w-[400px] pt-12">
        <label className="mb-4 text-lg font-bold">Degree</label>
        <input
          type="text"
          name="firstName"
          placeholder="degree"
          className="bg-gray-200 bg-opacity-70   text-[#171717] placeholder-[#171717] rounded px-3 py-2 border-none"
        />
      </div>
      <div className="flex flex-col md:flex-row pt-12 gap-4">
        <div className="flex flex-col w-[436px]">
          <label className="mb-1 text-lg font-bold">Start Date</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter your first name"
            className="bg-gray-200 bg-opacity-70   text-[#171717] placeholder-[#171717] rounded px-3 py-2 border-none"
          />
        </div>
        <div className="flex flex-col w-[436px]">
          <label className="mb-1 text-lg font-bold">
            End Date (or expected)
          </label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter your last name"
            className="bg-gray-200 bg-opacity-70   text-[#171717] placeholder-[#171717] rounded px-3 py-2 border-none"
          />
        </div>
      </div>

      <div className="flex flex-col w-[400px] pt-12">
        <label className="mb-4 text-lg font-bold">Media Upload</label>

        <div className="flex justify-center bg-gray-200 bg-opacity-70   rounded-md w-20 h-20">
          <FiUpload className="self-center text-lg " />
        </div>

        <button className="self-center justify-center flex  py-3  rounded-xl w-32  gap-2 mx-auto bg-gray-200 bg-opacity-70  ">
          <FiPlus className="self-center text-lg " /> Add
        </button>
      </div>
    </>
  );
};

export default ProfileEducation;
