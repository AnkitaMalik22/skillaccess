import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import isCompany from '../../../util/isCompany';
const CampusDriveCard = ({ drive }) => {
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6 hover:shadow-xl transition-all duration-300">
      <img
        src={drive?.coverPhoto || 'https://via.placeholder.com/150'}
        alt="Cover"
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <h3 className="text-2xl font-semibold text-gray-800">{drive?.name}</h3>
      <p className="text-lg text-gray-600 mt-2">Start Date: {new Date(drive.startDate).toLocaleDateString()}</p>
      <p className="text-lg text-gray-600">End Date: {new Date(drive.endDate).toLocaleDateString()}</p>

      {/* Link to the details page */}
      <Link to={isCompany() ? `/company/pr/campus-drive/${drive._id}` : `/college/campus-drive/${drive._id}`}
      className="text-blued mt-4 inline-block hover:underline">
        View Details
      </Link>
    </div>
  );
};

export default CampusDriveCard;
