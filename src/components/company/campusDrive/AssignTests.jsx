'use client'

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FiArrowLeft, FiSearch, FiCheck, FiUsers, FiClipboard } from "react-icons/fi";
import { assignTestToColleges, fetchCampusDriveDetails } from "../../../redux/company/campusDrive/campusDriveSlice";
import { getAllTests } from "../../../redux/college/test/thunks/test";

export default function AssignTests() {
  const { driveId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTest, setSelectedTest] = useState(null);
  const [selectedCollege, setSelectedCollege] = useState(null); // Changed from array to single value
  const { assessments: tests, loading: loadingTests } = useSelector((state) => state.test);
  const { currentCampusDrive, loading: loadingCampusDrive } = useSelector((state) => state.campusDrive);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (driveId) {
      dispatch(fetchCampusDriveDetails(driveId));
    }
    dispatch(getAllTests());
  }, [driveId, dispatch]);

  const handleCollegeSelection = (collegeId) => {
    setSelectedCollege(collegeId === selectedCollege ? null : collegeId);
  };

  const handleTestSelection = (testId) => {
    setSelectedTest(testId === selectedTest ? null : testId);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedTest || !selectedCollege) {
      toast.error("Please select a test and a college");
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(
        assignTestToColleges({
          driveId,
          colleges: [selectedCollege], // Send as array with single value
          test: selectedTest,
        })
      ).unwrap();

      toast.success("Test assigned successfully");
      navigate("/company/pr/campus-drive/" + driveId);
    } catch (error) {
      toast.error(error.message || "Failed to assign test");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearSelection = () => {
    setSelectedCollege(null);
    setSelectedTest(null);
  };

  const handleScrollToTests = () => {
    document.getElementById("test-section")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const renderStepHeader = (stepNumber, title, description) => (
    <div className="mb-6 border-b border-gray-200 pb-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-full bg-blued text-white flex items-center justify-center font-bold">
          {stepNumber}
        </div>
        <h2 className="text-2xl font-bold text-[#043345]">{title}</h2>
      </div>
      <p className="text-gray-600 ml-11">{description}</p>
    </div>
  );

  const renderColleges = () => (
    <div className="mb-12 bg-[#f8f8f8] rounded-lg p-6 shadow-md">
      {renderStepHeader(1, "Select Colleges", "Choose the colleges you want to assign the test to")}
      <div className="relative mb-4">
        <input
          type="text"
          className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blued"
          placeholder="Search colleges..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      {loadingCampusDrive ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="h-24 w-full bg-gray-200 animate-pulse rounded-md"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentCampusDrive?.colleges
            ?.filter((college) =>
              college.CollegeName.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((college) => (
              <div
                key={college._id}
                className={`p-4 rounded-lg ${
                  selectedCollege === college._id ? "bg-blued text-white" : "bg-[#f8f8f8]"
                }  hover:shadow-lg transition-shadow duration-200 cursor-pointer`}
                onClick={() => handleCollegeSelection(college._id)}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={college.avatar.url}
                    alt={`${college.CollegeName} Avatar`}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{college.CollegeName}</p>
                    <p className="text-sm opacity-75">{college.Email}</p>
                    <p className="text-sm opacity-75">Phone: {college.Phone}</p>
                  </div>
                </div>
                {selectedCollege === college._id && (
                  <FiCheck className="absolute top-2 right-2 text-2xl" />
                )}
              </div>
            ))}
        </div>
      )}
      {selectedCollege && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg flex justify-between items-center">
          <p className="font-medium text-[#043345]">1 college selected</p>
          <button
            onClick={handleScrollToTests}
            className="px-4 py-2 bg-blued text-white rounded-md hover:bg-[#043345] transition-colors duration-200"
          >
            Assign Test Now
          </button>
        </div>
      )}
    </div>
  );

  const renderTestList = (title, tests) => {
    if (!selectedCollege) {
      return null;
    }

    return (
      <div id="test-section">
       
        {tests && tests.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tests.map((test) => (
              <div
                key={test._id}
                className={`p-4 rounded-lg ${
                  selectedTest === test._id ? "bg-[#043345] text-white" : "bg-[#f8f8f8] border border-gray-200"
                } shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer`}
                onClick={() => handleTestSelection(test._id)}
              >
                <h3 className="font-bold mb-2">{test.name}</h3>
                <div className="mb-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    selectedTest === test._id ? 'bg-[#f8f8f8] text-[#043345]' : 'bg-blued text-white'
                  }`}>
                    {test.level}
                  </span>
                </div>
                <p className="text-sm opacity-75">{test.description?.slice(0, 100)}...</p>
                {selectedTest === test._id && (
                  <div className="mt-2">
                    <p className="text-sm opacity-75 ">
                      Selected Colleges (1)
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 bg-gray-50 rounded-lg mb-8">
            <p className="text-gray-600 mb-4">No tests available for {title}</p>
            <button
              onClick={() => navigate("/company/pr/test")}
              className="px-4 py-2 bg-blued text-white rounded-md hover:bg-[#043345] transition-colors duration-200"
            >
              Create New Test
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate("/company/pr/campus-drive/" + driveId)}
            className="flex items-center gap-2 text-blued hover:text-[#043345] transition-colors duration-200"
          >
            <FiArrowLeft className="text-lg" />
            Back to Campus Drive
          </button>
          <h1 className="text-xl font-bold text-[#043345]">Assign Tests to Colleges</h1>
          {selectedCollege && (
            <button
              onClick={handleClearSelection}
              className="px-4 py-2 text-sm text-gray-600 bg-transparent hover:bg-gray-200 rounded-md"
            >
              Clear Selection
            </button>
          )}
        </div>

        {renderColleges()}

        {selectedCollege && (
          <div className="bg-[#f8f8f8] rounded-lg p-6 shadow-md mt-8">
            <div className="bg-blue-50 border-l-4 border-blued p-4 mb-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blued" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blued">
                    Currently, we only support assigning one test to one college at a time.
                  </p>
                </div>
              </div>
            </div>
            {renderStepHeader(2, "Assign Tests", "Choose one test to assign to the selected college")}
            {renderTestList("Beginner", tests.beginner || [])}
            {renderTestList("Intermediate", tests.intermediate || [])}
            {renderTestList("Advanced", tests.advanced || [])}
          </div>
        )}

        {selectedCollege && selectedTest && (
          <div className="text-right mt-6">
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-blued text-white rounded-md hover:bg-[#043345] transition-colors duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Assigning..." : "Assign Test"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
