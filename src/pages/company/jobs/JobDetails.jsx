import React, { useEffect } from "react";
import Header from "../../../components/company/HeaderJob.jsx";
import { CiLocationOn } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getJobDetails } from "../../../redux/company/jobs/jobSlice";

import calculateDaysAgo from "../../../utils/calculateDaysAgo.js";
import { getStudentsForTest } from "../../../redux/company/test/thunks/test.js";
const JobDetailsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id, "testid");
  // const [job, setJob] = useState([]);
  const { jobDetails } = useSelector((state) => state.job);
  const { students } = useSelector((state) => state.companyTest);

  useEffect(() => {
    if (id) {
      dispatch(getJobDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (jobDetails?.assessments?.length) {
      for (let i = 0; i < jobDetails.assessments.length; i++) {
        getStudents(jobDetails.assessments[i]?.test?._id);
      }
    }
  }, [jobDetails]);

  const getStudents = (testId) => {
    dispatch(getStudentsForTest(testId));
  };

  // const handleTestSelect = (testId) => {
  //   if (selectedTests.includes(testId)) {
  //     setSelectedTests(selectedTests.filter((id) => id !== testId));
  //   } else {
  //     setSelectedTests([...selectedTests, testId]);
  //   }
  // };

  // const navigateToApplyPage = () => {
  //   window.location.href = `/apply?job=${encodeURIComponent(JSON.stringify(job))}&selectedTests=${encodeURIComponent(JSON.stringify(selectedTests))}`;
  // };

  // Check if the job prop is defined before rendering the component
  if (!jobDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header
        Role={jobDetails?.JobTitle}
        companyName={jobDetails?.company?.basic?.companyName}
        jobId={jobDetails?._id}
      />

      <div className="flex mx-auto justify-between mb-2 font-dmSans mt-8 gap-5">
        <div className="w-1/2">
          <div className="w-full bg-gray-100 rounded-t-3xl h-56 relative">
            <img
              src={
                jobDetails?.company?.basic?.coverPhoto ||
                "/images/CompanyBg.png"
              }
              alt=""
              className="w-full h-full rounded-t-3xl z-0 object-cover"
            />
          </div>
          <div className="w-full bg-gray-100 flex justify-between p-5 mb-1">
            <div>
              <h2 className="font-bold text-lg">{jobDetails.JobTitle}</h2>
              <h2 className="text-sm font-medium mt-1">
                {jobDetails.JobLocation}
              </h2>
              <h2 className="text-sm font-medium mt-2 text-gray-400">
                {calculateDaysAgo(jobDetails.createdAt)}
              </h2>
            </div>
            <div className="self-center">
              <h2 className="text-gray-400 text-sm font-bold ">EMPLOYEES</h2>
              <h2 className="text-sm font-bold text-center mt-1">200+</h2>
            </div>
          </div>

          {/* /Requirements */}

          <div className="bg-gray-100 grid grid-cols-4 text-center p-5 mb-1">
            <div>
              <h2 className="text-[#8E91A0] text-sm mb-1">EXPERIENCE</h2>
              <h2 className="text-sm font-bold text-[#171717]">
                {jobDetails.ExperienceFrom}-{jobDetails.ExperienceTo} Years
              </h2>
            </div>
            <div>
              <h2 className="text-[#8E91A0] text-sm mb-1">SENIORITY LEVEL</h2>
              <h2 className="text-sm font-bold text-[#171717]">
                {jobDetails.SeniorityLevel}
              </h2>
            </div>
            <div>
              <h2 className="text-[#8E91A0] text-sm mb-1">EMPLOYMENT</h2>
              <h2 className="text-sm font-bold text-[#171717]">
                {jobDetails.EmploymentType}
              </h2>
            </div>
            <div>
              <h2 className="text-[#8E91A0] text-sm mb-1">SALARY</h2>
              <h2 className="text-sm font-bold text-[#171717]">
                {jobDetails.SalaryFrom}-{jobDetails.SalaryTo}
              </h2>
            </div>
          </div>
          {/* Role Overview */}
          <div className="bg-gray-100 mb-1 p-5 ">
            <h2 className="text-base font-bold mb-1">Role Overview</h2>
            <p className="text-sm text-gray-400">{jobDetails.RoleOverview}</p>
          </div>

          {/* bullets */}
          <div className="bg-gray-100 p-5 rounded-b-lg">
            <h2 className="text-base font-bold mb-1">
              Duties & Responsibilities
            </h2>
            <p className="text-[#7D7D7D] font-normal text-sm">
              {jobDetails.DutiesResponsibility}
            </p>
            {/* <span className="">
            
            <span className=" mt-2 text-sm text-gray-400 pb-3 flex gap-2">
              <VscCircleFilled className="text-white  border-4 w-fit h-fit rounded-full self-center border-blued mr-2" />
              <p>
                {" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                consectetur, blanditiis, rerum temporibus magnam illum maxime
              </p>
            </span>
            <span className=" mt-2 text-sm text-gray-400 pb-3 flex gap-2">
              <VscCircleFilled className="text-white  border-4 w-fit h-fit rounded-full self-center border-blued mr-2" />
              <p>
                {" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                consectetur, blanditiis, rerum temporibus magnam illum maxime
              </p>
            </span>
            <span className=" mt-2 text-sm text-gray-400 pb-3 flex gap-2">
              <VscCircleFilled className="text-white  border-4 w-fit h-fit rounded-full self-center border-blued mr-2" />
              <p>
                {" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                consectetur, blanditiis, rerum temporibus magnam illum maxime
              </p>
            </span>
            <span className=" mt-2 text-sm text-gray-400 pb-3 flex gap-2">
              <VscCircleFilled className="text-white  border-4 w-fit h-fit rounded-full self-center border-blued mr-2" />
              <p>
                {" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                consectetur, blanditiis, rerum temporibus magnam illum maxime
              </p>
            </span>
            <span className=" mt-2 text-sm text-gray-400 pb-3 flex gap-2">
              <VscCircleFilled className="text-white  border-4 w-fit h-fit rounded-full self-center border-blued mr-2" />
              <p>
                {" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                consectetur, blanditiis, rerum temporibus magnam illum maxime
              </p>
            </span>
          </span> */}
          </div>
        </div>

        <div className="w-1/2">
          <div className="flex justify-between mb-7 mt-4">
            <h2 className="font-bold"> Assessments </h2>
            {/* <h2
            className="font-bold underline underline-offset-2 text-blued cursor-pointer"
            onClick={() => navigate("/stude/jobs")}
          >
            See All
          </h2> */}
          </div>
          {jobDetails &&
            jobDetails?.assessments?.map((assessment, index) => {
              return (
                <div
                  key={index}
                  className="bg-gray-100 flex justify-between p-5 mb-1"
                >
                  <div>
                    <h2 className="font-bold text-lg">
                      {assessment?.test?.name}
                    </h2>
                    <h2 className="text-sm font-medium mt-1">
                      {assessment.test?.description}
                    </h2>
                  </div>
                  <div className="self-center">
                    <h2 className="text-gray-400 text-sm font-bold ">
                      Students
                    </h2>
                    <h2 className="text-sm font-bold text-center mt-1">
                      {assessment.test?.invitedStudents?.length}
                    </h2>
                  </div>
                  {/* <button
            className="bg-blued text-white px-4 py-2 rounded"
            onClick={() => {
           
              navigate(`/company/pr/test/details/${assessment?.test?._id}`)
            }}
          >
            View
          </button> */}
                </div>
              );
            })}
          {jobDetails && jobDetails?.assessments?.length === 0 && (
            <div className="bg-gray-100 flex justify-between p-5 mb-1">
              <h2 className="font-bold text-lg">No assessments available</h2>
              <button
                className="bg-blued text-white px-4 py-2 rounded"
                onClick={() => {
                  navigate(`/company/pr/job/add-test/${jobDetails?._id}`);
                }}
              >
                Add
              </button>
            </div>
          )}
          {/* Invited Students */}
          <div className="flex justify-between mb-7 mt-4">
            <h2 className="font-bold"> Invited Students </h2>

            {/* {
          jobDetails && jobDetails?.isOpenForApply || new Date(jobDetails?.CloseByDate) >= new Date() ?
          
          ( */}
            <button
              className="bg-blued text-white px-4 py-2 rounded"
              onClick={() => {
                navigate(`/company/pr/job/students?assessment=${jobDetails?.assessments[0]?.test?._id}`);
              }}
            >
              View All
            </button>
            {/* ) : (
            <h2 className="font-bold underline underline-offset-2 text-red-400 cursor-pointer">Closed</h2>
          )
         } */}
          </div>
          {students &&
            students.slice(0, 3).map((student, index) => {
              return (
                <div
                  key={index}
                  className="bg-gray-100 flex justify-between p-5 mb-1"
                >
                  <div>
                    <h2 className="font-bold text-lg">
                      {student?.FirstName} {student?.LastName}
                    </h2>
                    <h2 className="text-sm font-medium mt-1">
                      {student.Email}
                    </h2>
                  </div>
                  <div className="self-center">
                    <h2 className="text-gray-400 text-sm font-bold ">STATUS</h2>
                    <h2 className="text-sm font-bold text-center mt-1">
                      {student.Status}
                    </h2>
                  </div>
                </div>
              );
            })}
          {students && students?.length === 0 && (
            <div className="bg-gray-100 flex justify-between p-5 mb-1">
              <h2 className="font-bold text-lg">No students available</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default JobDetailsPage;
