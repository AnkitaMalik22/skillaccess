import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCollegesForDrive } from "../../../redux/company/campusDrive/campusDriveSlice";
import { toast } from "react-hot-toast";

export default function InviteColleges() {
  const { driveId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { loading, colleges, error, pagination } = useSelector(
    (state) => state.campusDrive
  );

  useEffect(() => {
    if (driveId) {
      dispatch(fetchAllCollegesForDrive({ driveId, page: currentPage }));
    }
  }, [driveId, currentPage, dispatch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCollegeSelection = (collegeId) => {
    setSelectedColleges((prev) =>
      prev.includes(collegeId)
        ? prev.filter((id) => id !== collegeId)
        : [...prev, collegeId]
    );
  };

  const filteredColleges =
    (colleges &&
      colleges?.filter((college) =>
        college?.CollegeName?.toLowerCase().includes(searchTerm.toLowerCase())
      )) ||
    [];

  const handleBack = () => {
    navigate(`/company/pr/campus-drive/${driveId}`);
  };

  const handleNext = () => {
    navigate(`/company/pr/campus-drive/${driveId}/tests`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="form-card bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Step 2: Invite Colleges
      </h2>
      {loading || !colleges?.length ? (
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Search Colleges</span>
            </label>
            <input
              type="text"
              className="input input-bordered input-focus focus:ring-2 focus:ring-blue-600"
              placeholder="Search colleges by name"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div className="max-h-60 overflow-y-auto mb-6">
            {filteredColleges &&
              filteredColleges.map((college) => (
                <div key={college._id} className="flex items-center mb-3">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={selectedColleges?.includes(college._id)}
                    onChange={() => handleCollegeSelection(college._id)}
                  />
                  <span className="ml-2">{college.CollegeName}</span>
                </div>
              ))}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className="btn btn-secondary bg-gray-200 text-gray-700 hover:bg-gray-300"
              onClick={handleBack}
            >
              Back
            </button>
            <button
              type="button"
              className="btn btn-primary bg-blued hover:bg-lightBlue"
              onClick={handleNext}
            >
              Next: Assign Tests
            </button>
          </div>

          {/* Add Pagination Controls */}
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: pagination.totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1 ? "bg-blued text-white" : "bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
