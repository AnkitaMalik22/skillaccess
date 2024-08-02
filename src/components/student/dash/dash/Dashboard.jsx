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
import List from "./List";
import ApplyPoPup from "../../../PopUps/ApplyPoPup";
import CompleteProfile from "../../../PopUps/CompleteProfile";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { students, companies, assessments, jobs, placedStudents } =
    useSelector((state) => state.dashboard);
  const { user } = useSelector((state) => state.collageAuth);

  useEffect(() => {
    dispatch(getStudent());
    dispatch(getCompany());
    dispatch(getAssessment());
    dispatch(getTotalJobs());
    dispatch(getPlacedStudents());

    // //console.log("students : ",students);
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
    // //console.log("get collaeg");
  }, []);
  const navigate = useNavigate();

  const [showPoPup, setShowPoPup] = useState(true);
  const handleShow = () => {
    setShowPoPup(true);
  };
  const handleClose = () => {
    setShowPoPup(false);
  };
  return (
    <>
      <>
        {showPoPup && <CompleteProfile onCancel={handleClose} />}
        {/* chart */}
        <ChartComp />
        {/* top dashboard */}

        <div className=" gap-2  mx-auto  overflow-x-clip grid grid-cols-2">
          {/* 1st block */}
          <div className="bg-gray-100 mt-3 sm:mt-5 rounded-lg   pb-4 mr-1 inline-block p-4">
            <span className="flex justify-between">
              <div className="w-1/2">
                <h1 className="text-base font-bold  basis-full py-2 ">
                  Jobs for you
                </h1>{" "}
              </div>

              <button
                className="text-blue-500"
                onClick={() => navigate("/student/dashboard/jobs")}
              >
                See All
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
                onClick={() => navigate("/student/dashboard/jobs")}
              >
                See All
              </button>
            </span>
            <SwiperSlideRight />
          </div>
        </div>
        <div className="my-4 w-full">
          <List />
        </div>
      </>
    </>
  );
}

//w-56  2xs:w-72 xs:w-80
