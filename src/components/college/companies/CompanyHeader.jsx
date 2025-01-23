import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const CompanyHeader = ({ companyName }) => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full mx-auto justify-between mb-6 items-center">
      <span className="flex gap-3">
        <button
          className="bg-[#D9E1E7] self-center rounded-md p-3"
          onClick={() => navigate(-1)}
        >
          <FaAngleLeft className="mx-auto sm:h-6 sm:w-6 h-4 w-4" />
        </button>
        <h2 className="text-xl md:text-[28px] font-bold self-center font-dmSans text-[#171717] first-letter:uppercase">
          {companyName}
        </h2>
      </span>
    </div>
  );
};
