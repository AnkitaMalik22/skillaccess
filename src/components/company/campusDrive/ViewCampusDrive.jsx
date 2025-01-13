import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampusDriveDetails } from "../../../redux/company/campusDrive/campusDriveSlice";
import {
  FiEdit2,
  FiUsers,
  FiCheckCircle,
  FiCalendar,
  FiArrowLeft,
  FiClock,
  FiAward,
} from "react-icons/fi";
import isCompany from "../../../util/isCompany";

export default function ViewCampusDrive() {
  const { driveId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentCampusDrive, loading } = useSelector(
    (state) => state.campusDrive
  );
  const isCompanyUser = isCompany();

  useEffect(() => {
    dispatch(fetchCampusDriveDetails(driveId));
  }, [driveId, dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blued"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-6">
        {/* Back Button */}
        <button
          onClick={() =>
            navigate(
              isCompanyUser ? "/company/pr/campus-drive" : "/college/campus-drive"
            )
          }
          className="mb-6 flex items-center gap-2 text-blued hover:text-[#043345] transition-colors duration-200"
        >
          <FiArrowLeft className="text-lg" />
          Back to {isCompanyUser ? "Campus Drives" : "Tests"}
        </button>

        {/* Header Section */}
        <div className="bg-[#f8f8f8] rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-[#043345]">{currentCampusDrive?.name}</h1>
              <p className="text-gray-600 mt-2">{currentCampusDrive?.description}</p>
            </div>
            {isCompanyUser && (
              <button
                disabled={true}
                className="btn btn-outline border-blued text-blued hover:bg-blued hover:text-white"
              >
                <FiEdit2 className="mr-2" /> Edit
              </button>
            )}
          </div>

          {/* Stats Cards */}
          <div className="mt-8">
            {!isCompanyUser && currentCampusDrive?.tests[0] && (
              <div className="bg-[#f8f8f8] p-6 rounded-lg ">
                <h2 className="text-xl font-bold mb-4 text-[#043345]">Test Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg shadow">
                    <h3 className="text-sm text-gray-600">Test Name</h3>
                    <p className="text-xl font-bold text-[#043345]">
                      {currentCampusDrive.tests[0].test.name}
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg shadow">
                    <h3 className="text-sm text-gray-600">Total Time</h3>
                    <p className="text-xl font-bold text-[#043345]">
                      {currentCampusDrive.tests[0].test.totalTime} mins
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg shadow">
                    <h3 className="text-sm text-gray-600">Total Marks</h3>
                    <p className="text-xl font-bold text-[#043345]">
                      {currentCampusDrive.tests[0].test.totalMarks}
                    </p>
                  </div>
                </div>
              </div>
            )}
            {isCompanyUser && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg shadow">
                  <div className="flex items-center gap-3">
                    <FiUsers className="text-2xl text-blued" />
                    <div>
                      <p className="text-sm text-gray-600">Total Colleges</p>
                      <p className="text-2xl font-bold text-[#043345]">
                        {currentCampusDrive?.colleges?.length || 0}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg shadow">
                  <div className="flex items-center gap-3">
                    <FiCheckCircle className="text-2xl text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Tests Assigned</p>
                      <p className="text-2xl font-bold text-[#043345]">
                        {currentCampusDrive?.tests?.length || 0}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg shadow">
                  <div className="flex items-center gap-3">
                    <FiCalendar className="text-2xl text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-600">Drive Status</p>
                      <p className="text-2xl font-bold text-[#043345] capitalize">
                        {currentCampusDrive?.status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Company User Specific Sections */}
        {isCompanyUser && (
          <>
            {/* Invited Colleges Section */}
            <div className="bg-[#f8f8f8] rounded-lg shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-[#043345]">Invited Colleges</h2>
                <button
                  onClick={() =>
                    navigate(`/company/pr/campus-drive/${driveId}/invite`)
                  }
                  className="btn bg-blued text-white hover:bg-[#043345]"
                >
                  Invite Colleges
                </button>
              </div>

              {currentCampusDrive?.colleges?.length === 0 ? (
                <div className="text-center py-8">
                  <FiUsers className="mx-auto text-4xl text-gray-400 mb-3" />
                  <p className="text-gray-600 mb-4">
                    No colleges have been invited yet
                  </p>
                  <button
                    onClick={() =>
                      navigate(`/company/pr/campus-drive/${driveId}/invite`)
                    }
                    className="btn bg-blued text-white hover:bg-[#043345]"
                  >
                    Invite Colleges Now
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentCampusDrive?.colleges?.map((college) => (
                    <div key={college._id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                      <h3 className="font-medium text-[#043345]">{college.CollegeName}</h3>
                      <p className="text-sm text-gray-600">{college.Email}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tests Section */}
            <div className="bg-[#f8f8f8] rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-[#043345]">Test Assignments</h2>
                <button
                  onClick={() =>
                    navigate(`/company/pr/campus-drive/${driveId}/tests`)
                  }
                  className="btn bg-blued text-white hover:bg-[#043345]"
                >
                  Assign Tests
                </button>
              </div>
              {currentCampusDrive?.tests?.length === 0 ? (
                <div className="text-center py-8">
                  <FiCheckCircle className="mx-auto text-4xl text-gray-400 mb-3" />
                  <p className="text-gray-600 mb-4">
                    No tests have been assigned yet
                  </p>
                  <button
                    onClick={() =>
                      navigate(`/company/pr/campus-drive/${driveId}/tests`)
                    }
                    className="btn bg-blued text-white hover:bg-[#043345]"
                  >
                    Assign Tests Now
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentCampusDrive?.tests?.map((test) => (
                    <div key={test._id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                      <h3 className="font-medium text-[#043345]">{test.test?.name}</h3>
                      <div className="mt-3">
                        <p className="text-sm text-gray-600 mb-2">Assigned to:</p>
                        <div className="flex -space-x-2 overflow-hidden">
                          {test.assignedTo.map((college) => (
                            <div key={college._id} className="relative group">
                              <img
                                src={
                                  college.avatar?.url ||
                                  "https://via.placeholder.com/40"
                                }
                                alt={college.CollegeName}
                                className="inline-block h-8 w-8 rounded-full ring-2 ring-white hover:z-10 transition-transform hover:scale-110"
                              />
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-20">
                                {college.CollegeName}
                              </div>
                            </div>
                          ))}
                          {test.assignedTo.length === 0 && (
                            <span className="text-sm text-gray-500">
                              No colleges assigned
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between mt-4">
                        <button
                          onClick={() =>
                            navigate(
                              `/company/pr/results/overview?assessment=${test?.test?._id}`
                            )
                          }
                          className="btn btn-outline border-blued text-blued hover:bg-blued hover:text-white"
                        >
                          View Results
                        </button>
                        <button
                          onClick={() =>
                            navigate(
                              `/company/pr/job/students?assessment=${test?.test?._id}`
                            )
                          }
                          className="btn btn-outline border-blued text-blued hover:bg-blued hover:text-white"
                        >
                          Invited Students
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* College User Specific Sections */}
        {!isCompanyUser && (
          <>
            {/* Invited Students Section */}
            <div className="bg-[#f8f8f8] rounded-lg shadow-lg p-6 mb-6">
             
              <div className="mt-4 flex justify-between items-center">
              <h2 className="text-xl font-bold mb-4 text-[#043345]">Invited Students</h2>
              <button
                onClick={() =>
                  navigate(
                    `/college/test/invite?testId=${currentCampusDrive?.tests[0]?.test._id}`
                  )
                }
                className="btn bg-blued text-white hover:bg-[#043345]"
              >
                Invite Students
              </button>
            </div>
              {currentCampusDrive?.tests[0].test?.invitedStudents?.length === 0 ? (
                <div className="text-center py-8">
                  <FiUsers className="mx-auto text-4xl text-gray-400 mb-3" />
                  <p className="text-gray-600">
                    No students have been invited yet
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentCampusDrive?.tests[0]?.test?.invitedStudents?.map(
                    (student) => (
                      <div
                        key={student._id}
                        className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow duration-300"
                        onClick={() =>
                          navigate(`/college/students/profile/${student._id}`)
                        }
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              student.avatar?.url ||
                              "https://via.placeholder.com/40"
                            }
                            alt={student.FirstName}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="font-medium text-[#043345]">
                              {student.FirstName} {student.LastName}
                            </p>
                            <p className="text-sm text-gray-500">
                              {student.Email}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Results Section */}
            <div className="bg-[#f8f8f8] rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-[#043345]">Results</h2>
              {currentCampusDrive?.tests[0].test?.studentResponses?.length === 0 ? (
                <div className="text-center py-8">
                  <FiAward className="mx-auto text-4xl text-gray-400 mb-3" />
                  <p className="text-gray-600">No results available yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center gap-3">
                      <FiClock className="text-2xl text-blued" />
                      <div
                        onClick={() =>
                          navigate(
                            `/college/results/overview?assessment=${currentCampusDrive?.tests[0].test._id}`
                          )
                        }
                      >
                        <p className="font-medium text-[#043345]">View Results</p>
                        <p className="text-sm text-gray-500">
                          {currentCampusDrive?.tests[0].test?.studentResponses?.length} results available
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
       
          </>
        )}
      </div>
    </div>
  );
}

