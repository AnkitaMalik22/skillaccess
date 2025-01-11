'use client'

import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import { FiArrowLeft, FiSearch, FiCheck } from "react-icons/fi"
import axios from "axios"
import { assignTestToColleges } from "../../../redux/company/campusDrive/campusDriveSlice"
import { fetchCampusDriveDetails } from "../../../redux/company/campusDrive/campusDriveSlice"
import { getAllTests } from "../../../redux/college/test/thunks/test"

export default function AssignTests() {
  const { driveId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTest, setSelectedTest] = useState(null);
  const [selectedColleges, setSelectedColleges] = useState([]);
  const { assessments: tests, loading: loadingTests } = useSelector((state) => state.test)
  const { currentCampusDrive, loading: loadingCampusDrive } = useSelector((state) => state.campusDrive)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (driveId) {
      dispatch(fetchCampusDriveDetails(driveId))
    }
    dispatch(getAllTests())
  }, [driveId, dispatch])

  const handleCollegeSelection = (collegeId) => {
    setSelectedColleges((prev) =>
      prev.includes(collegeId) ? prev.filter((id) => id !== collegeId) : [...prev, collegeId]
    )
  }

  const handleTestSelection = (testId) => {
    setSelectedTest(testId === selectedTest ? null : testId);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSubmit = async () => {
    if (!selectedTest || selectedColleges.length === 0) {
      toast.error("Please select a test and at least one college");
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(
        assignTestToColleges({
          driveId,
          colleges: selectedColleges,
          test: selectedTest
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
    setSelectedColleges([]);
    setSelectedTest(null);
  };

  const handleScrollToTests = () => {
    document.getElementById('test-section')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const renderStepHeader = (stepNumber, title, description) => (
    <div className="mb-6 border-b pb-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
          {stepNumber}
        </div>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <p className="text-gray-600 ml-11">{description}</p>
    </div>
  );

  const renderColleges = () => (
    <div className="mb-12 bg-white rounded-lg p-6 shadow-md">
      {renderStepHeader(
        1, 
        "Select Colleges",
        "Choose the colleges you want to assign the test to"
      )}
      <div className="relative mb-4">
        <input
          type="text"
          className="input input-bordered w-full pl-10"
          placeholder="Search colleges..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      {loadingCampusDrive ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="skeleton h-24 w-full"></div>
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
                className={`card ${
                  selectedColleges.includes(college._id)
                    ? "bg-primary text-primary-content"
                    : "bg-base-100"
                } shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer`}
                onClick={() => handleCollegeSelection(college._id)}
              >
                <div className="card-body">
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
                     
                  {selectedColleges.includes(college._id) && (
                    <FiCheck className="absolute top-2 right-2 text-2xl" />
                  )}
                </div>
              </div>
             
            ))}
        </div>
      )}
      {selectedColleges.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg flex justify-between items-center">
          <p className="font-medium text-gray-700">
            {selectedColleges.length} college(s) selected
          </p>
          <button 
            onClick={handleScrollToTests}
            className="btn btn-primary"
          >
            Assign Test Now
          </button>
        </div>
      )}
    </div>
  );

  const renderTestList = (title, tests) => {
    // Only show test section if colleges are selected
    if (!selectedColleges.length) {
      return null;
    }

    // If tests exist, show them
    if (tests && tests.length > 0) {
      return (
        <div className="mb-8" id="test-section">
          {renderStepHeader(2, `Select ${title} Test`, 
            "Choose one test to assign to the selected colleges")}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tests.map((test) => (
              <div
                key={test._id}
                className={`card ${
                  selectedTest === test._id 
                    ? "bg-secondary text-secondary-content" 
                    : "bg-base-100"
                } shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer`}
                onClick={() => handleTestSelection(test._id)}
              >
                <div className="card-body">
                  <h3 className="card-title">{test.name}</h3>
                  {selectedTest === test._id && (
                    <div className="mt-2">
                      <p className="text-sm">Selected Colleges ({selectedColleges.length})</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Show create test button only if no tests exist and colleges are selected
    if (selectedColleges.length > 0) {
      return (
        <div className="text-center p-8 bg-gray-50 rounded-lg mb-8">
          <p className="text-gray-600 mb-4">No tests available for {title}</p>
          <button 
            onClick={() => navigate('/company/pr/test')}
            className="btn btn-primary"
          >
            Create New Test
          </button>
        </div>
      );
    }

    return null;
  };

  // Add scroll effect when colleges are selected
  // useEffect(() => {
  //   if (selectedColleges.length > 1) {
  //     document.getElementById('test-section')?.scrollIntoView({ 
  //       behavior: 'smooth' 
  //     });
  //   }
  // }, [selectedColleges.length]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
       <button
             onClick={() => navigate('/company/pr/campus-drive/'+ driveId)}
             className="mb-6 btn btn-ghost gap-2 hover:bg-gray-100"
           >
             <FiArrowLeft className="text-lg" />
             Back to Campus Drive
           </button>
     
        <h1 className="text-3xl font-bold">Assign Tests to Colleges</h1>
        {selectedColleges.length > 0 && (
          <button 
            onClick={handleClearSelection}
            className="btn btn-ghost text-gray-600"
          >
            Clear Selection
          </button>
        )}
      </div>

      {renderColleges()}
      
      {selectedColleges.length > 0 && (
        <div className="bg-white rounded-lg p-6 shadow-md mt-8">
          {renderTestList("Beginner", tests.beginner || [])}
          {renderTestList("Intermediate", tests.intermediate || [])}
          {renderTestList("Advanced", tests.advanced || [])}
          {renderTestList("Adaptive", tests.adaptive || [])}
        </div>
      )}

      {selectedColleges.length > 0 && selectedTest && (
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
              <p>{selectedColleges.length} colleges selected</p>
              <button 
                onClick={handleClearSelection}
                className="btn btn-ghost btn-sm"
              >
                Clear
              </button>
            </div>
            <button
              className={`btn btn-primary ${isSubmitting ? "loading" : ""}`}
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Assigning..." : "Assign Test"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
