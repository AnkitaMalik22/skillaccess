import React, { useState } from "react";
import { Table } from "./Table";
import { TbFileDownload } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";

function AssessmentTable({ assessments, isLoading, onRowClick, onDownload }) {
  const [filters, setFilters] = useState({
    name: "",
    totalStudentsAppeared: "",
    totalStudentsSelected: "",
    overallPerformance: "",
  });

  const [isInputOpen, setIsInputOpen] = useState({
    name: false,
    totalStudentsAppeared: false,
    totalStudentsSelected: false,
    overallPerformance: false,
  });

  const getProgressBarColor = (percentage) => {
    if (percentage === 0) return "transparent";
    if (percentage > 0 && percentage < 33.33) return "#F44336";
    if (percentage >= 33.33 && percentage < 66.66) return "#FFC107";
    return "#4CAF50";
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleInputField = (field) => {
    setIsInputOpen((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const resetFilter = (field) => {
    setFilters((prev) => ({ ...prev, [field]: "" }));
    setIsInputOpen((prev) => ({ ...prev, [field]: false }));
  };

  const filteredAssessments = assessments.filter((assessment, index) => {
    const totalStudentsAppeared = assessment.studentResponses.length.toString();
    const totalStudentsSelected = assessment.selectedStudents.length.toString();
    const overallPerformance = assessment.avgPercentage?.toFixed(2) || "0";

    return (
      (!filters.name ||
        assessment.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.totalStudentsAppeared ||
        totalStudentsAppeared.includes(filters.totalStudentsAppeared)) &&
      (!filters.totalStudentsSelected ||
        totalStudentsSelected.includes(filters.totalStudentsSelected)) &&
      (!filters.overallPerformance ||
        overallPerformance.includes(filters.overallPerformance))
    );
  });

  const filteredAssessmentsWithIndex = filteredAssessments.map(
    (assessment, index) => ({
      ...assessment,
      index: index + 1, // Add index to each filtered assessment
    })
  );

  const columns = [
    {
      header: "S.No",
      accessor: "index",
    },
    {
      header: (
        <div className="flex flex-col">
          <div className="flex">
            <span>Assessment Name</span>
            <div className="flex items-center">
              <button
                onClick={() => toggleInputField("name")}
                className="ml-2 text-gray-500"
              >
                {isInputOpen.name ? (
                  <IoMdClose
                    onClick={() => {
                      resetFilter("name");
                      toggleInputField("name");
                    }}
                  />
                ) : (
                  <RiArrowDropDownLine />
                )}
              </button>
            </div>
          </div>
          {isInputOpen.name && (
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Filter by Name"
                className="mt-1 p-2 text-sm border border-gray-300 rounded-md focus:border-blued  hover:border-blued focus:ring-0"
                value={filters.name}
                onChange={(e) => handleFilterChange("name", e.target.value)}
              />
              <span className="ml-2 text-gray-500">
                Total : {filteredAssessments.length}
              </span>
            </div>
          )}
        </div>
      ),
      accessor: "name",
    },

    {
      header: (
        <div className="flex flex-col">
          <div className="flex">
            <span>Appeared Students</span>
            <div className="flex items-center">
              <button
                onClick={() => toggleInputField("totalStudentsAppeared")}
                className="ml-2 text-gray-500"
              >
                {isInputOpen.totalStudentsAppeared ? (
                  <IoMdClose
                    onClick={() => {
                      resetFilter("totalStudentsAppeared");
                      toggleInputField("totalStudentsAppeared");
                    }}
                  />
                ) : (
                  <RiArrowDropDownLine className="text-lg" />
                )}
              </button>
            </div>
          </div>
          {isInputOpen.totalStudentsAppeared && (
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Filter.. "
                className="mt-1 p-2 text-sm border border-gray-300 rounded-md focus:border-blued  hover:border-blued focus:ring-0"
                value={filters.totalStudentsAppeared}
                onChange={(e) =>
                  handleFilterChange("totalStudentsAppeared", e.target.value)
                }
              />{" "}
              <span className="ml-2 text-gray-500">
                {filteredAssessments.length}
              </span>
            </div>
          )}
        </div>
      ),
      accessor: (assessment) => assessment.studentResponses.length.toString(),
    },
    {
      header: (
        <div className="flex flex-col">
          <div className="flex">
            <span> Selected Students</span>
            <div className="flex items-center">
              <button
                onClick={() => toggleInputField("totalStudentsSelected")}
                className="ml-2 text-gray-500"
              >
                {isInputOpen.totalStudentsSelected ? (
                  <IoMdClose
                    onClick={() => {
                      resetFilter("totalStudentsSelected");
                      toggleInputField("totalStudentsSelected");
                    }}
                  />
                ) : (
                  <RiArrowDropDownLine />
                )}
              </button>
            </div>
          </div>
          {isInputOpen.totalStudentsSelected && (
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Filter..."
                className="mt-1 p-2 text-sm border border-gray-300 rounded-md focus:border-blued  hover:border-blued focus:ring-0"
                value={filters.totalStudentsSelected}
                onChange={(e) =>
                  handleFilterChange("totalStudentsSelected", e.target.value)
                }
              />{" "}
              <span className="ml-2 text-gray-500">
                {filteredAssessments.length}
              </span>
            </div>
          )}
        </div>
      ),
      accessor: (assessment) => assessment.selectedStudents.length.toString(),
    },
    {
      header: (
        <div className="flex flex-col">
          <div className="flex">
            <span>Overall Performance (%)</span>
            <div className="flex items-center">
              <button
                onClick={() => toggleInputField("overallPerformance")}
                className="ml-2 text-gray-500"
              >
                {isInputOpen.overallPerformance ? (
                  <IoMdClose
                    onClick={() => {
                      resetFilter("overallPerformance");
                      toggleInputField("overallPerformance");
                    }}
                  />
                ) : (
                  <RiArrowDropDownLine />
                )}
              </button>
            </div>
          </div>
          {isInputOpen.overallPerformance && (
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Filter..."
                className="mt-1 p-2 text-sm border border-gray-300 rounded-md focus:border-blued  hover:border-blued focus:ring-0"
                value={filters.overallPerformance}
                onChange={(e) =>
                  handleFilterChange("overallPerformance", e.target.value)
                }
              />{" "}
              <span className="ml-2 text-gray-500">
                {filteredAssessments.length}
              </span>
            </div>
          )}
        </div>
      ),
      accessor: (assessment) => (
        <div className="flex items-center gap-2">
          <div className="w-24 bg-opacity-5 rounded-md h-3 bg-green-600">
            <div
              className="h-full rounded-md"
              style={{
                width: `${
                  assessment.avgPercentage < 0 ? 0 : assessment.avgPercentage
                }%`,
                backgroundColor: getProgressBarColor(assessment.avgPercentage),
              }}
            ></div>
          </div>
          <span className="font-bold text-sm">
            {assessment.avgPercentage?.toFixed(2)}%
          </span>
        </div>
      ),
    },
    {
      header: "Download",
      accessor: (assessment) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDownload(assessment._id);
          }}
          className="text-lightBlue hover:text-blue-700"
        >
          <TbFileDownload className="h-6 w-6" />
        </button>
      ),
    },
  ];

  return (
    <div className="w-full mx-auto bg-[#8F92A1] bg-opacity-5 rounded-md p-4">
      <Table
        columns={columns}
        data={filteredAssessmentsWithIndex}
        isLoading={isLoading}
        onRowClick={(assessment) => onRowClick(assessment._id)}
      />
    </div>
  );
}

export default AssessmentTable;
