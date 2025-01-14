import React from "react";
import { Link } from "react-router-dom";
import isCompany from "../../../util/isCompany";

const CampusDriveCard = ({ drive }) => {
  return (
    <div className="w-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden border border-gray-100 font-dmSans">
      {/* Cover Photo */}
      <div className="relative h-48 bg-gray-200">
        <img
          src={drive?.coverPhoto || "https://via.placeholder.com/300x150"}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 bg-blued text-white text-sm px-3 py-1 rounded-full shadow-md">
          Campus Drive
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5">
        {/* Drive Name */}
        <h3 className="text-xl font-bold text-gray-800 truncate mb-2">
          {drive?.name || "Drive Name"}
        </h3>

        {/* Date Section */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div>
            <span className="font-semibold text-gray-700">Start:</span>{" "}
            {new Date(drive.startDate).toLocaleDateString()}
          </div>
          <div>
            <span className="font-semibold text-gray-700">End:</span>{" "}
            {new Date(drive.endDate).toLocaleDateString()}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm line-clamp-2 mb-4">
          {drive?.description ||
            "A brief description about the campus drive goes here. Keep it short and precise."}
        </p>

        {/* View Details Button */}
        <Link
          to={
            isCompany()
              ? `/company/pr/campus-drive/${drive._id}`
              : `/college/campus-drive/${drive._id}?testId=${drive.tests[0]._id}`
          }
          className="block w-full bg-blued hover:bg-blued text-white text-center text-sm font-medium py-2 rounded-lg transition-colors duration-200"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CampusDriveCard;
