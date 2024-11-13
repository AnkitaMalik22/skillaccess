import { useEffect } from "react";
import { CgClipboard, CgAwards, CgTrending } from "react-icons/cg";
import { TbBriefcase2 } from "react-icons/tb";
import { MdOutlinedFlag } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import useTranslate from "../../../hooks/useTranslate";
import SwiperSlideLeft from "../../../components/company/dashboard/dash/SwiperSlideLeft";
import SwiperSlideRight from "../../../components/company/dashboard/dash/SwiperSlideLeft";
import ChartComp from "../../../components/collage/dashboard/dash/Chart";
import {
  getStudent,
  // getCompany,
  getAssessment,
  getTotalJobs,
  getPlacedStudents,
} from "../../../redux/collage/dashboard/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCompany } from "../../../redux/company/auth/companyAuthSlice";
import { getCompanyJobTests, getJobs } from "../../../redux/company/jobs/jobSlice";

const DashboardCompany = () => {
  //useTranslate();
  const dispatch = useDispatch();


const { data:user } = useSelector((state) => state.companyAuth);
const { jobs } = useSelector((state) => state.job);

  useEffect(() => {
    if (user) {
      // dispatch(getCompany({ collegeId: user?._id }));
    }
  }, [user]);


  useEffect(() => {
    if (user?._id) {

      dispatch(getJobs(user._id));
    }
  }, [dispatch, user?._id]);


  useEffect(() => {
    dispatch(getCompany());
    // dispatch(getCompanyJobTests());
  }, []);


  const navigate = useNavigate();
  return (
    <>
      <div className="bg-[#F8F8F9]  rounded-3xl p-4 md:p-8 mb-5">
        <h1 className="text-base font-bold mb-4 md:mb-8 basis-full text-[#171717]">
          Overview
        </h1>
        <div className="flex flex-wrap gap-6 xl:gap-8 2xl:gap-12 justify-between">
          {/* 1st card */}
          <div className="card w-[13%] md:w-[16%] lg:w-[17%] bg-[#fff] p-4 md:p-8 items-center text-center">
            <div className="rounded-lg bg-[#f6f6fb] w-10 h-10 flex justify-center mb-4">
              <CgClipboard className="text-[#5243AA] self-center w-6 h-6 " />
            </div>
            <h2 className="text-[30px] text-center font-bold mb-1 text-[#171717]">
              {
                jobs?.length || 0
              }
            </h2>
            <h2 className="text-[#8F92A1] font-bold text-xs mb-4">Total Jobs</h2>
            <h2 className="text-[#00875A] font-medium text-[17px]">105.34%</h2>
          </div>

          <div className="card w-[13%] md:w-[16%] lg:w-[17%] bg-[#fff] p-4 md:p-8 items-center text-center">
            <div className="rounded-lg bg-[#f2f9f7] w-10 h-10 flex justify-center mb-4">
              <CgAwards className="text-green-600 self-center w-6 h-6 " />
            </div>
            <h2 className="text-[30px] text-center font-bold mb-1 text-[#171717]">
              {0}
            </h2>
            <h2 className="text-[#8F92A1] font-bold text-xs mb-4">Students Hired</h2>
            <h2 className="text-[#DE350B] font-medium text-[17px]">25.34%</h2>
          </div>

          <div className="card w-[13%] md:w-[16%] lg:w-[17%] bg-[#fff] p-4 md:p-8 items-center text-center">
            <div className="rounded-lg bg-[#fffaf4] w-10 h-10 flex justify-center mb-4">
              <CgTrending className="text-[#FF991F] self-center w-6 h-6 " />
            </div>
            <h2 className="text-[30px] text-center font-bold mb-1 text-[#171717]">
              {0}
            </h2>
            <h2 className="text-[#8F92A1] font-bold text-xs mb-4">
            Students Appeared
            </h2>
            <h2 className="text-[#DE350B] font-medium text-[17px]">0%</h2>
          </div>

          <div className="card w-[13%] md:w-[16%] lg:w-[17%] bg-[#fff] p-4 md:p-8 items-center text-center">
            <div className="rounded-lg bg-[#fafbff] w-10 h-10 flex justify-center mb-4">
              <TbBriefcase2 className="text-blued  self-center w-6 h-6 " />
            </div>
            <h2 className="text-[30px] text-center font-bold mb-1 text-[#171717]">
             {
                0
             }
            </h2>
            <h2 className="text-[#8F92A1] font-bold text-xs mb-4">
            Intitutes
            </h2>
            <h2
              className="text-[#DE350B] font-medium text-[17px] hover:cursor-pointer"
              onClick={() => navigate("/collage/dashboard/jobs")}
            >
              0%
            </h2>
          </div>

          <div className="card w-[13%] md:w-[16%] lg:w-[17%] bg-[#fff] p-4 md:p-8 items-center text-center">
            <div className="rounded-lg bg-[#fafbff] w-10 h-10 flex justify-center mb-4">
              <MdOutlinedFlag className="text-blued  self-center w-6 h-6 " />
            </div>
            <h2 className="text-[30px] text-center font-bold mb-1 text-[#171717]">
              {0}
            </h2>
            <h2 className="text-[#8F92A1] font-bold text-xs mb-4">
              Available Assessment
            </h2>
            <span
              className="flex gap-2 justify-center hover:cursor-pointer"
              onClick={() => navigate("/company/pr/test")}
            >
              <h2 className="text-blued  font-bold text-center  text-base  ">
                Create New
              </h2>
              <FaArrowRight className="text-blued  self-center" />
            </span>
          </div>
        </div>
      </div>

      <div className=" gap-5  mx-auto  overflow-x-clip grid grid-cols-2">
        {/* 1st block */}
        <div className="bg-[#F8F8F9]  rounded-3xl p-4 md:p-8 mb-5">
          <span className="flex justify-between">
            <div className="w-3/4">
              <h1 className="text-base font-bold mb-4 md:mb-8 basis-full text-[#171717]">
              New Jobs Created
              </h1>{" "}
            </div>

            <button
              className="text-blued  text-sm mb-4 md:mb-8"
              onClick={() => navigate("/company/pr/jobs")}
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
              New Employees Hired
              </h1>{" "}
            </div>

            <button
              className="text-blued  text-sm mb-4 md:mb-8"
              // onClick={() => navigate("/company/pr/employees")}
            >
              See All
            </button>
          </span>

          {/* <SwiperSlideRight /> */}
        </div>
      </div>

      <ChartComp />
    </>
  );
};

export default DashboardCompany;
