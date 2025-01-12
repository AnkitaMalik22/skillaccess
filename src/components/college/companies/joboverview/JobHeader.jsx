import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const JobHeader = ({ jobTitle, companyName }) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-2 items-center mb-5">
      <button
        className="bg-gray-200 self-center rounded-md h-10 w-10 sm:h-12 sm:w-16"
        onClick={() => navigate(-1)}
      >
        <FaAngleLeft className="mx-auto sm:h-6 sm:w-6 h-4 w-4" />
      </button>
      <h2 className="text-xl font-bold self-center">
        {jobTitle}, {companyName}
      </h2>
    </div>
  );
};
