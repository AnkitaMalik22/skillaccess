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
import axios from "axios";
import { getUniversity } from "../../../redux/university/auth/universityAuthSlice";
import { getEntity, isUni } from "../../../util/isCompany";
import DashboardCard from "../../../components/cards/DashboardCard";

const Dashboard = ({ }) => {
  //useTranslate();
  const dispatch = useDispatch();
  const { students, companies, assessments, jobs, placedStudents } =
    useSelector((state) => state.dashboard);
  const { user } = useSelector((state) => state.collegeAuth);

  useEffect(() => {
    if (user) {
      if (!isUni()) {
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
    isUni() ? dispatch(getUniversity()) : dispatch(getCollege());
  }, []);

  const cardData = [
    {
      icon: CgClipboard,
      iconColor: "#5243AA",
      bgColor: "#f6f6fb",
      count: students.length,
      title: "Students",
    },
    {
      icon: CgAwards,
      iconColor: "green",
      bgColor: "#f2f9f7",
      count: companies.length,
      title: "Companies",
      condition: !isUni(),
    },
    {
      icon: CgTrending,
      iconColor: "#FF991F",
      bgColor: "#fffaf4",
      count: placedStudents.length,
      title: "Student Placed",
      condition: !isUni(),
    },
    {
      icon: TbBriefcase2,
      iconColor: "#1E90FF", // Example: Blue color for the briefcase icon
      bgColor: "#fafbff",
      count: jobs.length,
      title: "Total Jobs",
      condition: !isUni(),
    },
    {
      icon: MdOutlinedFlag,
      iconColor: "#1E90FF", // Blue for assessments icon
      bgColor: "#fafbff",
      count: assessments.length,
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

      {!isUni() && (
        <div className=" gap-5  mx-auto  overflow-x-clip grid grid-cols-2">
          {/* 1st block */}
          <div className="bg-[#F8F8F9]  rounded-2xl p-4 md:p-8 mb-5">
            <span className="flex justify-between">
              <div className="w-3/4">
                <h1 className="text-base font-bold mb-4 md:mb-8 basis-full text-[#171717]">
                  New Companies Onboarded
                </h1>{" "}
              </div>

              <button
                className="text-blued  text-base md:mb-8"
                onClick={() => navigate("/college/companies")}
              >
                See All
              </button>
            </span>

            <SwiperSlideLeft />
          </div>
          {/* 2nd block */}
          <div className="bg-[#F8F8F9]  rounded-2xl p-4 md:p-8 mb-5">
            <span className="flex justify-between">
              <div className="w-3/4">
                <h1 className="text-base font-bold mb-4 md:mb-8 basis-full text-[#171717] ">
                  New Jobs Posted
                </h1>{" "}
              </div>

              <button
                className="text-blued  text-base md:mb-8"
                onClick={() => navigate("/college/jobs")}
              >
                See All
              </button>
            </span>
            <SwiperSlideRight />
          </div>
        </div>
      )}

      <ChartComp />
    </>
  );
};

export default Dashboard;
