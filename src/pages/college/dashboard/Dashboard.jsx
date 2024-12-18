import { useEffect } from "react";
import { CgClipboard, CgAwards, CgTrending } from "react-icons/cg";
import { TbBriefcase2 } from "react-icons/tb";
import { MdOutlinedFlag } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import useTranslate from "../../../hooks/useTranslate";
import SwiperSlideLeft from "../../../components/college/dashboard/dash/SwiperSlideLeft";
import SwiperSlideRight from "../../../components/college/dashboard/dash/SwiperSlideRight";
import { getResultGraph } from "../../../redux/college/result/thunks/graph";
import {
  getStudent,
  getCompany,
  getAssessment,
  getTotalJobs,
  getPlacedStudents,
} from "../../../redux/college/dashboard/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCollege } from "../../../redux/college/auth/authSlice";
import ChartComp from "../../../components/college/results/home/Chart";
import { getAllJobs } from "../../../redux/college/jobs/collegeJobSlice";
import axios from "axios"
import { getUniversity } from "../../../redux/university/auth/universityAuthSlice";
import { isUni } from "../../../util/isCompany";

const Dashboard = () => {
  //useTranslate();
  const dispatch = useDispatch();
  const { students, companies, assessments, jobs, placedStudents } =
    useSelector((state) => state.dashboard);
  const { user } = useSelector((state) => state.collegeAuth);

  useEffect(() => {
    if (user) {
     if (!isUni() ){
        dispatch(getAllJobs(user?._id));
        dispatch(getCompany({ collegeId: user?._id }));
      }
      
      dispatch(getResultGraph());
    }
  }, [user]);

  useEffect(() => {

    

    dispatch(getStudent());
    // dispatch(getCompany());
    dispatch(getAssessment());
    dispatch(getTotalJobs());
    dispatch(getPlacedStudents());
  }, [dispatch]);

  useEffect(() => {

    isUni() ? dispatch(getUniversity()): dispatch(getCollege());
    
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-[#F8F8F9]  rounded-3xl p-4 md:p-8 mb-5">
        <h1 className="text-base font-bold mb-4 md:mb-8 basis-full text-[#171717]">
          Overview
        </h1>
        <div className="flex flex-wrap gap-6 xl:gap-8 2xl:gap-12 ">
          {/* 1st card */}
          <div className="card w-[13%] md:w-[16%] lg:w-[17%] bg-[#fff] p-4 md:p-8 items-center text-center">
            <div className="rounded-lg bg-[#f6f6fb] w-10 h-10 flex justify-center mb-4">
              <CgClipboard className="text-[#5243AA] self-center w-6 h-6 " />
            </div>
            <h2 className="text-[30px] text-center font-bold mb-1 text-[#171717]">
              {students.length}
            </h2>
            <h2 className="text-[#8F92A1] font-bold text-xs mb-4">Students</h2>
            {/* <h2 className="text-[#00875A] font-medium text-[17px]">105.34%</h2> */}
          </div>

{       !isUni()  &&   <div className="card w-[13%] md:w-[16%] lg:w-[17%] bg-[#fff] p-4 md:p-8 items-center text-center">
            <div className="rounded-lg bg-[#f2f9f7] w-10 h-10 flex justify-center mb-4">
              <CgAwards className="text-green-600 self-center w-6 h-6 " />
            </div>
            <h2 className="text-[30px] text-center font-bold mb-1 text-[#171717]">
              {companies.length}
            </h2>
            <h2 className="text-[#8F92A1] font-bold text-xs mb-4">Companies</h2>
            {/* <h2 className="text-[#DE350B] font-medium text-[17px]">25.34%</h2> */}
          </div>}

       {  !isUni()  &&  <div className="card w-[13%] md:w-[16%] lg:w-[17%] bg-[#fff] p-4 md:p-8 items-center text-center">
            <div className="rounded-lg bg-[#fffaf4] w-10 h-10 flex justify-center mb-4">
              <CgTrending className="text-[#FF991F] self-center w-6 h-6 " />
            </div>
            <h2 className="text-[30px] text-center font-bold mb-1 text-[#171717]">
              {placedStudents.length}
            </h2>
            <h2 className="text-[#8F92A1] font-bold text-xs mb-4">
              Student Placed
            </h2>
            {/* <h2 className="text-[#DE350B] font-medium text-[17px]">0%</h2> */}
          </div>}

       { !isUni()  &&   <div className="card w-[13%] md:w-[16%] lg:w-[17%] bg-[#fff] p-4 md:p-8 items-center text-center">
            <div className="rounded-lg bg-[#fafbff] w-10 h-10 flex justify-center mb-4">
              <TbBriefcase2 className="text-blued  self-center w-6 h-6 " />
            </div>
            <h2 className="text-[30px] text-center font-bold mb-1 text-[#171717]">
              {jobs.length}
            </h2>
            <h2 className="text-[#8F92A1] font-bold text-xs mb-4">
              Total Jobs
            </h2>
            <h2
              className="text-[#DE350B] font-medium text-[17px] hover:cursor-pointer"
              onClick={() => navigate("/college/dashboard/jobs")}
            >
              {/* 0% */}
            </h2>
          </div>}

          <div className="card w-[13%] md:w-[16%] lg:w-[17%] bg-[#fff] p-4 md:p-8 items-center text-center">
            <div className="rounded-lg bg-[#fafbff] w-10 h-10 flex justify-center mb-4">
              <MdOutlinedFlag className="text-blued  self-center w-6 h-6 " />
            </div>
            <h2 className="text-[30px] text-center font-bold mb-1 text-[#171717]">
              {assessments.length}
            </h2>
            <h2 className="text-[#8F92A1] font-bold text-xs mb-4">
              Available Assessment
            </h2>
            <span
              className="flex gap-2 justify-center hover:cursor-pointer"
              onClick={() => navigate(`/${isUni() ? "university/pr":"college"}/test`)}
            >
              <h2 className="text-blued  font-bold text-center  text-base  ">
                Create New
              </h2>
              <FaArrowRight className="text-blued  self-center" />
            </span>
          </div>
        </div>
      </div>

    {  !isUni() && <div className=" gap-5  mx-auto  overflow-x-clip grid grid-cols-2">
        {/* 1st block */}
        <div className="bg-[#F8F8F9]  rounded-3xl p-4 md:p-8 mb-5">
          <span className="flex justify-between">
            <div className="w-3/4">
              <h1 className="text-base font-bold mb-4 md:mb-8 basis-full text-[#171717]">
                New Companies Onboarded
              </h1>{" "}
            </div>

            <button
              className="text-blued  text-sm mb-4 md:mb-8"
              onClick={() => navigate("/college/companies")}
            >
              See All
            </button>
          </span>

          <SwiperSlideLeft />
        </div>
        {/* 2nd block */}
        <div className="bg-[#F8F8F9]  rounded-3xl p-4 md:p-8 mb-5">
          <span className="flex justify-between">
            <div className="w-3/4">
              <h1 className="text-base font-bold mb-4 md:mb-8 basis-full text-[#171717] ">
                New Jobs Posted
              </h1>{" "}
            </div>

            <button
              className="text-blued  text-sm mb-4 md:mb-8"
              onClick={() => navigate("/college/jobs")}
            >
              See All
            </button>
          </span>
          <SwiperSlideRight />
        </div>
      </div>}

      <ChartComp />
    </>
  );
};

export default Dashboard;
