import { useEffect } from "react";
import { CgAwards, CgClipboard, CgTrending } from "react-icons/cg";
import { FaArrowRight } from "react-icons/fa6";
import { MdOutlinedFlag } from "react-icons/md";
import { TbBriefcase2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import SwiperSlideLeft from "../../../components/company/dashboard/dash/SwiperSlideLeft";

import { useDispatch, useSelector } from "react-redux";
import ChartComp from "../../../components/college/results/home/Chart";
import { getCompany } from "../../../redux/company/auth/companyAuthSlice";
import { getJobs } from "../../../redux/company/jobs/jobSlice";
import { getAllTests } from "../../../redux/company/test/thunks/test";
import { getResultGraphCompany } from "../../../redux/company/result/thunks/graph";
import toast from "react-hot-toast";
import DashboardCard from "../../../components/cards/DashboardCard";
import { getEntity } from "../../../util/isCompany";

const DashboardCompany = () => {
  //useTranslate();
  const dispatch = useDispatch();
  const { totalAssessments } = useSelector((state) => state.companyTest);

  const { data: user } = useSelector((state) => state.companyAuth);
  const { jobs } = useSelector((state) => state.job);

  useEffect(() => {
    if (user) {
      // dispatch(getCompany({ collegeId: user?._id }));
    }
  }, [user]);

  useEffect(() => {
    if (user?._id) {
      dispatch(getJobs({ companyId: user._id, cursor: "", limit: 10 }));
    }
  }, [dispatch, user?._id]);

  useEffect(() => {
    dispatch(getCompany());
    dispatch(getAllTests());
    dispatch(getResultGraphCompany());
    // dispatch(getCompanyJobTests());
  }, []);

  const cardData = [
    {
      icon: CgClipboard,
      iconColor: "#5243AA",
      bgColor: "#f6f6fb",
      count: jobs?.length || 0,
      title: "Total Jobs",
    },
    {
      icon: CgAwards,
      iconColor: "green",
      bgColor: "#f2f9f7",
      count: 0, // Replace with dynamic count if available
      title: "Students Hired",
    },
    {
      icon: CgTrending,
      iconColor: "#FF991F",
      bgColor: "#fffaf4",
      count: 0, // Replace with dynamic count if available
      title: "Students Appeared",
    },
    {
      icon: TbBriefcase2,
      iconColor: "#1E90FF", // Example: Blue color for the briefcase icon
      bgColor: "#fafbff",
      count: 0, // Replace with dynamic count if available
      title: "Institutes",
      actionLabel: "View",
      actionIcon: FaArrowRight,
      onClick: () => navigate(`/${getEntity()}/jobs`),
    },
    {
      icon: MdOutlinedFlag,
      iconColor: "#1E90FF", // Blue for assessments icon
      bgColor: "#fafbff",
      count: totalAssessments || 0,
      title: "Available Assessment",
      actionLabel: "Create New",
      actionIcon: FaArrowRight,
      onClick: () => navigate(`/${getEntity()}/test`),
    },
  ];

  const navigate = useNavigate();
  return (
    <>
      <div className="bg-[#F8F8F9]  rounded-2xl p-4 md:p-8 mb-5">
        <h1 className="text-base font-bold mb-4 md:mb-8 basis-full text-[#171717]">
          Overview
        </h1>
        <div className="flex flex-wrap justify-between">
          {cardData
            .filter((card) => card.condition === undefined || card.condition) // Filter out cards based on the condition
            .map((card, index) => (
              <DashboardCard
                key={index}
                icon={card.icon}
                iconColor={card.iconColor}
                bgColor={card.bgColor}
                count={card.count}
                title={card.title}
                onClick={card.onClick}
                actionLabel={card.actionLabel}
                actionIcon={card.actionIcon}
              />
            ))}
        </div>
      </div>

      <div className=" gap-5  mx-auto  overflow-x-clip grid grid-cols-1">
        {/* 1st block */}
        <div className="bg-[#F8F8F9]  rounded-2xl p-4 md:p-8 mb-5">
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
        {/* <div className="bg-[#F8F8F9]  rounded-2xl p-4 md:p-8 mb-5">
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

          <SwiperSlideRight />
        </div> */}
      </div>

      <ChartComp />
    </>
  );
};

export default DashboardCompany;
