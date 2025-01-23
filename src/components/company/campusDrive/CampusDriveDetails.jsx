import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createCampusDrive } from "../../../redux/company/campusDrive/campusDriveSlice";
import { toast } from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import BackIcon from "../../buttons/BackIcon";

export default function CampusDriveDetails() {
  const [campusDriveDetails, setCampusDriveDetails] = useState({
    name: "",
    startDate: "",
    endDate: "",
    coverPhoto: null,
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    const now = new Date();
    const start = new Date(campusDriveDetails.startDate);
    const end = new Date(campusDriveDetails.endDate);

    // Name validation
    if (!campusDriveDetails.name.trim()) {
      newErrors.name = 'Drive name is required';
    } else if (campusDriveDetails.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    // Description validation
    if (!campusDriveDetails.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (campusDriveDetails.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    // Date validations
    if (!campusDriveDetails.startDate) {
      newErrors.startDate = 'Start date is required';
    } else if (start < now) {
      newErrors.startDate = 'Start date cannot be in the past';
    }

    if (!campusDriveDetails.endDate) {
      newErrors.endDate = 'End date is required';
    } else if (end <= start) {
      newErrors.endDate = 'End date must be after start date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error('Please fix the validation errors');
      return;
    }

    try {
      setIsSubmitting(true);
      const resultAction = await dispatch(
        createCampusDrive(campusDriveDetails)
      );
      if (createCampusDrive.fulfilled.match(resultAction)) {
        const newDriveId = resultAction.payload._id;
        toast.success("Campus Drive created successfully!");
        navigate(`/company/pr/campus-drive/${newDriveId}/invite`);
      }
    } catch (err) {
      toast.error("Failed to create campus drive");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampusDriveDetails((prev) => ({ ...prev, [name]: value }));
  };

  // const handleCoverPhotoChange = (e) => {
  // const coverPhoto = e.target.files[0];
  // setCampusDriveDetails((prev) => ({ ...prev, coverPhoto }));
  // }

  return (
    <div className="w-full mx-auto mt-6">
      <div className="form-card bg-white rounded-lg shadow-lg p-6 w-full">
        <div className="flex items-center justify-between mb-6 ">
        <button
          className="  self-center  rounded-md h-10 w-10 "
          onClick={() => navigate(-1)}
        >
          <BackIcon />
        </button>
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Create Campus Drive
          </h1>

        </div>

        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Step 1: Campus Drive Details
        </h2>

        <div className="form-control mb-4 w-full">
          <label className="label">
            <span className="label-text font-medium">Campus Drive Name</span>
          </label>
          <input
            type="text"
            className={`input input-bordered input-focus focus:ring-2 focus:ring-blue-600 ${errors.name ? 'border-red-500' : ''}`}
            name="name"
            value={campusDriveDetails.name}
            onChange={handleChange}
            placeholder="Enter Campus Drive Name"
            required
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Start Date</span>
            </label>
            <input
              type="date"
              className={`input input-bordered input-focus focus:ring-2 focus:ring-blue-600 ${errors.startDate ? 'border-red-500' : ''}`}
              name="startDate"
              value={campusDriveDetails.startDate}
              onChange={handleChange}
              required
            />
            {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">End Date</span>
            </label>
            <input
              type="date"
              className={`input input-bordered input-focus focus:ring-2 focus:ring-blue-600 ${errors.endDate ? 'border-red-500' : ''}`}
              name="endDate"
              value={campusDriveDetails.endDate}
              onChange={handleChange}
              required
            />
            {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
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
            className={`textarea textarea-bordered textarea-focus h-24 focus:ring-2 focus:ring-blue-600 ${errors.description ? 'border-red-500' : ''}`}
            value={campusDriveDetails.description}
            onChange={handleChange}
            placeholder="Provide additional information about the campus drive"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        <div className="w-full flex justify-end items-center">
        <button
          type="button"
          className="btn text-white bg-blued hover:bg-lightBlue"
          onClick={handleSubmit}
        >
          {isSubmitting ? "Creating..." : "Create Campus Drive"}
        </button>
        </div>
      </div>
    </div>
  );
}
