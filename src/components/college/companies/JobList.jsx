import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export const JobList = ({ jobs, companyLogo, companyName }) => {
  const navigate = useNavigate();

  const openJobs = jobs.filter(
    (job) => job.isOpenForApply && new Date(job.CloseByDate) >= new Date()
  );

  return (
    <div className="w-1/2 h-[100vh] overflow-y-auto px-4">
      <div className="flex justify-between mb-7">
        <h2 className="text-lg font-bold text-gray-800">Available Jobs</h2>
        <h2
          className="font-bold underline underline-offset-2 text-blued cursor-pointer hover:text-blued transition-colors"
          onClick={() => navigate("/college/companies/jobs")}
        >
          See All
        </h2>
      </div>
      {openJobs.length > 0 ? (
        openJobs.map((job, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-white rounded-lg shadow-md p-4 mb-4 border hover:shadow-lg hover:border-blued transition-all duration-300"
          >
            {/* Job Details Section */}
            <div className="flex items-center gap-4">
              <div className="flex justify-center rounded-md">
                <img
                  src={companyLogo || "/images/defaultUser.jpg"}
                  className="w-12 h-12 rounded-md object-cover"
                  alt="Company logo"
                />
              </div>
              <div>
                <h2 className="font-dmSans font-semibold text-base text-gray-800">
                  {job.JobTitle || "Job Title"}
                </h2>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{companyName}</span> •{" "}
                  <span>{job.JobLocation || "Location"}</span> •{" "}
                  <span>
                    in{" "}
                    <em className="not-italic text-black font-medium">
                      {job.WorkplaceType || "Workplace Type"}
                    </em>
                  </span>
                </div>
              </div>
            </div>

            {/* Action Section */}
            <div className="flex items-center gap-4">
              <button
                className="h-10 px-4 bg-blue-100 text-blued rounded-lg text-sm font-medium hover:bg-blued hover:text-white transition-all duration-300"
                onClick={() =>
                  navigate(`/college/companies/jobOverview/${job._id}`)
                }
              >
                {job.EmploymentType || "Employment Type"}
              </button>
              <FaArrowRight className="text-gray-500 hover:text-blued transition-all duration-300" />
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 mt-10">
          <p>No jobs available at the moment.</p>
        </div>
      )}
    </div>
  );
};
