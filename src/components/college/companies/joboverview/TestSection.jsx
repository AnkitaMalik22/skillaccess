import React from "react";
import { useNavigate } from "react-router-dom";
import TestCard from "../job/TestCard";

export const TestSection = ({
  jobDetails,
  isJobOpen,
  handleInviteStudents,
}) => {
  const navigate = useNavigate();

  const InviteButton = () => {
    if (isJobOpen) {
      return (
        <button
          onClick={handleInviteStudents}
          className="flex items-center gap-2 text-blued hover:text-secondary font-medium transition-colors"
        >
          Invite Students
        </button>
      );
    }

    return (
      <div className="flex items-center gap-2 text-red-500">
        <span className="font-medium">Position Closed</span>
      </div>
    );
  };

  return (
    <div className="lg:w-1/2 space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">Assigned Test</h2>
          <InviteButton />
        </div>

        <div className="space-y-4 mt-6">
          {jobDetails?.assessments?.length > 0 ? (
            jobDetails.assessments.map((assessment, index) => (
              <TestCard key={index} assessment={assessment} progress={1} />
            ))
          ) : (
            <div className="bg-gray-50 rounded-md p-4 text-center">
              <p className="text-gray-600 font-medium">No tests assigned yet</p>
            </div>
          )}
        </div>

        {jobDetails?.assessments?.[0]?.test?.invitedStudents && (
          <div className="flex justify-between items-center p-4 bg-blued text-white rounded-md mt-4">
            <h2 className="font-medium">Invited Students</h2>
            <button
              onClick={() =>
                navigate(
                  `/college/companies/jobOverview/${jobDetails._id}/invitedStudents`
                )
              }
              className="text-white hover:text-blue-100 font-medium underline underline-offset-2"
            >
              View List
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
