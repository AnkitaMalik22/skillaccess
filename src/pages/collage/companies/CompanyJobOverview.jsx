import React, { useEffect } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaAngleLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ChartComp from "../../../components/collage/companies/job/ChartComp";
import {
  getJobById,
  getTotalJobs,
} from "../../../redux/collage/dashboard/dashboardSlice";
import calculateDaysAgo from "../../../util/calculateDaysAgo";
import useTranslate from "../../../hooks/useTranslate";
import Card from "../../../components/collage/test/home/common/Card";
import TestCard from "../../../components/collage/companies/job/TestCard";

const CompanyJobOverview = () => {
  //useTranslate();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { jobDetails } = useSelector((state) => state.dashboard);
  const { jobs } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getJobById(id));
    dispatch(getTotalJobs());
  }, [id]);

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

      <div className="flex gap-5 mx-auto justify-between mb-2 ">
        <div className="w-1/2">
          <div className="w-full bg-gray-100 rounded-t-3xl h-56 relative">
            <img
              src="../../../images/CompanyBg.png"
              alt="icon"
              className="w-full h-full rounded-t-3xl z-0 object-cover"
            />
          </div>
          <div className="w-full bg-gray-100 flex justify-between p-5 mb-1">
            <div>
              <h2 className="font-bold text-lg">{jobDetails.JobTitle}</h2>
              <h2 className="text-xs font-medium mt-1">
                {jobDetails.JobLocation}
              </h2>
              <h2 className="text-xs font-medium mt-2 text-gray-400">
                {calculateDaysAgo(jobDetails.createdAt)}
              </h2>
            </div>
            <div className="self-center">
              <h2 className="text-gray-400 text-sm font-bold ">EMPLOYEES</h2>
              <h2 className="text-sm font-bold text-center mt-1">200+</h2>
            </div>
          </div>

          {/* /Requirements */}

          <div className="bg-gray-100 mb-1 p-5 grid grid-cols-4 text-xs font-bold text-center">
            <div>
              <h2 className="text-gray-400 my-1">EXPERIENCE</h2>
              <h2>
                {jobDetails.ExperienceFrom}-{jobDetails.ExperienceTo} Years
              </h2>
            </div>
            <div>
              <h2 className="text-gray-400 my-1">SENIORITY LEVEL</h2>
              <h2>{jobDetails.SeniorityLevel}</h2>
            </div>
            <div>
              <h2 className="text-gray-400 my-1">EMPLOYMENT</h2>
              <h2>{jobDetails.EmploymentType}</h2>
            </div>
            <div>
              <h2 className="text-gray-400 my-1">SALARY</h2>
              <h2>
                {jobDetails.SalaryFrom}-{jobDetails.SalaryTo}
              </h2>
            </div>
          </div>
          {/* Role Overview */}
          <div className="bg-gray-100 p-5 mb-1">
            <h2 className="text-base font-bold mb-2">Role Overview</h2>
            <p className="text-sm text-gray-400">{jobDetails.RoleOverview}</p>
          </div>

          <div className="bg-gray-100 p-5 mb-1 rounded-b-lg">
            <h2 className="text-base font-bold mb-2">
              {" "}
              Duties & Responsibilities
            </h2>
            <p className="text-sm text-gray-400">
              {" "}
              {jobDetails.DutiesResponsibility}
            </p>
          </div>
        </div>

        <div className="w-1/2 ">
          <div className=" w-full relative bg-gray-100 p-4 rounded-lg">
            <h2 className="font-bold my-4">Number of Students Placed</h2>
            <div className="w-10/12">
              {" "}
              <ChartComp />
            </div>
          </div>

          {/*  */}
          <div className="flex justify-between mb-7 mt-4">
            <h2 className="font-bold">Assigned Test</h2>

        
            <h2
              className="font-bold underline underline-offset-2 text-blued cursor-pointer"
              onClick={() => {

                localStorage.setItem("testId", jobDetails?.assessments[0]?.test?._id);
                localStorage.setItem("testName", jobDetails?.assessments[0]?.test?.name);
                navigate(`/collage/test/invite?testId=${jobDetails?.assessments[0]?.test?._id}`)}}
            >
              {/* arrow */}
              Invite Students
            </h2>
          </div>
          {/* {jobs
            ?.filter(
              (job) => job?.JobTitle === jobDetails?.JobTitle && job?._id !== id
            )
            .map((job, index) => {
              return (
                <div
                  className="flex justify-between w-[98%] bg-gray-100 rounded-lg p-4"
                  key={index}
                >
                  <div className="sm:flex">
                    <div className="  flex justify-center rounded-lg mr-2">
                      <img
                        src={job?.company?.basic?.logo}
                        className="w-10 h-10 rounded-lg self-center"
                        alt=""
                      />
                    </div>
                    <span className="">
                      <h2 className="font-dmSans font-semibold text-sm sm:text-base">
                        {job?.JobTitle}
                      </h2>
                      <h2 className="font-dmSans font-medium text-[.6rem] sm:text-xs inline">
                        {" "}
                        {job?.company?.basic?.companyName}
                      </h2>
                      <h2 className="font-dmSans text-gray-400  font-medium text-xs sm:text-xs inline">
                        {" "}
                        {calculateDaysAgo(jobDetails.createdAt)}
                      </h2>
                    </span>
                  </div>
                  <div className="flex sm:gap-6 gap-1">
                    <CiLocationOn className="mx-auto sm:h-6 sm:w-6 h-4 w-4 self-center" />
                    <h2 className="font-dmSans text-gray-400  font-medium text-xs self-center sm:text-xs inline">
                      {" "}
                      {job.JobLocation || "location"}
                    </h2>
                    <h2 className="font-dmSans text-green-500  font-medium text-xs self-center sm:text-xs inline">
                      {" "}
                      {job.WorkplaceType || "WOrktype"}
                    </h2>
                    <button
                      className=" h-8 p-1 w-20 hover:bg-blue-900 bg-blued rounded-lg text-white text-[.5rem] sm:text-sm self-center "
                      onClick={() =>
                        navigate(`/collage/companies/jobOverview/${job._id}`)
                      }
                    >
                      {job.EmploymentType || "employmentType"}
                    </button>
                    <FaArrowRight className="text-gray-400 self-center" />
                  </div>
                </div>
              );
            })} */}

        {
        jobDetails?.assessments &&   jobDetails?.assessments.map((assessment, index) => (
            <TestCard
              key={index}
              assessment={assessment}
              progress={1}
              // progress={assessment?.progress}
            />
          ))
        }
        {
          // no test assigned
          jobDetails?.assessments &&  jobDetails?.assessments.length === 0 && (
            <div className="flex justify-between w-[98%] bg-gray-100 rounded-lg p-4">
              <h2 className="font-dmSans font-semibold text-sm sm:text-base">
                No test assigned
              </h2>
            </div>
          )
        }

        </div>
      </div>
    </>
  );
};

export default CompanyJobOverview;
