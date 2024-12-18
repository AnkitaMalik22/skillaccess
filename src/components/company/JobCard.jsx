import React from 'react';
import { BsGeoAlt } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import calculateDaysAgo from '../../utils/calculateDaysAgo';

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-[30%] h-auto bg-[#f8f8f9] my-3 text-start font-bold text-black rounded-2xl font-dmSans p-5 shadow-md transition-transform transform  hover:shadow-lg"
      key={job.id}
      onClick={() => navigate(`/company/pr/jobs/${job?._id}`)}
    >
      {/* Company Logo and Name */}
      <div className="logo flex items-center mb-4">
        <div className="w-24 h-24 flex items-center">
          <img
            src={job?.company?.avatar?.url || '/images/job.png'}
            alt=""
            className="rounded-2xl w-full h-full object-cover"
          />
        </div>
        <h2 className="mb-2 ml-4 text-lg font-semibold line-clamp-2 break-words self-center">
          {job?.company?.basic?.companyName || 'Unknown Company'}
        </h2>
      </div>

      {/* Job Title and Closing Date */}
      <div className="flex flex-row items-center justify-between mb-4">
        <span className="text-lg text-gray-700">{job?.JobTitle}</span>
        <span className="text-gray-500 font-medium text-sm">
          Closing <span className="font-bold text-gray-700">{calculateDaysAgo(job?.CloseByDate)}</span>
        </span>
      </div>

      {/* Seniority Level */}
      {job?.SeniorityLevel && (
        <div className="text-gray-600 text-sm mb-4 font-medium">{job?.SeniorityLevel}</div>
      )}

      {/* Location */}
      <div className="location flex flex-row items-center mb-4">
        <BsGeoAlt className="w-6 h-6 text-blue-500 mr-3" />
        <h2 className="text-gray-500 font-medium text-base">
          {job?.JobLocation || 'Location not specified'}
        </h2>
      </div>

      {/* Role Overview */}
      <h2 className="my-4 text-gray-700 text-sm line-clamp-2 break-words">{job?.RoleOverview}</h2>

      {/* Job Description */}
      <p className="text-sm text-gray-500 mb-4">{job?.JobDescription}</p>

      {/* Footer Section */}
      <div className="flex flex-row items-center justify-between">
        <p className="text-[#e45b39] text-sm">Posted {calculateDaysAgo(job?.createdAt)}</p>
        <button
          className="bg-accent hover:bg-cyan-700 text-white rounded-2xl text-sm font-bold flex gap-2 px-6 py-2 transition-all"
          onClick={() => navigate(`/company/pr/jobs/${job?._id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default JobCard;
