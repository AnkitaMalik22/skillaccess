import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import { fetchCampusDriveDetails } from '../../../redux/company/campusDrive/campusDriveSlice';
const CampusDriveDetails = () => {
  const { driveId } = useParams(); // Get the drive ID from URL params]
  const dispatch = useDispatch();
  const [campusDrive, setCampusDrive] = useState(null);

  useEffect(() => {
    const loadCampusDriveDetails = async () => {
      // Replace this with actual API call to fetch details of the campus drive
      const response = await dispatch(fetchCampusDriveDetails(driveId));
      const data = await response.json();
      setCampusDrive(data);
    };

    loadCampusDriveDetails();
  }, [driveId]);

  if (!campusDrive) return <p>Loading...</p>;

  return (
    <div className="bg-snow min-h-screen p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">{campusDrive.name}</h1>

        {/* Cover Photo */}
        <img
          src={campusDrive.coverPhoto ? URL.createObjectURL(campusDrive.coverPhoto) : 'https://via.placeholder.com/300'}
          alt="Cover"
          className="w-full h-60 object-cover rounded-lg mb-6"
        />

        <p className="text-lg text-gray-600 mb-4">Start Date: {new Date(campusDrive.startDate).toLocaleDateString()}</p>
        <p className="text-lg text-gray-600 mb-4">End Date: {new Date(campusDrive.endDate).toLocaleDateString()}</p>
        <p className="text-lg text-gray-600 mb-4">Status: {campusDrive.status}</p>

        <h2 className="text-xl font-semibold text-gray-700 mb-4">Assigned Colleges</h2>
        <ul className="list-disc pl-5">
          {campusDrive.invitedColleges.map((college) => (
            <li key={college.id} className="text-gray-700">{college.name}</li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold text-gray-700 mb-4 mt-6">Assigned Tests</h2>
        <ul className="list-disc pl-5">
          {campusDrive.tests.map((test) => (
            <li key={test.id} className="text-gray-700">{test.name}</li>
          ))}
        </ul>

        <button
          type="button"
          className="btn btn-primary w-full bg-blued hover:bg-lightBlue mt-6"
          onClick={() => alert('Edit Campus Drive')}
        >
          Edit Campus Drive
        </button>
      </div>
    </div>
  );
};

export default CampusDriveDetails;
