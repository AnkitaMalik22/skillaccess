import React, { useEffect } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaAngleLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ChartComp from "../../../components/college/companies/job/ChartComp";
import {
  getJobById,
  getTotalJobs,
} from "../../../redux/college/dashboard/dashboardSlice";
import calculateDaysAgo from "../../../util/calculateDaysAgo";
import useTranslate from "../../../hooks/useTranslate";
import Card from "../../../components/college/test/home/common/Card";
import TestCard from "../../../components/college/companies/job/TestCard";
// import { ChevronRight } from "react-feather";
// import { AlertCircle } from "react-feather";

const CompanyJobOverview = () => {
  //useTranslate();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();


  const { jobDetails  } = useSelector((state) => state.dashboard);
  const {user} = useSelector((state) => state.collegeAuth);
  const { jobs } = useSelector((state) => state.dashboard);




  const isJobOpen = jobDetails?.isOpenForApply || new Date(jobDetails?.CloseByDate) >= new Date();

  const handleInviteStudents = () => {
      if (!isJobOpen) return;
      localStorage.setItem("testId", jobDetails?.assessments[0]?.test?._id);
      localStorage.setItem("testName", jobDetails?.assessments[0]?.test?.name);
      navigate(`/college/job/test/invite?testId=${jobDetails?.assessments[0]?.test?._id}`);
  };

  const jobRequirements = [
      {
          label: "EXPERIENCE",
          value: `${jobDetails.ExperienceFrom}-${jobDetails.ExperienceTo} Years`
      },
      {
          label: "SENIORITY LEVEL",
          value: jobDetails.SeniorityLevel
      },
      {
          label: "EMPLOYMENT",
          value: jobDetails.EmploymentType
      },
      {
          label: "SALARY",
          value: `${jobDetails.SalaryFrom}-${jobDetails.SalaryTo}`
      }
  ];

  useEffect(() => {
    if (user?._id) {
      dispatch(getJobById({
        jobId : id,
        collegeId : user?._id
      }));
    }
    // dispatch(getTotalJobs());
  }, [id,user?._id]);

  const InviteButton = () => {
    if (isJobOpen) {
        return (
            <button
                onClick={handleInviteStudents}
                className="flex items-center gap-2 text-blued hover:text-secondary font-medium transition-colors"
            >
                Invite Students
                {/* <ChevronRight className="w-4 h-4" /> */}
            </button>
        );
    }

    return (
        <div className="flex items-center gap-2 text-red-500">
            {/* <AlertCircle className="w-4 h-4" /> */}
            <span className="font-medium">Position Closed</span>
        </div>
    );
};

  return (
    <>
      <div className="flex gap-2 items-center mb-5">
        <button
          className="bg-gray-200  self-center rounded-lg h-10 w-10 sm:h-12 sm:w-16"
          onClick={() => navigate(-1)}
        >
          <FaAngleLeft className="mx-auto sm:h-6 sm:w-6 h-4 w-4" />
        </button>
        <h2 className="text-xl font-bold self-center">
          {jobDetails?.JobTitle}, {jobDetails?.company?.basic?.companyName}
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mx-auto max-w-7xl px-4 py-6">
            {/* Left Column - Job Information */}
            <div className="lg:w-1/2 space-y-4">
                {/* Job Header with Image */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="h-56 relative">
                        <img
                            src={jobDetails?.company?.basic?.coverPhoto || "../../../images/CompanyBg.png"}
                            alt="Company Background"
                            className="w-full h-full object-cover"
                        />
                        {!isJobOpen && (
                            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                Closed
                            </div>
                        )}
                    </div>
                    
                    {/* Job Title Section */}
                    <div className="p-6 flex justify-between items-start border-b border-gray-100">
                        <div className="space-y-2">
                            <h1 className="text-xl font-bold text-gray-900">{jobDetails.JobTitle}</h1>
                            <p className="text-sm text-gray-600">{jobDetails.JobLocation}</p>
                            <p className="text-sm text-gray-400">{calculateDaysAgo(jobDetails.createdAt)}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-medium text-gray-500">EMPLOYEES</p>
                            <p className="text-lg font-bold mt-1">200+</p>
                        </div>
                    </div>

                    {/* Requirements Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-b border-gray-100">
                        {jobRequirements.map((req, index) => (
                            <div key={index} className="text-center">
                                <p className="text-xs font-medium text-gray-500 mb-1">{req.label}</p>
                                <p className="text-sm font-bold">{req.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Role Overview */}
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-lg font-bold mb-3">Role Overview</h2>
                        <p className="text-sm text-gray-600 leading-relaxed">{jobDetails.RoleOverview}</p>
                    </div>

                    {/* Duties & Responsibilities */}
                    <div className="p-6">
                        <h2 className="text-lg font-bold mb-3">Duties & Responsibilities</h2>
                        <p className="text-sm text-gray-600 leading-relaxed">{jobDetails.DutiesResponsibility}</p>
                    </div>
                </div>
            </div>

            {/* Right Column - Tests & Invitations */}
            <div className="lg:w-1/2 space-y-6">
                {/* Test Section Header */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold">Assigned Test</h2>
                        <InviteButton />
                    </div>

                   

                    {/* Test Cards */}
                    <div className="space-y-4 mt-6">
                        {jobDetails?.assessments?.length > 0 ? (
                            jobDetails.assessments.map((assessment, index) => (
                                <TestCard
                                    key={index}
                                    assessment={assessment}
                                    progress={1}
                                />
                            ))
                        ) : (
                            <div className="bg-gray-50 rounded-lg p-4 text-center">
                                <p className="text-gray-600 font-medium">No tests assigned yet</p>
                            </div>
                        )}
                    </div>
                     {/* Invited Students Section */}
                     {jobDetails?.assessments?.[0]?.test?.invitedStudents && (
                        <div className="flex justify-between items-center p-4 bg-blued text-white rounded-lg mt-4">
                            <h2 className="font-medium">Invited Students</h2>
                            <button
                                onClick={() => navigate(`/college/companies/jobOverview/${jobDetails._id}/invitedStudents`)}
                                className="text-white hover:text-blue-100 font-medium underline underline-offset-2"
                            >
                                View List
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </>
  );
};

export default CompanyJobOverview;
