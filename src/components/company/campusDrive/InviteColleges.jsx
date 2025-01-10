import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCollegesForDrive, addCollegesToCampusDrive } from '../../../redux/company/campusDrive/campusDriveSlice';
import { toast } from 'react-hot-toast';
import { FaChevronLeft } from 'react-icons/fa';

export default function InviteColleges() {
  const { driveId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { loading, colleges, error, pagination,assignedColleges } = useSelector((state) => state.campusDrive);

  useEffect(() => {
    if (driveId) {
      dispatch(fetchAllCollegesForDrive({ driveId, page: currentPage })).then((response) => {
        if (response.payload?.colleges) {
          // Select all colleges by default
          setSelectedColleges(response.payload.colleges.map((college) => college._id));
        }
      });
    }
  }, [driveId, currentPage, dispatch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCollegeSelection = (collegeId) => {
    setSelectedColleges((prev) =>
      prev.includes(collegeId) ? prev.filter((id) => id !== collegeId) : [...prev, collegeId]
    );
  };

  const filteredColleges =
    searchTerm.trim() === ''
      ? colleges
      : colleges?.filter((college) =>
          college?.CollegeName?.toLowerCase().includes(searchTerm.toLowerCase())
        ) || [];

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col gap-5 bg-gray-100 p-5 rounded-lg shadow-md">
      <div className="flex gap-3 mb-5">
        <button
          className="self-center rounded-md h-10 w-10 bg-[#D9E1E7]"
          onClick={handleBack}
        >
          <FaChevronLeft className="h-6 w-6 text-gray-600" />
        </button>
        <h2 className="text-xl font-bold text-[#171717] self-center">Step 2: Invite Colleges</h2>
      </div>

      <div className="bg-white rounded-md p-6">
        {loading || !colleges?.length ? (
          <div className="flex justify-center items-center h-60">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blued"></div>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Search Colleges</label>
              <input
                type="text"
                className="w-full p-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blued"
                placeholder="Search colleges by name"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            <div className="max-h-60 overflow-y-auto mb-6">
              {filteredColleges.map((college) => (
                <div key={college._id} className="flex items-center justify-between mb-3 bg-gray-50 p-3 rounded-md shadow-sm">
                  <div className="flex items-center gap-3">
                    <img
                      src={college.avatar.url}
                      alt={`${college.CollegeName} Avatar`}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-700">{college.CollegeName}</p>
                      <p className="text-sm text-gray-500">{college.Email}</p>
                      <p className="text-sm text-gray-500">Phone: {college.Phone}</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    className="form-checkbox rounded text-blued"
                    checked={selectedColleges.includes(college._id)}
                    onChange={() => handleCollegeSelection(college._id)}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                onClick={handleBack}
              >
                Back
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-md bg-blued text-white hover:bg-blue-700"
                onClick={handleNext}
              >
               Add College
              </button>
            </div>

            <div className="flex justify-center gap-2 mt-4">
              {Array.from({ length: pagination.totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1 ? 'bg-blued text-white' : 'bg-gray-200'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      {
    assignedColleges.length > 0 && (
        <div className="bg-white rounded-md p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Assigned Colleges</h2>
            <div className="max-h-60 overflow-y-auto">
                {assignedColleges.map((college) => (
                     <div key={college._id} className="flex items-center justify-between mb-3 bg-gray-50 p-3 rounded-md shadow-sm">
                     <div className="flex items-center gap-3">
                       <img
                         src={college.avatar.url}
                         alt={`${college.CollegeName} Avatar`}
                         className="w-10 h-10 rounded-full"
                       />
                       <div>
                         <p className="font-medium text-gray-700">{college.CollegeName}</p>
                         <p className="text-sm text-gray-500">{college.Email}</p>
                         <p className="text-sm text-gray-500">Phone: {college.Phone}</p>
                       </div>
                     </div>
                     
                   </div>
                ))}
            </div>
        </div>
    )
}


    </div>
  );
}
