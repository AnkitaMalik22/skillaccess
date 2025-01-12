import React from "react";
import { BsGeoAlt } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-full h-auto bg-white  hover:shadow-md transition-shadow duration-300 my-3 text-start font-medium text-gray-800 rounded-md  p-6 border border-gray-200 capitalize font-dmSans"
      key={job.id}
    >
      {/* Company Info */}
      <div className="logo flex items-center gap-4 mb-4">
        <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-xl">
          <img
            src={job?.company?.avatar?.url || "/images/job.png"}
            alt="Company Logo"
            className="rounded-md w-full h-full object-cover"
          />
        </div>
        <h2 className="text-lg font-bold text-gray-900 line-clamp-2 font-dmSans ">
          {job?.company?.basic?.companyName}
        </h2>
      </div>

      {/* Job Title and Date */}
      <div className="flex items-start gap-2 justify-between mb-3">
        <span className="text-base font-semibold text-gray-700 ">
          {job?.JobTitle}
        </span>
        <span className="text-sm text-gray-500 w-36 ">
          {new Date(job?.createdAt).toDateString()}
        </span>
      </div>

      {/* Employment Type */}
      <div className="text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-full inline-block mb-3 ">
        {job?.EmploymentType}
      </div>

      {/* Location */}
      <div className="location flex items-center gap-3 text-sm text-gray-600 mb-4">
        <BsGeoAlt className="w-5 h-5 text-gray-500" />
        <span>{job.JobLocation}</span>
      </div>

      {/* Seniority Level */}
      <h2 className="text-sm font-medium text-gray-700 mb-3">
        {job?.SeniorityLevel}
      </h2>

      {/* Role Overview */}
      <p className="text-sm text-gray-500 mb-6 line-clamp-2">
        {job?.RoleOverview}
      </p>

      {/* Close Date and Button */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-red-500 font-medium">
          Close Date: {new Date(job?.CloseByDate).toDateString()}
        </p>

        <button
          className="bg-blued  text-white rounded-md text-sm font-semibold px-6 py-2 transition-all duration-200 shadow-sm hover:shadow-md"
          onClick={() => navigate(`/college/job/overview/${job?._id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default JobCard;
