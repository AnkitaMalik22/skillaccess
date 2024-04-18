import React, { useRef, useState, Component, useEffect } from "react";
import { CgClipboard, CgAwards, CgTrending } from "react-icons/cg";
import { TbBriefcase2 } from "react-icons/tb";
import { MdOutlinedFlag } from "react-icons/md";
import { FaArrowRight, FaStar } from "react-icons/fa6";

import { useNavigate } from "react-router-dom";

// Import Swiper React components

// Import Swiper styles
import "swiper/css";
import SlideNextButton from "../buttons";
import SwiperSlideLeft from "./SwiperSlideLeft";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperSlideRight from "./SwiperSlideRight";
import ChartComp from "./Chart";

import {
  getStudent,
  getCompany,
  getAssessment,
  getTotalJobs,
  getPlacedStudents,
} from "../../../../redux/collage/dashboard/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCollege } from "../../../../redux/collage/auth/authSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { students, companies, assessments, jobs, placedStudents } =
    useSelector((state) => state.dashboard);
  useEffect(() => {
    dispatch(getStudent());
    dispatch(getCompany());
    dispatch(getAssessment());
    dispatch(getTotalJobs());
    dispatch(getPlacedStudents());

    // console.log("students : ",students);
  }, [dispatch]);

  // const [companies, setcompanies] = useState([
  //   {
  //     image:
  //       "https://images.pexels.com/photos/1337384/pexels-photo-1337384.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     name: "sample",
  //   },
  //   {
  //     image:
  //       "https://images.pexels.com/photos/1337384/pexels-photo-1337384.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     name: "sample",
  //   },
  //   {
  //     image:
  //       "https://images.pexels.com/photos/1337388/pexels-photo-1337388.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     name: "sample",
  //   },
  //   {
  //     image:
  //       "https://images.pexels.com/photos/1337388/pexels-photo-1337388.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     name: "sample",
  //   },
  // ]);

  useEffect(() => {
    dispatch(getCollege());
    console.log("get collaeg");
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <div className=" w-11/12 mx-auto font-dmSans">
        {/* top dashboard */}
        <div className="bg-gray-100 mt-3 sm:mt-8 rounded-lg ">
          <h1 className="text-lg font-extrabold pt-3 px-6 md:px-8 basis-full">
            Overview
          </h1>
          <div className="flex flex-wrap  gap-12  justify-center mb-4  px-4 mt-2 pb-6">
            {/* 1st card */}
            <div className="card w-[13%] md:w-[16%] lg:w-[17%[ bg-base-100  py-4">
              <div className="rounded-lg bg-gray-100 w-10 h-10 flex justify-center mx-auto mt-4 mb-2 ">
                <CgClipboard className="text-[#5243AA] self-center w-6 h-6 " />
              </div>
              <h2 className="text-2xl text-center font-bold mt-2">
                {students.length}
              </h2>
              <h2 className="text-gray-400 text-center font-semibold text-xs mt-2 ">
                Students
              </h2>
              <h2 className="text-green-400 text-center font-medium text-base my-4 ">
                105.34%
              </h2>
            </div>

            <div className="card w-[13%] md:w-[16%] lg:w-[17%[ bg-base-100  py-4">
              <div className="rounded-lg bg-gray-100 w-10 h-10 flex justify-center mx-auto mt-4 mb-2">
                <CgAwards className="text-green-600 self-center w-6 h-6 " />
              </div>
              <h2 className="text-2xl text-center font-bold mt-2">
                {companies.length}
              </h2>
              <h2 className="text-gray-400 text-center font-semibold text-xs mt-2 ">
                Companies
              </h2>
              <h2 className="text-red-500 text-center font-medium text-base my-4 ">
                25.34%
              </h2>
            </div>

            <div className="card w-[13%] md:w-[16%] lg:w-[17%[ bg-base-100  py-4">
              <div className="rounded-lg bg-gray-100 w-10 h-10 flex justify-center mx-auto mt-4 mb-2">
                <CgTrending className="text-[#FF991F] self-center w-6 h-6 " />
              </div>
              <h2 className="text-2xl text-center font-bold mt-2">
                {placedStudents.length}
              </h2>
              <h2 className="text-gray-400 text-center font-semibold text-xs mt-2 ">
                Student Placed
              </h2>
              <h2 className="text-green-600 text-center font-medium text-base my-4 ">
                14.34%
              </h2>
            </div>

            <div className="card w-[13%] md:w-[16%] lg:w-[17%[ bg-base-100  py-4">
              <div className="rounded-lg bg-gray-100 w-10 h-10 flex justify-center mx-auto mt-4 mb-2">
                <TbBriefcase2 className="text-blued self-center w-6 h-6 " />
              </div>
              <h2 className="text-2xl text-center font-bold mt-2">
                {jobs.length}
              </h2>
              <h2 className="text-gray-400 text-center font-semibold text-xs mt-2 ">
                Total Jobs
              </h2>
              <h2
                className="text-green-600 text-center  text-base my-4 font-medium hover:cursor-pointer"
                onClick={() => navigate("/collage/dashboard/jobs")}
              >
                35.34%
              </h2>
            </div>

            <div className="card w-[13%] md:w-[16%] lg:w-[17%[ bg-base-100  py-4">
              <div className="rounded-lg bg-gray-100 w-10 h-10 flex justify-center mx-auto mt-4 mb-2">
                <MdOutlinedFlag className="text-blue-700 self-center w-6 h-6 " />
              </div>
              <h2 className="text-2xl text-center font-bold mt-2">
                {assessments.length}
              </h2>
              <h2 className="text-gray-400 text-center font-semibold text-xs mt-2 ">
                Available Assessment
              </h2>
              <span
                className="flex my-4 gap-2 justify-center hover:cursor-pointer"
                onClick={() => navigate("/collage/test")}
              >
                <h2 className="text-blue-700 font-bold text-center  text-base  ">
                  Create New
                </h2>
                <FaArrowRight className="text-blue-700 self-center" />
              </span>
            </div>
          </div>
        </div>

        <div className=" gap-2  mx-auto  overflow-x-clip grid grid-cols-2">
          {/* 1st block */}
          <div className="bg-gray-100 mt-3 sm:mt-5 rounded-lg   pb-4 mr-1 inline-block p-4">
            <span className="flex justify-between">
              <div className="w-1/2">
                <h1 className="text-base font-bold  basis-full py-2 ">
                  New Companies Onboarded
                </h1>{" "}
              </div>

              <button
                className="text-blue-500"
                onClick={() => navigate("/collage/dashboard/companies")}
              >
                See  All
              </button>
            </span>

            <SwiperSlideLeft />
          </div>
          {/* 2nd block */}
          <div className="bg-gray-100 mt-3 sm:mt-5 rounded-lg    pb-4 mr-1 inline-block p-4">
            <span className="flex justify-between">
              <div className="w-1/2">
                <h1 className="text-base font-bold  basis-full py-2 ">
                  New Jobs Posted
                </h1>{" "}
              </div>

              <button
                className="text-blue-500"
                onClick={() => navigate("/collage/dashboard/jobs")}
              >
                See All
              </button>
            </span>
            <SwiperSlideRight />
          </div>
        </div>

        {/* chart */}
        <ChartComp />
      </div>
    </>
  );
}

//w-56  2xs:w-72 xs:w-80
