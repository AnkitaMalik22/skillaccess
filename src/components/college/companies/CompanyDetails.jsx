import React from "react";
import { VscCircleFilled } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

export const CompanyDetails = ({ companyDetails }) => {
  const navigate = useNavigate();
  return (
    <div className="w-1/2">
      {/* Cover Photo Section */}
      <div className="w-full bg-[#F8F8F9] rounded-t-md h-40 md:h-[240px] relative shadow-md overflow-hidden">
        <img
          src={companyDetails?.basic?.coverPhoto || "/images/default.jpg"}
          alt="Company cover"
          className="w-full h-full object-cover rounded-t-md"
        />
        <div className="absolute -bottom-7 left-5 bg-white h-16 w-16 flex justify-center items-center rounded-lg shadow-md border border-gray-200 z-10">
          <img
            src={companyDetails?.basic?.logo || "/images/defaultUser.jpg"}
            className="w-14 h-14 object-contain rounded-md"
            alt="Company logo"
          />
        </div>
      </div>

      {/* Company Info Section */}
      <div className="w-full bg-white flex justify-between p-5 pt-10 gap-2 mb-[6px] rounded-md shadow-md border border-gray-200">
        <div className="gap-2 flex flex-col">
          <h2 className="font-bold text-lg text-gray-800">
            {companyDetails?.basic?.companyName || "Company Name"}
          </h2>
          <h2 className="text-sm font-medium text-gray-600">
            {companyDetails?.location?.state || "Location"} Branch Office
          </h2>
          <h2 className="text-sm font-medium text-blued cursor-pointer"
          onClick={() => navigate(`/college/companies/jobs`)}
          >Available Jobs</h2>
        </div>
        <div className="self-center text-center">
          <h2 className="text-gray-500 text-xs font-bold mb-1">EMPLOYEES</h2>
          <h2 className="text-lg font-bold text-gray-800">200+</h2>
        </div>
      </div>

      {/* About Us Section */}
      <div className="bg-white p-5 mb-[6px] rounded-md shadow-md border border-gray-200">
        <h2 className="text-base font-bold text-gray-800 mb-2">About Us</h2>
        <p className="text-sm text-gray-600 first-letter:capitalize">
          {companyDetails?.about?.description ||
            "This is where the company description will go. Add details about the company's mission, vision, and goals."}
        </p>
      </div>

      {/* Achievements Section */}
      <div className="bg-white p-5 rounded-b-md shadow-md border border-gray-200">
        <h2 className="text-base font-bold text-gray-800 mb-2">Achievements</h2>
        {companyDetails?.awards?.length > 0 ? (
          companyDetails?.awards?.map((award, index) => (
            <div
              className="text-sm text-gray-600 mb-2 flex gap-3 items-center"
              key={index}
            >
              <VscCircleFilled className="text-white border-4 w-4 h-4 rounded-full self-center border-blued m-0" />
              <p>{award?.name || "Award Name"}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400">No achievements listed yet.</p>
        )}
      </div>
    </div>
  );
};
