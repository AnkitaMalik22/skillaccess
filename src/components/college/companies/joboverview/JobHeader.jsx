import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const JobHeader = ({ jobTitle, companyName }) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-2 items-center mb-5">
      <button
        className="bg-white border self-center rounded-md p-2 hover:shadow-md transition-shadow duration-300 hover:border-gray-500"
        onClick={() => navigate(-1)}
      >
        <FaAngleLeft className="h-5 w-5" />
      </button>
      <h2 className="text-xl font-bold self-center">
        {jobTitle}, {companyName}
      </h2>
    </div>
  );
};
