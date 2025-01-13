import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import isCompany from '../../../util/isCompany';

const CampusDriveCard = ({ drive }) => {
  return (
    <div className="w-full h-auto bg-[#f8f8f9] hover:shadow-md transition-shadow duration-300 my-3 text-start font-medium text-gray-800 rounded-md p-6 border border-gray-200 capitalize font-dmSans">
      {/* Cover Photo */}
      <div className="mb-4">
        <img
          src={drive?.coverPhoto || 'https://via.placeholder.com/150'}
          alt="Cover"
          className="w-full h-40 object-cover rounded-md mb-4"
        />
      </div>

      {/* Drive Name */}
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">{drive?.name}</h3>

      {/* Start and End Dates */}
      <div className="flex items-start gap-2 justify-between mb-3">
        <p className="text-lg text-gray-600">
          Start Date: {new Date(drive.startDate).toLocaleDateString()}
        </p>
        <p className="text-lg text-gray-600">
          End Date: {new Date(drive.endDate).toLocaleDateString()}
        </p>
      </div>

      {/* Link to the details page */}
      <Link
        to={isCompany() ? `/company/pr/campus-drive/${drive._id}` : `/college/campus-drive/${drive._id}?testId=${drive.tests[0]._id}`}
        className="bg-blued  text-white rounded-md text-sm font-semibold px-6 py-2 transition-all duration-200 shadow-sm hover:shadow-md"
        >
        View Details
      </Link>
    </div>
  );
};

export default CampusDriveCard;
