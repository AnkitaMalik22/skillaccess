import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createCampusDrive } from '../../../redux/company/campusDrive/campusDriveSlice';
import { toast } from 'react-hot-toast';

export default function CampusDriveDetails() {
  const [campusDriveDetails, setCampusDriveDetails] = useState({
    name: '',
    startDate: '',
    endDate: '',
    coverPhoto: null,
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Copy all handlers and form UI from Form.jsx renderStep1()
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const resultAction = await dispatch(createCampusDrive(campusDriveDetails));
      if (createCampusDrive.fulfilled.match(resultAction)) {
        const newDriveId = resultAction.payload._id;
        toast.success('Campus Drive created successfully!');
        navigate(`/company/pr/campus-drive/${newDriveId}/invite`);
      }
    } catch (err) {
      toast.error('Failed to create campus drive');
    } finally {
      setIsSubmitting(false);
    }
  };

    const handleChange = (e) => {
    const { name, value } = e.target;
    setCampusDriveDetails((prev) => ({ ...prev, [name]: value }));
    }

    // const handleCoverPhotoChange = (e) => {
    // const coverPhoto = e.target.files[0];
    // setCampusDriveDetails((prev) => ({ ...prev, coverPhoto }));
    // }
    

  return (
    <div className="w-full mx-auto mt-6">
    <div className="form-card bg-white rounded-lg shadow-lg p-6 w-full">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Campus Drive</h1>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Step 1: Campus Drive Details</h2>

      <div className="form-control mb-4 w-full">
        <label className="label">
          <span className="label-text font-medium">Campus Drive Name</span>
        </label>
        <input
          type="text"
          className="input input-bordered input-focus focus:ring-2 focus:ring-blue-600"
          name="name"
          value={campusDriveDetails.name}
          onChange={handleChange}
          placeholder="Enter Campus Drive Name"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Start Date</span>
          </label>
          <input
            type="date"
            className="input input-bordered input-focus focus:ring-2 focus:ring-blue-600"
            name="startDate"
            value={campusDriveDetails.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">End Date</span>
          </label>
          <input
            type="date"
            className="input input-bordered input-focus focus:ring-2 focus:ring-blue-600"
            name="endDate"
            value={campusDriveDetails.endDate}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* <div className="form-control mb-4">
        <label className="label">
          <span className="label-text font-medium">Cover Photo</span>
        </label>
        <label
          htmlFor="cover-photo"
          className="w-full cursor-pointer relative flex justify-center items-center border-2 border-dashed border-gray-300 p-4 rounded-lg"
        >
          {!campusDriveDetails.coverPhoto ? (
            <span className="text-gray-500">Upload Cover Photo</span>
          ) : (
            <img
              src={URL.createObjectURL(campusDriveDetails.coverPhoto)}
              alt="Cover"
              className="w-full h-40 object-cover rounded-lg shadow"
            />
          )}
          <input
            type="file"
            id="cover-photo"
            className="hidden"
            onChange={handleCoverPhotoChange}
            accept="image/*"
          />
          {!campusDriveDetails.coverPhoto && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <i className="fa fa-upload text-xl text-gray-400"></i>
            </div>
          )}
        </label>
      </div> */}

      <div className="form-control mb-6">
        <label className="label">
          <span className="label-text font-medium">Additional Details</span>
        </label>
        <textarea
          name="description"
          className="textarea textarea-bordered textarea-focus h-24 focus:ring-2 focus:ring-blue-600"
          value={campusDriveDetails.description}
          onChange={handleChange}
          placeholder="Provide additional information about the campus drive"
        />
      </div>

      <button
        type="button"
        className="btn text-white w-full bg-blued hover:bg-lightBlue"
        onClick={handleSubmit}
      >
        {isSubmitting ? 'Creating...' : 'Create Campus Drive'}
      </button>
    </div>
    </div>
  );
}