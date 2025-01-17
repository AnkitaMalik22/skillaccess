"use client";

import { useState } from "react";

export default function CollegeDetails({ collegeData }) {
  const [activeTab, setActiveTab] = useState("overview");

  if (!collegeData)
    return (
      <div className="min-h-[400px] grid place-items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive information about accreditations, courses, placements,
            and facilities
          </p>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex flex-wrap gap-2 justify-center">
          {["overview", "academics", "placements", "facilities"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors
                ${
                  activeTab === tab
                    ? "bg-blued text-white"
                    : "bg-white text-gray-600! hover:bg-gray-100 "
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>

        {/* Content Sections */}
        <div className="grid gap-8 md:grid-cols-2">
          {activeTab === "overview" && (
            <>
              {/* Accreditations */}
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">
                  Accreditations
                </h2>
                <div className="space-y-4">
                  {collegeData.accreditations?.map((accreditation, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Accrediting Body</p>
                      <p className="font-medium">
                        {accreditation.body || "N/A"}
                      </p>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                          <p className="text-sm text-gray-600">Grade</p>
                          <p className="font-medium">
                            {accreditation.grade || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Validity</p>
                          <p className="font-medium">
                            {accreditation.validityPeriod || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* College Type & Student Strength */}
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">
                  Institution Overview
                </h2>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-600">College Type</p>
                    <p className="font-medium">
                      {collegeData.collegeType || "N/A"}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Total Students</p>
                      <p className="font-medium">
                        {collegeData.studentStrength?.total || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        Final Year Students
                      </p>
                      <p className="font-medium">
                        {collegeData.studentStrength?.finalYear || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Male Students</p>
                      <p className="font-medium">
                        {collegeData.genderRatio?.male || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Female Students</p>
                      <p className="font-medium">
                        {collegeData.genderRatio?.female || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "academics" && (
            <>
              {/* Courses Offered */}
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow md:col-span-2">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">
                  Courses Offered
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {collegeData.coursesOffered?.map((course, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-lg">
                        {course.program || "N/A"}
                      </h3>
                      <div className="mt-2 space-y-2">
                        <p className="text-sm text-gray-600">
                          Specializations:{" "}
                          {course.specializations?.join(", ") || "N/A"}
                        </p>
                        <p className="text-sm text-gray-600">
                          Intake Capacity: {course.intakeCapacity || "N/A"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "placements" && (
            <>
              {/* Placement Statistics */}
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">
                  Placement Statistics
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Average Placement</p>
                      <p className="font-medium">
                        {collegeData.placementStatistics?.average || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Highest Package</p>
                      <p className="font-medium">
                        {collegeData.placementStatistics?.highest || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Average Package</p>
                    <p className="font-medium">
                      {collegeData.placementStatistics?.averagePackage || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Top Companies & Placement Officer */}
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">
                  Recruitment Partners
                </h2>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      Top Recruiting Companies
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {collegeData.topCompanies?.map((company, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                        >
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      Placement Officer
                    </p>
                    <div className="space-y-2">
                      <p className="font-medium">
                        {collegeData.placementOfficer?.name || "N/A"}
                      </p>
                      <p className="text-sm">
                        {collegeData.placementOfficer?.email || "N/A"}
                      </p>
                      <p className="text-sm">
                        {collegeData.placementOfficer?.phone || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "facilities" && (
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow md:col-span-2">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">
                Campus Infrastructure
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {Object.entries(collegeData.infrastructure || {}).map(
                  ([key, value]) => (
                    <div key={key} className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </p>
                      <p className="font-medium mt-1">{value || "N/A"}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {activeTab === "banking" && (
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow md:col-span-2">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">
                Banking Information
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {Object.entries(collegeData.bankingDetails || {}).map(
                  ([key, value]) => (
                    <div key={key} className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </p>
                      <p className="font-medium mt-1">{value || "N/A"}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
