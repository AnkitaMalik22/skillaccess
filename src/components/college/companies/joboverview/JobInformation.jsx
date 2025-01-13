import React from "react";
import calculateDaysAgo from "../../../../util/calculateDaysAgo";

export const JobInformation = ({ jobDetails, isJobOpen }) => {
  const jobRequirements = [
    {
      label: "EXPERIENCE",
      value: `${jobDetails.ExperienceFrom}-${jobDetails.ExperienceTo} Years`,
    },
    {
      label: "SENIORITY LEVEL",
      value: jobDetails.SeniorityLevel,
    },
    {
      label: "EMPLOYMENT",
      value: jobDetails.EmploymentType,
    },
    {
      label: "SALARY",
      value: `${jobDetails.SalaryFrom}-${jobDetails.SalaryTo}`,
    },
  ];

  return (
    <div className="lg:w-1/2 space-y-4">
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="h-56 relative">
          <img
            src={
              jobDetails?.company?.basic?.coverPhoto || "/images/CompanyBg.png"
            }
            alt="Company Background"
            className="w-full h-full object-cover"
          />
          {!isJobOpen && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Closed
            </div>
          )}
        </div>

        <div className="p-6 flex justify-between items-start border-b border-gray-100">
          <div className="space-y-2">
            <h1 className="text-xl font-bold text-gray-900">
              {jobDetails.JobTitle}
            </h1>
            <p className="text-sm text-gray-600">{jobDetails.JobLocation}</p>
            <p className="text-sm text-gray-400">
              {calculateDaysAgo(jobDetails.createdAt)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">EMPLOYEES</p>
            <p className="text-lg font-bold mt-1">200+</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-b border-gray-100">
          {jobRequirements.map((req, index) => (
            <div key={index} className="text-center">
              <p className="text-sm font-medium text-gray-500 mb-1">
                {req.label}
              </p>
              <p className="text-sm font-bold">{req.value}</p>
            </div>
          ))}
        </div>

        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold mb-3">Role Overview</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {jobDetails.RoleOverview}
          </p>
        </div>

        <div className="p-6">
          <h2 className="text-lg font-bold mb-3">Duties & Responsibilities</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {jobDetails.DutiesResponsibility}
          </p>
        </div>
      </div>
    </div>
  );
};
