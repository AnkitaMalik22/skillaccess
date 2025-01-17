// Frontend: InviteColleges.js
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCollegesForDrive, addCollegesToCampusDrive } from '../../../redux/company/campusDrive/campusDriveSlice';
import { toast } from 'react-hot-toast';
import { FiArrowLeft, FiSearch, FiCheck, FiUsers } from 'react-icons/fi';
import debounce from 'lodash/debounce';

export default function InviteColleges() {
  const { driveId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  const { loading, colleges, error, pagination, assignedColleges } = useSelector((state) => state.campusDrive);

  // Create a debounced search function
  const debouncedFetch = useCallback(
    debounce((searchValue) => {
      dispatch(fetchAllCollegesForDrive({
        driveId,
        page: 1,
        limit: 10,
        search: searchValue
      }));
      setCurrentPage(1);
      setIsSearching(false);
    }, 500),
    [driveId, dispatch]
  );

  // Initial fetch
  useEffect(() => {
    if (driveId && !isSearching) {
      dispatch(fetchAllCollegesForDrive({
        driveId,
        page: currentPage,
        limit: 10,
        search: searchTerm
      }));
    }
  }, [driveId, currentPage, dispatch, isSearching]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsSearching(true);
    debouncedFetch(value);
  };

  const handleCollegeSelection = (collegeId) => {
    setSelectedColleges((prev) =>
      prev.includes(collegeId) ? prev.filter((id) => id !== collegeId) : [...prev, collegeId]
    );
  };

  const handleBack = () => {
    navigate(`/company/pr/campus-drive/${driveId}`);
  };

  const handleNext = async () => {
    if (selectedColleges.length === 0) {
      toast.error('Please select at least one college');
      return;
    }

    try {
      await dispatch(
        addCollegesToCampusDrive({
          driveId,
          colleges: selectedColleges,
        })
      ).unwrap();

      toast.success('Colleges added successfully');
      navigate(`/company/pr/campus-drive/${driveId}/tests`);
    } catch (error) {
      toast.error(error.message || 'Failed to add colleges');
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-blued hover:text-[#043345] transition-colors duration-200"
          >
            <FiArrowLeft className="text-lg" />
            Back to Campus Drive
          </button>
          <h1 className="text-xl font-bold text-[#043345]">Invite Colleges</h1>
        </div>

        <div className="bg-[#f8f8f8] rounded-lg shadow-md p-6">
      
              <div className="mb-6">
                <label htmlFor="collegeSearch" className="block text-sm font-medium text-gray-700 mb-2">
                  Search Colleges
                </label>
                <div className="relative">
                  <input
                    id="collegeSearch"
                    type="text"
                    className="w-full p-2 pl-10 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blued"
                    placeholder="Search colleges by name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              {loading ? (
            <div className="flex justify-center items-center h-60">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blued"></div>
            </div>
          ) : (
            <>
              <div className="max-h-96 overflow-y-auto mb-6">
                {colleges?.length > 0 ? (
                  colleges.map((college) => (
                    <div 
                      key={college._id} 
                      onClick={() => handleCollegeSelection(college._id)}
                      className={`flex items-center justify-between mb-3 p-3 rounded-md shadow-sm transition-colors duration-200 cursor-pointer ${
                        selectedColleges.includes(college._id) ? 'bg-blued text-white' : 'bg-white hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={college.avatar.url}
                          alt={`${college.CollegeName} Logo`}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-medium">{college.CollegeName}</p>
                          <p className="text-sm opacity-75">{college.Email}</p>
                          <p className="text-sm opacity-75">Phone: {college.Phone}</p>
                        </div>
                      </div>
                      <button
                        className={`p-2 rounded-full transition-colors duration-200 ${
                          selectedColleges.includes(college._id)
                            ? 'bg-white text-blued'
                            : 'border border-gray-300 hover:bg-gray-200'
                        }`}
                      >
                        <FiCheck className="w-5 h-5" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No colleges found
                  </div>
                )}
              </div>

              {pagination?.totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  {Array.from({ length: pagination.totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={`px-3 py-1 rounded transition-colors duration-200 ${
                        currentPage === i + 1 ? 'bg-blued text-white' : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}

              <div className="flex justify-between items-center mt-6">
                <button
                  type="button"
                  className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200"
                  onClick={handleBack}
                >
                  Back
                </button>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    {selectedColleges.length} colleges selected
                  </span>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-md bg-blued text-white hover:bg-[#043345] transition-colors duration-200"
                    onClick={handleNext}
                  >
                    Add Colleges
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {assignedColleges?.length > 0 && (
          <div className="bg-[#f8f8f8] rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4 text-[#043345]">Invited Colleges</h2>
            <div className="max-h-96 overflow-y-auto">
              {assignedColleges.map((college) => (
                <div key={college._id} className="flex items-center justify-between mb-3 bg-white p-3 rounded-md shadow-sm">
                  <div className="flex items-center gap-3">
                    <img
                      src={college.avatar.url}
                      alt={`${college.CollegeName} Logo`}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-[#043345]">{college.CollegeName}</p>
                      <p className="text-sm text-gray-500">{college.Email}</p>
                      <p className="text-sm text-gray-500">Phone: {college.Phone}</p>
                    </div>
                  </div>
                  <FiUsers className="text-blued w-5 h-5" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


