import React, { useState, useEffect } from "react";

import { FaSearch } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa6";
import { PiSlidersHorizontalLight } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTotalJobs } from "../../../../redux/collage/dashboard/dashboardSlice";
import BackIcon from "../../../buttons/BackIcon";
import { IoIosSearch } from "react-icons/io";

const Jobs = () => {
  // const [jobs, setJobs] = useState([1, 2, 3, 4, 5, 6, , 9, 6]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { jobs } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getTotalJobs());
  }, [dispatch]);

  return (
    <div>
      <div className="flex w-full mx-auto justify-between mb-2">
        <button
          className="  self-center  rounded-lg h-10 w-10 "
          onClick={() => navigate(-1)}
        >
          <BackIcon />
        </button>
        <div className=" rounded-xl mx-2 w-full sm:h-12 h-10 flex my-2 ">
          <span className="w-fit mx-auto flex self-center">
            <IoIosSearch className="self-center w-10 h-10 bg-gray-100 rounded-s-lg text-gray-400 py-2 " />
            <input
              type="text"
              placeholder="Search"
              className="placeholder pl-0 border-none self-center bg-gray-100 focus:outline-none focus:ring-0 rounded-e-lg sm:w-80 w-fit"
            />
          </span>
        </div>

        <button className="bg-gray-100  self-center  rounded-lg h-10 w-10 sm:h-12 sm:w-16">
          <PiSlidersHorizontalLight className="mx-auto  h-6 w-6" />
        </button>
      </div>
      <div className="flex flex-col gap-4  items-center  ">
        {jobs?.map((job, index) => {
          return (
            <div className="flex justify-between w-[99%]" key={index}>
              <div className="sm:flex">
                <div className=" sm:h-10 sm:w-10  w-6 h-6 self-center bg-red-600 mr-2"></div>
                <span className="">
                  <h2 className="font-dmSans font-semibold text-sm sm:text-base">
                    Role
                  </h2>
                  <h2 className="font-dmSans font-medium text-[.6rem] sm:text-xs inline">
                    {" "}
                    {job.JobTitle}
                  </h2>
                  <h2 className="font-dmSans text-gray-400  font-medium text-xs sm:text-xs inline">
                    {" "}
                    {job.CloseByDate}
                  </h2>
                </span>
              </div>
              <div className="flex sm:gap-6 gap-1">
                <CiLocationOn className="mx-auto sm:h-6 sm:w-6 h-4 w-4 self-center" />
                <h2 className="font-dmSans text-gray-400  font-medium text-xs self-center sm:text-xs inline">
                  {" "}
                  {job.JobLocation}
                </h2>
                <h2 className="font-dmSans text-green-500  font-medium text-xs self-center sm:text-xs inline">
                  {" "}
                  {job.WorkplaceType}
                </h2>
                <button className=" h-8 p-1 hover:bg-blue-900 bg-blued rounded-lg text-white text-[.5rem] sm:text-sm self-center ">
                  {job.EmploymentType}
                </button>
                <FaArrowRight className="text-gray-400 self-center" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Jobs;
